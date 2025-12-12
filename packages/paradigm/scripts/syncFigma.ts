import { exec } from "node:child_process"
import { mkdir, rm, writeFile } from "node:fs/promises"
import { dirname, join } from "node:path"
import { fileURLToPath } from "node:url"
import { promisify } from "node:util"
import { transform } from "@svgr/core"
import { config } from "dotenv"

import { letterCase } from "../src/components/Text/letterCase.js"

const execAsync = promisify(exec)
const __dirname = dirname(fileURLToPath(import.meta.url))

// Load environment variables from .env file
config()

// Configuration - set these via environment variables
const FIGMA_ACCESS_TOKEN = process.env.FIGMA_ACCESS_TOKEN
const FIGMA_FILE_ID = process.env.FIGMA_FILE_ID
const RAW_ICON_DIRECTORY = join(
	process.cwd(),
	"src",
	"components",
	"Icon",
	"generated",
)
const RAW_ICON_INDEX_FILE = join(
	process.cwd(),
	"src",
	"components",
	"Icon",
	"generated",
	"index.tsx",
)

interface FigmaNode {
	id: string
	name: string
	type: string
	children?: FigmaNode[]
	exportSettings?: Array<{
		format: string
		suffix?: string
		constraint?: { type: string; value: number }
	}>
}

interface FigmaFileResponse {
	document: FigmaNode
	styles?: Record<
		string,
		{ key: string; name: string; styleType: string; description?: string }
	>
}

interface FigmaImageResponse {
	images: Record<string, string>
}

interface Effect {
	type: "DROP_SHADOW" | "INNER_SHADOW" | "LAYER_BLUR" | "BACKGROUND_BLUR"
	visible: boolean
	radius?: number
	color?: { r: number; g: number; b: number; a: number }
	offset?: { x: number; y: number }
	spread?: number
	blendMode?: string
}

interface FigmaNode {
	id: string
	name: string
	type: string
	effects?: Effect[]
	styles?: {
		effect?: string
		fill?: string
		text?: string
		grid?: string
		stroke?: string
	}
	children?: FigmaNode[]
	exportSettings?: Array<{
		format: string
		suffix?: string
		constraint?: { type: string; value: number }
	}>
}

async function fetchFigmaFile(): Promise<FigmaFileResponse> {
	if (!FIGMA_ACCESS_TOKEN || !FIGMA_FILE_ID) {
		throw new Error(
			"Missing FIGMA_ACCESS_TOKEN or FIGMA_FILE_ID environment variables",
		)
	}

	const response = await fetch(
		`https://api.figma.com/v1/files/${FIGMA_FILE_ID}`,
		{
			headers: {
				"X-Figma-Token": FIGMA_ACCESS_TOKEN,
			},
		},
	)

	if (!response.ok) {
		throw new Error(`Failed to fetch Figma file: ${response.statusText}`)
	}

	return response.json()
}

function findExportableNodes(
	node: FigmaNode,
	exportableNodes: Array<{ id: string; name: string }> = [],
	isInIconsPage = false,
): Array<{ id: string; name: string }> {
	// Check if this is the Icons page
	const isIconsPage = node.type === "CANVAS" && node.name === "Icons"

	// Only include nodes that are in the Icons page and have export settings
	if (isInIconsPage && node.exportSettings && node.exportSettings.length > 0) {
		exportableNodes.push({ id: node.id, name: node.name })
	}

	if (node.children) {
		for (const child of node.children) {
			findExportableNodes(child, exportableNodes, isIconsPage || isInIconsPage)
		}
	}

	return exportableNodes
}

function findNodesWithEffectStyles(
	node: FigmaNode,
	effectsMap: Map<string, Effect[]> = new Map(),
): Map<string, Effect[]> {
	// Look for nodes that have an effect style key and actual effects
	if (node.styles?.effect && node.effects && node.effects.length > 0) {
		const visibleEffects = node.effects.filter((e) => e.visible !== false)
		if (visibleEffects.length > 0) {
			// Store by the style key, not the node name
			effectsMap.set(node.styles.effect, visibleEffects)
		}
	}

	if (node.children) {
		for (const child of node.children) {
			findNodesWithEffectStyles(child, effectsMap)
		}
	}

	return effectsMap
}

async function fetchSvgExports(
	nodeIds: string[],
): Promise<Record<string, string>> {
	if (!FIGMA_ACCESS_TOKEN || !FIGMA_FILE_ID) {
		throw new Error(
			"Missing FIGMA_ACCESS_TOKEN or FIGMA_FILE_ID environment variables",
		)
	}

	const response = await fetch(
		`https://api.figma.com/v1/images/${FIGMA_FILE_ID}?ids=${nodeIds.join(",")}&format=svg`,
		{
			headers: {
				"X-Figma-Token": FIGMA_ACCESS_TOKEN,
			},
		},
	)

	if (!response.ok) {
		throw new Error(`Failed to fetch SVG exports: ${response.statusText}`)
	}

	const data: FigmaImageResponse = await response.json()
	return data.images
}

