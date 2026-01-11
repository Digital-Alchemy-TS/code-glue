import type { SVGProps } from "react"

export type WebIconComponentProps = {
	size: number
	color?: string
	style?: Omit<
		SVGProps<SVGSVGElement>["style"],
		"backgroundColor" | "width" | "height"
	>
}

export type WebIconComponentType = React.FC<WebIconComponentProps> // & SvgProps
