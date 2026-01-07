import { type GenericParserBuilder, parseAsString, useQueryStates } from "nuqs"
import { useCallback, useMemo } from "react"

import {
	appConfig,
	type SectionConfig,
	type SectionIds,
	sectionIds,
} from "@/config"

const SECTION_MAP = Object.fromEntries(
	appConfig.routes.map((route) => [route.id, route]),
)

// Helpers to merge the queryStrings shape across all routes while keeping per-key parser types.
type AnyQueryStrings = SectionConfig extends { queryStrings: infer QS }
	? QS
	: never
type MergedQueryStrings = {
	[K in AnyQueryStrings extends unknown
		? keyof AnyQueryStrings
		: never]: AnyQueryStrings extends {
		[P in K]: infer V
	}
		? V
		: never
}

// Build a map of all query parsers from routes.
const allRouteQueries: MergedQueryStrings = {} as MergedQueryStrings
for (const route of appConfig.routes) {
	if ("queryStrings" in route && route.queryStrings) {
		for (const [key, parser] of Object.entries(route.queryStrings)) {
			// Cast is safe because key originates from route.queryStrings
			;(allRouteQueries as Record<string, unknown>)[key] = parser
		}
	}
}

export function useRouter() {
	// Get all current query states with a single hook driven by appConfig.routes
	const [queryParams, setQueryParams] = useQueryStates({
		route: parseAsString,
		...allRouteQueries,
	})
	const sectionId = (queryParams.route as SectionIds | null) ?? sectionIds[0]

	// Current section info
	const currentSection = useMemo(() => {
		if (!sectionId || !(sectionId in SECTION_MAP)) {
			return null
		}

		const section = SECTION_MAP[sectionId as SectionIds] as SectionConfig
		const variables =
			"queryStrings" in section && section.queryStrings
				? Object.fromEntries(
						Object.keys(section.queryStrings).map((key) => [
							key,
							(queryParams as Record<string, unknown>)[key] ?? null,
						]),
					)
				: {}
		return {
			id: sectionId as SectionIds,
			config: section,
			variables,
		}
	}, [sectionId, queryParams])

	// Navigate to a section; if the route declares queryStrings, the variables are required and typed from the parser output.
	type RouteToQueryStrings<Id extends SectionIds> = Extract<
		SectionConfig,
		{ id: Id }
	> extends { queryStrings: infer QS }
		? QS
		: never

	type ParserValue<P> = P extends GenericParserBuilder<infer V>
		? V
		: P extends { parse: (value: unknown) => infer V }
			? V
			: P extends (...args: never[]) => infer V
				? V
				: unknown

	const navigateTo = useCallback(
		async (
			id: SectionIds,
			variables?: Record<string, unknown>,
		): Promise<void> => {
			const newParams: Record<string, unknown> = { route: String(id) }
			const section = SECTION_MAP[id]

			if (
				variables &&
				section &&
				"queryStrings" in section &&
				section.queryStrings
			) {
				Object.assign(newParams, variables)
			}

			await setQueryParams(newParams as Record<string, string | null>)
		},
		[setQueryParams],
	) as <Id extends SectionIds>(
		id: Id,
		...args: RouteToQueryStrings<Id> extends never
			? [variables?: undefined]
			: [
					variables: {
						[K in keyof RouteToQueryStrings<Id>]: ParserValue<
							RouteToQueryStrings<Id>[K]
						>
					},
				]
	) => Promise<void>

	navigateTo("logs") // Example usage

	return {
		currentSection,
		navigateTo,
	}
}
