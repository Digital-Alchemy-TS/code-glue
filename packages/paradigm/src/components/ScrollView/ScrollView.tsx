import {
	ScrollView as TGScrollView,
	type ScrollViewProps as TGScrollViewProps,
} from "tamagui"

import { useAlwaysBounceVertical } from "../../hooks/useAlwaysBounceVertical"

export const ScrollView = (props: TGScrollViewProps) => {
	const { onLayout, contentContainerStyle } = useAlwaysBounceVertical()

	if (props.alwaysBounceVertical) {
		return (
			<TGScrollView
				{...props}
				onLayout={(event) => {
					props.onLayout?.(event)
					onLayout(event)
				}}
				contentContainerStyle={{
					...(props.contentContainerStyle &&
					typeof props.contentContainerStyle === "object"
						? props.contentContainerStyle
						: {}),
					...(contentContainerStyle && typeof contentContainerStyle === "object"
						? contentContainerStyle
						: {}),
				}}
			/>
		)
	} else {
		return <TGScrollView {...props} />
	}
}
