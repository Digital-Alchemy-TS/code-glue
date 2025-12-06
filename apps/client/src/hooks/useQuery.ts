import { useQueryState } from "nuqs"

import { appConfig, type QueryString } from "@/config"

const useQuery = <T>(query: QueryString<T>) => {
	return useQueryState(query.key, query.options ?? {})
}

useQuery.queries = appConfig.queryStrings

export { useQuery }
