import { is, TServiceParams } from "@digital-alchemy/core";

import { StoredAutomation } from "../../utils/index.mts";

export function AutomationsService({ terminal, cli }: TServiceParams) {
  async function main() {
    terminal.application.setHeader("Synapse");

    const current = await cli.api.automation.list();

    const action = await terminal.menu<string | StoredAutomation>({
      keyMap: {
        c: {
          entry: ["Create Automation", "create"],
          highlight: "auto",
        },
        esc: ["done"],
      },
      left: current.map(item => ({
        entry: [item.title, item],
        helpText: item.documentation,
        type: item.active ? "Active" : "Inactive",
      })),
      leftHeader: "Current Automations",
      right: [
        {
          entry: ["Create Automation", "create"],
        },
      ],
      rightHeader: "Actions",
    });

    switch (action) {
      case "done": {
        return;
      }
      case "create": {
        // await createEntity();
        await main();
        return;
      }
    }

    if (is.string(action)) {
      return;
    }
    // await editEntity(action);
    await main();
    //
  }

  return { main };
}
