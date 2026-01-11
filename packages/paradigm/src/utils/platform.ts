import {
	Platform as NativePlatform,
	type PlatformIOSStatic,
} from "react-native"
import { getDeviceType } from "react-native-device-info"

import { browser } from "./browser"
import { isRTL } from "./localization"

const isServer = typeof window === "undefined"
const isCypress = !isServer && ((window as any).Cypress as boolean)
const isNative = ["ios", "android"].includes(NativePlatform.OS)
const isWeb = NativePlatform.OS === "web"
const isMobileBrowser = ["Android", "iOS"].includes(browser.os)
let isIpad = false

if (NativePlatform.OS === "ios") {
	const IOSPlatform = NativePlatform as PlatformIOSStatic
	if (IOSPlatform.isPad) isIpad = true
}

let isDesktop = false

let deviceType = "device"

// https://github.com/react-native-device-info/react-native-device-info/issues/1296
switch (getDeviceType()) {
	case "Desktop":
		deviceType = "Computer"
		isDesktop = true
		break
	case "Handset":
		deviceType = "iPhone"
		break
	case "Tablet":
		deviceType = "iPad"
}

export const Platform = {
	...NativePlatform,
	isCypress,
	isWeb,
	isIpad,
	isNative,
	isDesktop,
	isServer,
	isMobileBrowser,
	deviceType,
	isRTL: isServer ? false : isRTL(),
	OS: isWeb ? browser.os : NativePlatform.OS,
	isSafari: browser.name === "Safari",
}
