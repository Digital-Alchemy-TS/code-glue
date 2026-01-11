import React from "react"

import { IsInScrollViewContext } from "./context"
import {
	type ScrollViewRef,
	ScrollView as UnwrappedScrollView,
} from "./ScrollView"

import type { ScrollViewProps, ScrollView as TGScrollView } from "tamagui"

const NormalScrollView = (
	props: ScrollViewProps & { ref?: React.Ref<TGScrollView> },
) => {
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

export { ScrollView, type ScrollViewRef }
