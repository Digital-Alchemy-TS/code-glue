import { TServiceParams } from "@digital-alchemy/core";

export function TypeWriterService({ logger, type_build }: TServiceParams) {
  async function build(): Promise<
    Record<"mappings" | "registry" | "services", string>
  > {
    const { mappings, registry, services } = await type_build.build();

    return {
      mappings: mappings.replace(
        `module "@digital-alchemy/hass"`,
        `module "../user.mts"`,
      ),
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
