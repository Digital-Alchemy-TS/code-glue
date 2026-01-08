import { useEffect, useState } from "react"

import { baseUrl } from "@/utils/baseUrl"

export type LogLevel = "trace" | "debug" | "info" | "warn" | "error" | "fatal"

export type LogLine = {
	msg: string
	context: string
	level: LogLevel
	timestamp: number
	isHistorical?: boolean // true for logs that existed before connection
	[key: string]: unknown
}

type UseAutomationLogsOptions = {
	/**
	 * The logging context to listen to.
	 */
	context?: string
	level?: LogLevel
	enabled?: boolean
}

export const useAutomationLogs = ({
	context,
	level,
	enabled = true,
}: UseAutomationLogsOptions = {}) => {
	const [logs, setLogs] = useState<LogLine[]>([])
	const [isLoading, setIsLoading] = useState(false)
	const [error, setError] = useState<Error | null>(null)

	useEffect(() => {
		if (!enabled) {
			setLogs([])
			setIsLoading(false)
			setError(null)
			return
		}

		setIsLoading(true)
		setError(null)

		const params = new URLSearchParams()
		if (context) params.append("context", context)
		if (level) params.append("level", level)

		const url = `${baseUrl}/api/v1/logs/stream?${params.toString()}`

		const eventSource = new EventSource(url)

		eventSource.onopen = () => {
			setIsLoading(false)
		}

		eventSource.onmessage = (event) => {
			try {
				const data = JSON.parse(event.data)

				if (data.type === "initial") {
					// Mark initial logs as historical and replace all logs
					const historicalLogs = data.logs.map((log: LogLine) => ({
						...log,
						isHistorical: true,
					}))
					setLogs(historicalLogs)
					setIsLoading(false)
				} else if (data.type === "log") {
					// Append new log (not marked as historical)
					setLogs((prev) => [...prev, { ...data.log, isHistorical: false }])
				}
			} catch (err) {
				console.error("[useAutomationLogs] Failed to parse event:", err, event)
			}
		}

		eventSource.onerror = (err) => {
			console.error(
				"[useAutomationLogs] EventSource error:",
				err,
				eventSource.readyState,
			)

			// Only set error if connection failed completely
			if (eventSource.readyState === EventSource.CLOSED) {
				setError(
					new Error(
						`Failed to connect to log stream (readyState: ${eventSource.readyState})`,
					),
				)
				setIsLoading(false)
			}
		}

		return () => {
			eventSource.close()
		}
	}, [context, level, enabled])

	return { logs, isLoading, error }
}
