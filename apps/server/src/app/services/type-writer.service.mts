import { TServiceParams } from "@digital-alchemy/core";

export function TypeWriterService({ logger, type_build }: TServiceParams) {
  async function build(): Promise<string> {
    const { mappings, registry, services } = await type_build.build();
    return [mappings, registry, services].join("\n");
  }

  return { build };
}
