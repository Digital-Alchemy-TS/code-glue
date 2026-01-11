import * as rtlDetect from "rtl-detect"

export const isRTL = () => {
	return rtlDetect.isRtlLang(navigator.language)
}
