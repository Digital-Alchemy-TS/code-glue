import { is, TServiceParams } from "@digital-alchemy/core";

import { SynapseEntities } from "../../utils";

export function CLISynapseService({ terminal, cli }: TServiceParams) {
  async function main() {
    terminal.application.setHeader("Synapse");

    const current = await cli.api.synapse.list();
    const action = await terminal.menu<string | SynapseEntities>({
      keyMap: {
        esc: ["done"],
      },
      left: current.map(item => ({
        entry: [item.name, item],
        type: item.type,
      })),
      leftHeader: "Current Entities",
      right: [
        {
          entry: ["create", "Create Entity"],
        },
      ],
      rightHeader: "Actions",
    });

    switch (action) {
      case "done": {
        return;
      }
    }

    if (is.string(action)) {
      return;
    }
    await terminal.acknowledge();
  }

  return { main };
}
