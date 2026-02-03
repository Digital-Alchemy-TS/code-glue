import { useQueryState } from "nuqs"

import { appConfig, type QueryIds } from "@/config"

export function useQuery(queryId: QueryIds) {
	return useQueryState(queryId, appConfig.queries[queryId])
}
