-- Add active_version_id to stored_automation
ALTER TABLE `stored_automation` ADD `active_version_id` varchar(36);
--> statement-breakpoint
ALTER TABLE `stored_automation` DROP COLUMN `draft`;
--> statement-breakpoint
ALTER TABLE `stored_automation` DROP COLUMN `version`;
--> statement-breakpoint
CREATE TABLE `automation_versions` (
	`activated_from_version_id` varchar(36),
	`automation_id` varchar(36) NOT NULL,
	`body` text NOT NULL,
	`date` timestamp NOT NULL,
	`documentation` text,
	`has_code_change` varchar(10) NOT NULL DEFAULT 'true',
	`has_notes_change` varchar(10) NOT NULL DEFAULT 'false',
	`id` varchar(36) NOT NULL,
	`is_active` varchar(10) NOT NULL DEFAULT 'false',
	`is_draft` varchar(10) NOT NULL DEFAULT 'false',
	`name` varchar(255),
	`notes` text,
	`parent_version_id` varchar(36),
	`was_auto_saved` varchar(10) NOT NULL DEFAULT 'false',
	`written_by_ai` varchar(10) NOT NULL DEFAULT 'false',
	CONSTRAINT `automation_versions_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
-- Seed initial versions from existing automations
INSERT INTO `automation_versions` (
	`id`, `automation_id`, `body`, `date`, `documentation`,
	`has_code_change`, `has_notes_change`,
	`is_active`, `is_draft`, `name`,
	`was_auto_saved`, `written_by_ai`
)
SELECT
	UUID(),
	`id`,
	`body`,
	`create_date`,
	`documentation`,
	'true', 'false',
	'true', 'false', 'Initial version',
	'false', 'false'
FROM `stored_automation`;
--> statement-breakpoint
-- Point each automation at its initial version
UPDATE `stored_automation` sa
JOIN `automation_versions` av ON av.`automation_id` = sa.`id`
SET sa.`active_version_id` = av.`id`;
