-- Add active_version_id to stored_automation
ALTER TABLE "stored_automation" ADD "active_version_id" text;
--> statement-breakpoint
ALTER TABLE "stored_automation" DROP COLUMN "draft";
--> statement-breakpoint
ALTER TABLE "stored_automation" DROP COLUMN "version";
--> statement-breakpoint
CREATE TABLE "automation_versions" (
	"activated_from_version_id" text,
	"automation_id" text NOT NULL,
	"body" text NOT NULL,
	"date" timestamp NOT NULL,
	"documentation" text,
	"has_code_change" text NOT NULL DEFAULT 'true',
	"has_notes_change" text NOT NULL DEFAULT 'false',
	"id" text PRIMARY KEY NOT NULL,
	"is_active" text NOT NULL DEFAULT 'false',
	"is_draft" text NOT NULL DEFAULT 'false',
	"name" text,
	"notes" text,
	"parent_version_id" text,
	"was_auto_saved" text NOT NULL DEFAULT 'false',
	"written_by_ai" text NOT NULL DEFAULT 'false'
);
--> statement-breakpoint
-- Seed initial versions from existing automations
INSERT INTO "automation_versions" (
	"id", "automation_id", "body", "date", "documentation",
	"has_code_change", "has_notes_change",
	"is_active", "is_draft", "name",
	"was_auto_saved", "written_by_ai"
)
SELECT
	gen_random_uuid()::text,
	"id",
	"body",
	"create_date",
	"documentation",
	'true', 'false',
	'true', 'false', 'Initial version',
	'false', 'false'
FROM "stored_automation";
--> statement-breakpoint
-- Point each automation at its initial version
UPDATE "stored_automation" sa
SET "active_version_id" = av."id"
FROM "automation_versions" av
WHERE av."automation_id" = sa."id";
