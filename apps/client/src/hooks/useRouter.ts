import {
	type GenericParserBuilder,
	parseAsStringLiteral,
	useQueryStates,
} from "nuqs"
import { useCallback } from "react"

import { appConfig, type SectionIds, sectionIds } from "@/config"

type UnionToIntersection<U> = (
	U extends unknown
		? (k: U) => void
		: never
) extends (k: infer I) => void
	? I
	: never

type RoutesMap = typeof appConfig.routes
type AllRouteQueryStringsUnion = {
	[K in keyof RoutesMap]: RoutesMap[K] extends { queryStrings: infer QS }
		? QS
		: Record<never, never>
}[keyof RoutesMap]

type AllRouteQueryParsers = UnionToIntersection<AllRouteQueryStringsUnion>

// Pull all queryStrings out of our routes into a single map
const allRouteQueries: AllRouteQueryParsers = {} as AllRouteQueryParsers
for (const route of Object.values(appConfig.routes)) {
	if ("queryStrings" in route && route.queryStrings) {
		const queries = route.queryStrings as NonNullable<typeof route.queryStrings>
		for (const key of Object.keys(queries) as Array<keyof typeof queries>) {
			const parser = queries[key]
			;(allRouteQueries as Record<string, unknown>)[key as string] = parser
		}
	}
}

type RouteToQueryStrings<Id extends SectionIds> =
	(typeof appConfig.routes)[Id] extends {
		queryStrings: infer QS
	}
		? QS
		: never

type ParserValue<P> = P extends GenericParserBuilder<infer V>
	? V
	: P extends { parse: (value: unknown) => infer V }
		? V
		: P extends (...args: never[]) => infer V
			? V
			: unknown

export function useRouter() {
	const [queryParams, setQueryParams] = useQueryStates({
		route: parseAsStringLiteral(sectionIds),
		...allRouteQueries,
	})

	const navigateTo = useCallback(
		async (
			toRoute: SectionIds,
			params?: Record<string, unknown>,
		): Promise<void> => {
			const route = toRoute === "home" ? null : toRoute

			await setQueryParams({ ...params, route })
		},
		[setQueryParams],
	) as <Id extends SectionIds>(
		route: Id,
		...args: RouteToQueryStrings<Id> extends never
			? [params?: undefined]
			: [
					params: {
						[K in keyof RouteToQueryStrings<Id>]: ParserValue<
							RouteToQueryStrings<Id>[K]
						>
					},
				]
	) => Promise<void>

	return [queryParams, navigateTo] as const
}