async function downloadSvg(url: string): Promise<string> {
	const response = await fetch(url)
	if (!response.ok) {
		throw new Error(`Failed to download SVG: ${response.statusText}`)
	}
	return response.text()
}

function sanitizeIconName(name: string): string {
	// Convert to PascalCase and remove invalid characters
	return name
		.split(/[-_\s]+/)
		.map((part) => part.charAt(0).toUpperCase() + part.slice(1))
		.join("")
		.replace(/[^a-zA-Z0-9]/g, "")
}

async function generateTypeScriptFile(
	icons: Array<{ name: string; filename: string }>,
): Promise<void> {
	// Sort icons alphabetically by name
	const sortedIcons = [...icons].sort((a, b) => a.name.localeCompare(b.name))

	const imports = sortedIcons
		.map(({ name }) => `import ${name} from "./${name}"`)
		.join("\n")

	const exports = sortedIcons
		.map(({ name }) => `\t${name}: ${name} as WebIconComponentType,`)
		.join("\n")

	const attachments = sortedIcons
		.map(({ name }) => `Icon.${name} = rawIcons.${name}`)
		.join("\n")

	const content = `// This file is auto-generated. Do not edit manually.

import { ComponentError } from "../../ComponentError"
// Generated Icons:
${imports}

import type { WebIconComponentType } from "../types"

export const rawIcons = {
${exports}
} as const

const Icon = () => (
	<ComponentError text="Icon can't be used by itself. Use a icon it provides (Icon.Today for&nbsp;example)."/>
)

${attachments}

export { Icon }
`

	await writeFile(RAW_ICON_INDEX_FILE, content, "utf-8")
	console.log(`✓ Generated TypeScript file: ${RAW_ICON_INDEX_FILE}`)
}

