import { ScrollView } from "@code-glue/paradigm"
import { formatAutomationContext } from "@code-glue/server/utils/helpers/format.mts"
import { LogLevel, useAutomationLogs } from "@/hooks/useAutomationLogs"
import { useAutomation } from "../hooks/useAutomation"

type LogsProps = {
	/**
	 * filter to just show logs for a given automation ID
	 */
	automationId?: string
	/**
	 * level to filter logs by.
	 * Defaults to LogLevel.trace
	 */
	level?: LogLevel
}

export const Logs = ({ automationId, level = LogLevel.trace }: LogsProps) => {
	const { automationSnapshot: automation } = useAutomation(automationId)

	const loggerContext = automationId
		? formatAutomationContext(automation.title)
		: undefined

	const options: Parameters<typeof useAutomationLogs>[0] = {
		enabled: true,
		level,
	}

	if (loggerContext) {
		options.context = loggerContext
	}

	const { logs, isLoading, error } = useAutomationLogs(options)

	if (isLoading) {
		return <div>Loading logs...</div>
	}

	if (error) {
		return <div>Error: {error.message}</div>
	}

	return (
		<ScrollView>
			<div>
				<div>
					{logs.length === 0 && <div>No logs yet</div>}
					{logs.map((log) => (
						<div
							key={log.timestamp}
							style={{
								fontFamily: "monospace",
								fontSize: 12,
								opacity: log.isHistorical ? 0.6 : 1,
								borderLeft: log.isHistorical
									? "2px solid #ccc"
									: "2px solid #4CAF50",
								paddingLeft: 8,
								marginBottom: 4,
							}}
						>
							<span style={{ color: getLevelColor(log.level) }}>
								[{log.level.toUpperCase()}]
							</span>{" "}
							<span style={{ color: "#666" }}>
								{new Date(log.timestamp).toLocaleTimeString()}
							</span>{" "}
							{log.isHistorical && (
								<span style={{ color: "#999", fontSize: 10 }}>[HIST] </span>
							)}
							{log.msg}
						</div>
					))}
				</div>
			</div>
		</ScrollView>
	)
}

function getLevelColor(level: string): string {
	switch (level) {
		case "error":
		case "fatal":
			return "red"
		case "warn":
			return "orange"
		case "info":
			return "blue"
		case "debug":
			return "gray"
		case "trace":
			return "lightgray"
		default:
			return "black"
	}
}
