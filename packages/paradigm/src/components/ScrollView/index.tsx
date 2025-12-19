import React from "react"

import { IsInScrollViewContext } from "./context"
import { ScrollView as UnwrappedScrollView } from "./ScrollView"

import type { ScrollViewProps } from "tamagui"

const NormalScrollView = (props: ScrollViewProps) => {
	return (
		<IsInScrollViewContext value={true}>
			<UnwrappedScrollView {...props} />
		</IsInScrollViewContext>
	)
}

const MemoNormalScrollView = React.memo(NormalScrollView)

const ScrollView = MemoNormalScrollView as typeof MemoNormalScrollView & {
	IsInContext: typeof IsInScrollViewContext
}

ScrollView.IsInContext = IsInScrollViewContext

export { ScrollView }
