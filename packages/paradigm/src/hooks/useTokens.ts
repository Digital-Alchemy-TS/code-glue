import React from "react"

import { ParadigmContext } from "../components/ParadigmProvider"
export const useTokens = () => {
	return React.useContext(ParadigmContext)
}
