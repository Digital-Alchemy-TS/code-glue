import {
	SizableText as TamaguiText,
	type TamaguiTextElement,
	type TextProps as TamaguiTextProps,
} from "tamagui"

type ParadigmTextProps = {
	ref?: React.Ref<TamaguiTextElement>
}

export type TextProps = TamaguiTextProps & ParadigmTextProps

const Text = (props: TextProps) => {
	const { children, ref, ...otherProps } = props
	return (
		<TamaguiText ref={ref} {...otherProps}>
			{children}
		</TamaguiText>
	)
}

export { Text }
