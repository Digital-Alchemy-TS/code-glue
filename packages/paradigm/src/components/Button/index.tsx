import {
	type TamaguiElement,
	Button as TButton,
	type ButtonProps as TButtonProps,
} from "tamagui"

type ParadigmButtonProps = {
	label?: string
	ref?: React.Ref<TamaguiElement>
}

export type ButtonProps = Omit<TButtonProps, "children"> & ParadigmButtonProps

const Button = (props: ButtonProps) => {
	const { label, ref, ...otherProps } = props
	return (
		<TButton size="$input" ref={ref} {...otherProps}>
			{label}
		</TButton>
	)
}

export { Button }
