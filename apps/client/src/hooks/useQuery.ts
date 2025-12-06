import { useQueryState } from "nuqs"

import type { QueryString } from "@/config"

export const useQuery = <T>(query: QueryString<T>) => {
	return useQueryState(query.key, query.options ?? {})
}
