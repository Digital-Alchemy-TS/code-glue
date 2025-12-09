import { mkdir, rm, writeFile } from "node:fs/promises"
import { join, dirname } from "node:path"
import { fileURLToPath } from "node:url"
import { exec } from "node:child_process"
import { promisify } from "node:util"
import { transform } from "@svgr/core"
import { config } from "dotenv"

const execAsync = promisify(exec)
const __dirname = dirname(fileURLToPath(import.meta.url))

// Load environment variables from .env file
config();

// Configuration - set these via environment variables
const FIGMA_ACCESS_TOKEN = process.env.FIGMA_ACCESS_TOKEN
const FIGMA_FILE_ID = process.env.FIGMA_FILE_ID
const COMPONENTS_DIR = join(process.cwd(), "src", "components", "Icon", "generated")
const OUTPUT_FILE = join(process.cwd(), "src", "components", "Icon", "generated.tsx")

interface FigmaNode {
	id: string;
	name: string;
	type: string;
	children?: FigmaNode[];
	exportSettings?: Array<{
		format: string;
		suffix?: string;
		constraint?: { type: string; value: number };
	}>;
}

interface FigmaFile {
	document: FigmaNode;
}

interface FigmaImageResponse {
	images: Record<string, string>;
}

async function fetchFigmaFile(): Promise<FigmaFile> {
	if (!FIGMA_ACCESS_TOKEN || !FIGMA_FILE_ID) {
		throw new Error(
			"Missing FIGMA_ACCESS_TOKEN or FIGMA_FILE_ID environment variables",
		);
	}

	const response = await fetch(
		`https://api.figma.com/v1/files/${FIGMA_FILE_ID}`,
		{
			headers: {
				"X-Figma-Token": FIGMA_ACCESS_TOKEN,
			},
		},
	);

	if (!response.ok) {
		throw new Error(`Failed to fetch Figma file: ${response.statusText}`);
	}

	return response.json();
}

function findExportableNodes(
	node: FigmaNode,
	exportableNodes: Array<{ id: string; name: string }> = [],
	isInIconsPage = false,
): Array<{ id: string; name: string }> {
	// Check if this is the Icons page
	const isIconsPage = node.type === 'CANVAS' && node.name === 'Icons';
	
	// Only include nodes that are in the Icons page and have export settings
	if (isInIconsPage && node.exportSettings && node.exportSettings.length > 0) {
		exportableNodes.push({ id: node.id, name: node.name });
	}

	if (node.children) {
		for (const child of node.children) {
			findExportableNodes(child, exportableNodes, isIconsPage || isInIconsPage);
		}
	}

	return exportableNodes;
}

async function fetchSvgExports(
	nodeIds: string[],
): Promise<Record<string, string>> {
	if (!FIGMA_ACCESS_TOKEN || !FIGMA_FILE_ID) {
		throw new Error(
			"Missing FIGMA_ACCESS_TOKEN or FIGMA_FILE_ID environment variables",
		);
	}

	const response = await fetch(
		`https://api.figma.com/v1/images/${FIGMA_FILE_ID}?ids=${nodeIds.join(",")}&format=svg`,
		{
			headers: {
				"X-Figma-Token": FIGMA_ACCESS_TOKEN,
			},
		},
	);

	if (!response.ok) {
		throw new Error(`Failed to fetch SVG exports: ${response.statusText}`);
	}

	const data: FigmaImageResponse = await response.json();
	return data.images;
}

async function downloadSvg(url: string): Promise<string> {
	const response = await fetch(url);
	if (!response.ok) {
		throw new Error(`Failed to download SVG: ${response.statusText}`);
	}
	return response.text();
}

function sanitizeIconName(name: string): string {
	// Convert to PascalCase and remove invalid characters
	return name
		.split(/[-_\s]+/)
		.map((part) => part.charAt(0).toUpperCase() + part.slice(1))
		.join("")
		.replace(/[^a-zA-Z0-9]/g, "");
}

