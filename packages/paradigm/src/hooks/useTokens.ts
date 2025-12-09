import React from "react"

import { ParadigmContext } from "@/components/ParadigmProvider"
export const useDesign = () => {
	return React.useContext(ParadigmContext)
}
