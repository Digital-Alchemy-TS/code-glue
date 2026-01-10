import { ScrollView, Text } from "@code-glue/paradigm"
import { formatAutomationContext } from "@code-glue/server/utils/helpers/format.mts"
import {
	LogLevel,
	type LogLine,
	useAutomationLogs,
} from "@/hooks/useAutomationLogs"
import { appConfig } from "../../app.config"
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

const logKey = (log: LogLine) =>
	`${log.timestamp}-${log.level}-${log.context}-${log.msg}`
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
			{logs.map((log) => (
				<Text key={logKey(log)} _style={{ fontFamily: appConfig.logs.font }}>
					<Text
						color={getLevelColor(log.level)}
						letterCase={Text.letterCase.upper}
					>
						[{log.level}]
					</Text>
					<Text color="#666">
						{new Date(log.timestamp).toLocaleTimeString()}
					</Text>
					{log.isHistorical && (
						<span style={{ color: "#999", fontSize: 10 }}>[HIST] </span>
					)}
					{log.msg}
				</Text>
			))}
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
