import { Input, type InputProps } from "tamagui"

import type { TextInput as RNTextInput } from "react-native"

type ParadigmTextInputProps = {
	ref?: React.Ref<RNTextInput>
}

export type TextInputProps = InputProps & ParadigmTextInputProps

export const TextInput = (props: TextInputProps) => {
	const { children, ref, ...otherProps } = props
	return (
		<Input size="$input" ref={ref} {...otherProps}>
			{children}
		</Input>
	)
}
