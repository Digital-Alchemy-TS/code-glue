// @ts-expect-error no types on browser info
import browserInfo from "browser-info"

export const browser =
	typeof window === "undefined" ? { name: "server" } : browserInfo()
