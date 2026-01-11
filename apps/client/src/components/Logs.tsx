import { useCallback, useEffect, useRef } from "react"

import { ScrollView, type ScrollViewRef, Text } from "@code-glue/paradigm"
import { formatAutomationContext } from "@code-glue/server/utils/helpers/format.mts"
import {
	LogLevel,
	type LogLine,
	useAutomationLogs,
} from "@/hooks/useAutomationLogs"
import { appConfig } from "../../app.config"
import { useAutomation } from "../hooks/useAutomation"

import type React from "react"
import type { ScrollView as RNScrollView } from "react-native"

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

	/** Optional ref for parent access to ScrollView methods */
	ref: React.Ref<ScrollViewRef>
}

const logKey = (log: LogLine) =>
	`${log.timestamp}-${log.level}-${log.context}-${log.msg}`

const LONGEST_LEVEL_STRING = Math.max(
	...Object.values(LogLevel).map((level) => level.length),
)

const getLogLevelPadding = (level: LogLevel) =>
	" ".repeat(Math.max(0, LONGEST_LEVEL_STRING - level.length))

export const Logs = ({
	automationId,
	level = LogLevel.trace,
	ref,
}: LogsProps) => {
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

	useEffect(() => {
		if (!isLoading && logs.length > 0 && ref?.current) {
			// Ensure layout/paint has occurred before scrolling
			requestAnimationFrame(() => {
				ref.current?.scrollToEnd?.({ animated: true })
			})
		}
	}, [logs, isLoading, ref?.current])

	if (isLoading) {
		return <div>Loading logs...</div>
	}

	if (error) {
		return <div>Error: {error.message}</div>
	}

	return (
		<ScrollView ref={ref} scrollBehavior="smooth">
			{logs.map((log) => (
				<Text
					style={Text.style.footnote}
					key={logKey(log)}
					_style={{ fontFamily: appConfig.logs.font }}
					color={log.isHistorical ? "$colorDisabled" : "$color"}
				>
					<Text
						color={!log.isHistorical && getLevelColor(log.level)}
						letterCase={Text.letterCase.upper}
					>
						{getLogLevelPadding(log.level)}[{log.level}]
					</Text>
					<Text>{new Date(log.timestamp).toLocaleTimeString()}</Text>
					<Text> {log.msg}</Text>
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
