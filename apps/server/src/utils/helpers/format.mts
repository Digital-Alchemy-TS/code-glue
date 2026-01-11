/**
 * Generate a consistent logger context ID from an automation title
 *
 * This function:
 * - Converts the title to lowercase
 * - Preserves emoji characters (useful for automation identification)
 * - Removes other special characters and spaces, replacing with underscores
 * - Strips leading and trailing underscores
 * - Prefixes with "automation/" for clear categorization in logs
 *
 * Used consistently across server and client for logging context
 *
 * @example
 * formatAutomationContext("🏠 Home Automation") // "automation/🏠_home_automation"
 * formatAutomationContext("My Auto") // "automation/my_auto"
 * formatAutomationContext("🏠") // "automation/🏠"
 */
export function formatAutomationContext(title: string): string {
  const sanitized = title
    .toLowerCase()
    .replace(/[^a-z0-9_\p{Emoji}]+/gu, "_")
    .replace(/^_+/, "")
    .replace(/_$/, "");

  return `automation/${sanitized}`;
}
