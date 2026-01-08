import type { TServiceParams } from "@digital-alchemy/core";

export function TypeWriterService({ logger, type_build }: TServiceParams) {
  // Packages that ATA is allowed to fetch for Monaco types to make sure all TS edits autocomplete.
  const ALLOWED_ATA_PACKAGES = [
    "type-fest",
    "node",
    "tagged-tag",
    "@digital-alchemy/core",
    "@digital-alchemy/hass",
    "@digital-alchemy/synapse",
    "@digital-alchemy/automation",
    "dayjs",
  ];

  async function build(): Promise<{
    mappings: string;
    registry: string;
    services: string;
    allowedATAPackages: string[];
  }> {
    const { mappings, registry, services } = await type_build.build();

    return {
      allowedATAPackages: ALLOWED_ATA_PACKAGES,
      mappings: mappings.replace(`module "@digital-alchemy/hass"`, `module "../user.mts"`),
      registry: registry
        .replace(`module "@digital-alchemy/hass"`, `module "../user.mts"`)
        .replace(`from "@digital-alchemy/hass"`, `from "../merge.mts"`),
      services: services
        .replace(`import "@digital-alchemy/hass";`, ``)
        .replace(`module "@digital-alchemy/hass"`, `module "../user.mts"`)
        .replace(`from "@digital-alchemy/hass"`, `from "../helpers.index.mts"`),
    };
  }

  return { build };
}
