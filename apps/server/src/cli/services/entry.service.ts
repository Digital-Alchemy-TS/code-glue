import { TServiceParams } from "@digital-alchemy/core";

export function CLIEntry({ cli, terminal, lifecycle }: TServiceParams) {
  async function main() {
    terminal.application.setHeader("Code Glue", "Main Menu");

    const action = await terminal.menu<string>({
      condensed: true,
      keyMap: {
        a: {
          entry: ["Automations", "automations"],
          highlight: "auto",
        },
        esc: ["done"],
        s: {
          entry: ["Synapse Entities", "synapse"],
          highlight: "auto",
        },
        v: {
          entry: ["Shared Variables", "variables"],
          highlight: "auto",
        },
      },
      right: [
        {
          entry: ["Synapse Entities", "synapse"],
          helpText: "Manage the synapse entities created by Code-Glue",
        },
        {
          entry: ["Shared Variables", "variables"],
        },
        {
          entry: ["Automations", "automations"],
        },
      ],
      rightHeader: "Actions",
      search: false,
    });

    switch (action) {
      case "done": {
        process.exit();
        return;
      }

      case "synapse": {
        await cli.synapse.main();
        await main();
        return;
      }
    }

    await terminal.acknowledge(`Unknown action ${action}`);
  }
  lifecycle.onReady(main);
}