async function generateTypeScriptFile(
	icons: Array<{ name: string; filename: string }>,
): Promise<void> {
	// Sort icons alphabetically by name
	const sortedIcons = [...icons].sort((a, b) => a.name.localeCompare(b.name));

	const imports = sortedIcons
		.map(
			({ name }) =>
				`import ${name} from "./generated/${name}"`,
		)
		.join("\n");

	const exports = sortedIcons
		.map(({ name }) => `\t${name}: ${name} as IconComponentType,`)
		.join("\n");

  const attachments = sortedIcons
    .map(({ name }) => `Icon.${name} = rawIcons.${name}`)
    .join("\n");

	const content = `// This file is auto-generated. Do not edit manually.

import { ComponentError } from "../ComponentError"
// Generated Icons:
${imports}

import type { IconComponentType } from "./types"

export const rawIcons = {
${exports}
} as const

const Icon = () => (
	<ComponentError text="Icon can't be used by itself. Use a icon it provides (Icon.Today for&nbsp;example)."/>
)

${attachments}

export { Icon }
`;

	await writeFile(OUTPUT_FILE, content, "utf-8");
	console.log(`✓ Generated TypeScript file: ${OUTPUT_FILE}`);
}

async function main() {
	try {
		console.log("Fetching Figma file...");
		const figmaFile = await fetchFigmaFile();

		console.log("Finding exportable nodes...");
		const exportableNodes = findExportableNodes(figmaFile.document);
		console.log(`Found ${exportableNodes.length} exportable icons`);

		if (exportableNodes.length === 0) {
			console.log("No exportable nodes found. Exiting.");
			return;
		}

		console.log("Fetching SVG exports from Figma...");
		const nodeIds = exportableNodes.map((node) => node.id);
		const svgUrls = await fetchSvgExports(nodeIds);

		// Clean and recreate components directory
		console.log("Cleaning output directory...");
		await rm(COMPONENTS_DIR, { recursive: true, force: true });
		await mkdir(COMPONENTS_DIR, { recursive: true });

		console.log("Downloading and transforming SVG files to React components...");
		const savedIcons: Array<{ name: string; filename: string }> = [];

		for (const node of exportableNodes) {
			const svgUrl = svgUrls[node.id];
			if (!svgUrl) {
				console.warn(`⚠ No SVG URL for ${node.name}, skipping`);
				continue;
			}

			let svgContent = await downloadSvg(svgUrl);
			const sanitizedName = sanitizeIconName(node.name);

			// Add title element to SVG for accessibility
			svgContent = svgContent.replace(
				/<svg([^>]*)>/,
				`<svg$1><title>${sanitizedName}</title>`
			);

			// Remove style attributes that override fill prop
			svgContent = svgContent.replace(/\s+style="[^"]*"/g, '');

			// Transform SVG to React component using SVGR with custom template
			const templatePath = join(__dirname, '../src/components/Icon/svgTemplate.cjs');
			const { default: templateFn } = await import(templatePath);
			const jsCode = await transform(
				svgContent,
				{
					dimensions: false,
					replaceAttrValues: {
						'#385994': '{props.fill}',
					},
					plugins: ['@svgr/plugin-jsx'],
					typescript: true,
					template: templateFn,
				},
				{ componentName: sanitizedName},
			);

			const filename = `${sanitizedName}.tsx`;
			const filePath = join(COMPONENTS_DIR, filename);

			await writeFile(filePath, jsCode, "utf-8");
			savedIcons.push({ name: sanitizedName, filename });
			console.log(`✓ Generated ${filename}`);
		}

		console.log("Generating TypeScript definitions...");
		await generateTypeScriptFile(savedIcons);

		// Format and organize imports with Biome
		console.log("Formatting and organizing imports with Biome...");
		try {
			const biomePath = join(process.cwd(), 'biome.json');
			const iconPath = join(process.cwd(), 'src/components/Icon');
			await execAsync(`yarn biome check --write --unsafe --config-path=${biomePath} ${iconPath}`);
			console.log("✓ Formatted and organized imports");
		} catch (error) {
			console.warn("⚠ Biome formatting failed, but continuing...");
			console.error(error);
		}

		console.log(`\n✅ Successfully fetched ${savedIcons.length} icons!`);
	} catch (error) {
		console.error("Error:", error);
		process.exit(1);
	}
}

main();
