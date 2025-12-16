import { useCurrentAutomation } from "@/hooks/useAutomation"
import { useAutomationLogs } from "@/hooks/useAutomationLogs"

/**
 * Generate logger context from title (matches server's formatObjectId behavior)
 */
function formatObjectId(title: string): string {
	return title
		.toLowerCase()
		.replace(/[^a-z0-9]+/g, "_")
		.replace(/^_+|_+$/g, "")
}

/**
 * Example component that displays logs for the currently selected automation
 */
export function AutomationLogs() {
	const { automationSnapshot } = useCurrentAutomation()

	// Generate logger context from title (server uses formatObjectId(title))
	const loggerContext = automationSnapshot.title
		? formatObjectId(automationSnapshot.title)
		: ""

	const { logs, isLoading, error } = useAutomationLogs({
		context: loggerContext,
		enabled: !!loggerContext,
		// Optional: filter by level
		// level: "warn",
		level: "trace",
	})

	if (!loggerContext) {
		return <div>No automation selected</div>
	}

	if (isLoading) {
		return <div>Loading logs...</div>
	}

	if (error) {
		return <div>Error: {error.message}</div>
	}

	return (
		<div>
			<h2>Logs for {automationSnapshot.title}</h2>
			<div style={{ fontSize: 11, color: "gray", marginBottom: 8 }}>
				Logger context: <code>{loggerContext}</code>
			</div>
			<div>
				{logs.length === 0 && <div>No logs yet</div>}
				{logs.map((log, i) => (
					<div
						key={i}
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