async function main() {
	try {
		console.log("Fetching Figma file...")
		const figmaFile = await fetchFigmaFile()

		console.log("Finding exportable nodes...")
		const exportableNodes = findExportableNodes(figmaFile.document)
		console.log(`Found ${exportableNodes.length} exportable icons`)

		// Extract effect styles from file data
		console.log("\nExtracting Figma effect styles...")
		let effectStylesWithValues: {
			key: string
			name: string
			description: string
			effects: Effect[]
		}[] = []

		// Find all nodes that have effect styles applied (by style key)
		const effectsByStyleKey = findNodesWithEffectStyles(figmaFile.document)
		console.log(
			`Found ${effectsByStyleKey.size} nodes with effect styles in document`,
		)

		if (figmaFile.styles) {
			const effectStyleIds = Object.keys(figmaFile.styles).filter(
				(id) => figmaFile.styles?.[id]?.styleType === "EFFECT",
			)
			console.log(`Found ${effectStyleIds.length} effect styles in file`)

			// Match styles with actual effects from nodes using style keys
			if (effectStyleIds.length > 0) {
				effectStylesWithValues = effectStyleIds.map((styleId) => {
					const style = figmaFile.styles?.[styleId]
					const styleName = style?.name || "Unknown"
					// Look up effects by the style ID
					const effects = effectsByStyleKey.get(styleId) || []

					return {
						key: style?.key || styleId,
						name: styleName,
						description: style?.description || "",
						effects,
					}
				})
				const withEffects = effectStylesWithValues.filter(
					(s) => s.effects.length > 0,
				).length
				console.log(
					`✓ Extracted ${effectStylesWithValues.length} effect styles (${withEffects} with values)`,
				)
			}
		} else {
			console.warn("⚠ No styles metadata found in file response")
		}

		// Transform effect styles into simplified shadow format for CSS
		// Default gray color in Figma: rgb(0.5, 0.5, 0.5) which is hsl(0, 0%, 50%)
		const isDefaultGray = (color: { r: number; g: number; b: number }) => {
			const tolerance = 0.01 // Allow small floating point differences
			return (
				Math.abs(color.r - 0.5) < tolerance &&
				Math.abs(color.g - 0.5) < tolerance &&
				Math.abs(color.b - 0.5) < tolerance
			)
		}

		// Convert to object with camelCased keys
		const shadowStylesArray = effectStylesWithValues
			.map((style) => {
				// Include both DROP_SHADOW and INNER_SHADOW
				const allShadows = style.effects
					.filter(
						(e) =>
							(e.type === "DROP_SHADOW" || e.type === "INNER_SHADOW") &&
							e.visible !== false,
					)
					.map((effect) => {
						const color = effect.color || { r: 0, g: 0, b: 0 }
						// Check if this is the replaceable default gray or black
						const useCustomColor = isDefaultGray(color)

						return {
							type: effect.type, // Keep track of shadow type
							offsetX: effect.offset?.x || 0,
							offsetY: effect.offset?.y || 0,
							blur: effect.radius || 0,
							opacity: effect.color?.a || 0,
							useCustomColor, // true if this shadow should use the provided color
							// Store fixed color as RGB 0-255 if it's not replaceable
							fixedColor: useCustomColor
								? undefined
								: {
										r: Math.round(color.r * 255),
										g: Math.round(color.g * 255),
										b: Math.round(color.b * 255),
									},
						}
					})

				return {
					name: style.name,
					shadows: allShadows,
				}
			})
			.filter((style) => style.shadows.length > 0)

		// Convert array to object with camelCased keys
		const shadowStyles = Object.fromEntries(
			shadowStylesArray.map((style) => [
				letterCase.camel(style.name),
				style.shadows,
			]),
		)

		// Write shadow styles to file
		const shadowPath = join(process.cwd(), "src", "generated", "shadows.ts")
		const shadowKeys = Object.keys(shadowStyles)
		const shadowContent = `// This file is auto-generated. Do not edit manually.
// Generated on ${new Date().toISOString()}

export const shadowStyles = ${JSON.stringify(shadowStyles, null, 2)} as const;

export type ShadowName = keyof typeof shadowStyles;
`

		// Ensure directory exists
		await mkdir(join(process.cwd(), "src", "generated"), { recursive: true })

		await writeFile(shadowPath, shadowContent, "utf-8")
		console.log(`\n✓ Wrote ${shadowKeys.length} shadow styles to ${shadowPath}`)

		// Format shadows with Biome
		try {
			const biomePath = join(process.cwd(), "biome.json")
			await execAsync(
				`yarn biome check --write --unsafe --config-path=${biomePath} ${shadowPath}`,
			)
			console.log("✓ Formatted shadows with Biome")
		} catch (_error) {
			console.warn("⚠ Biome formatting failed for shadows, but continuing...")
		}

		if (exportableNodes.length === 0) {
			console.log("\nNo exportable nodes found. Skipping icon generation.")
			return
		}

		console.log("Fetching SVG exports from Figma...")
		const nodeIds = exportableNodes.map((node) => node.id)
		const svgUrls = await fetchSvgExports(nodeIds)

		// Clean and recreate components directory
		console.log("Cleaning output directory...")
		await rm(RAW_ICON_DIRECTORY, { recursive: true, force: true })
		await mkdir(RAW_ICON_DIRECTORY, { recursive: true })

		console.log("Downloading and transforming SVG files to React components...")
		const savedIcons: Array<{ name: string; filename: string }> = []

		for (const node of exportableNodes) {
			const svgUrl = svgUrls[node.id]
			if (!svgUrl) {
				console.warn(`⚠ No SVG URL for ${node.name}, skipping`)
				continue
			}

			let svgContent = await downloadSvg(svgUrl)
			const sanitizedName = sanitizeIconName(node.name)

			// Add title element to SVG for accessibility
			svgContent = svgContent.replace(
				/<svg([^>]*)>/,
				`<svg$1><title>${sanitizedName}</title>`,
			)

			// Remove style attributes that override fill prop
			svgContent = svgContent.replace(/\s+style="[^"]*"/g, "")

			// Transform SVG to React component using SVGR with custom template
			const templatePath = join(
				__dirname,
				"../src/components/Icon/svgTemplate.cjs",
			)
			const { default: templateFn } = await import(templatePath)
			const jsCode = await transform(
				svgContent,
				{
					dimensions: false,
					replaceAttrValues: {
						"#385994": "{props.fill}",
					},
					plugins: ["@svgr/plugin-jsx"],
					typescript: true,
					template: templateFn,
				},
				{ componentName: sanitizedName },
			)

			const filename = `${sanitizedName}.tsx`
			const filePath = join(RAW_ICON_DIRECTORY, filename)

			await writeFile(filePath, jsCode, "utf-8")
			savedIcons.push({ name: sanitizedName, filename })
			console.log(`✓ Generated ${filename}`)
		}

		console.log("Generating TypeScript definitions...")
		await generateTypeScriptFile(savedIcons)

		// Format and organize imports with Biome
		console.log("Formatting and organizing imports with Biome...")
		try {
			const biomePath = join(process.cwd(), "biome.json")
			const iconPath = join(process.cwd(), "src/components/Icon")
			await execAsync(
				`yarn biome check --write --unsafe --config-path=${biomePath} ${iconPath}`,
			)
			console.log("✓ Formatted and organized imports")
		} catch (error) {
			console.warn("⚠ Biome formatting failed, but continuing...")
			console.error(error)
		}

		console.log(`\n✅ Successfully fetched ${savedIcons.length} icons!`)
	} catch (error) {
		console.error("Error:", error)
		process.exit(1)
	}
}

main()
