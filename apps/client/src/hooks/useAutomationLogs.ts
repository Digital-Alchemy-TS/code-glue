import { useEffect, useState } from "react"

import { LogLevel } from "@code-glue/server/utils/types.mts"
import { baseUrl } from "@/utils/baseUrl"

export { LogLevel }
export type LogLine = {
	msg: string
	context: string
	level: LogLevel
	timestamp: number
	isHistorical?: boolean // true for logs that existed before connection
	[key: string]: unknown
}

const makeLogKey = (log: LogLine) =>
	`${log.timestamp}-${log.level}-${log.context}-${log.msg}`

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

		// fresh session: clear existing logs and seen set
		setLogs([])
		setIsLoading(true)
		setError(null)
		const seen = new Set<string>()

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
					// Mark initial logs as historical and replace all logs, deduped
					const historicalLogs: LogLine[] = []
					for (const raw of data.logs as LogLine[]) {
						const log = { ...raw, isHistorical: true }
						const key = makeLogKey(log)
						if (seen.has(key)) continue
						seen.add(key)
						historicalLogs.push(log)
					}
					setLogs(historicalLogs)
					setIsLoading(false)
				} else if (data.type === "log") {
					// Append new log (not marked as historical), deduped
					const incoming = { ...data.log, isHistorical: false } as LogLine
					const key = makeLogKey(incoming)
					if (seen.has(key)) return
					seen.add(key)
					setLogs((prev) => [...prev, incoming])
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
