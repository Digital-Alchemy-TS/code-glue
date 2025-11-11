import { type TamaguiElement, View as TamaguiView } from "tamagui"

import { type SpaceProps, useSpace } from "../../hooks/useSpace"

import type React from "react"

export type ViewProps = React.ComponentPropsWithRef<typeof TamaguiView> &
	SpaceProps & {
		children?: React.ReactNode
		ref?: React.Ref<TamaguiElement>
	}

const View: React.FC<ViewProps> = ({
	children,
	ref,

	// Space Props
	m,
	mt,
	mr,
	mb,
	ml,
	mx,
	my,
	p,
	pt,
	pr,
	pb,
	pl,
	px,
	py,

	...otherProps
}: ViewProps) => {
	const { marginStyles, paddingStyles } = useSpace({
		m,
		mt,
		mr,
		mb,
		ml,
		mx,
		my,
		p,
		pt,
		pr,
		pb,
		pl,
		px,
		py,
	})

	return (
		<TamaguiView
			ref={ref}
			style={[marginStyles, paddingStyles]}
			{...otherProps}
		>
			{children}
		</TamaguiView>
	)
}

export { View }
