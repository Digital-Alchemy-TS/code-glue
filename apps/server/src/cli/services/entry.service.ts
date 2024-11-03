import { TServiceParams } from "@digital-alchemy/core";

export function CLIEntry({ cli, terminal, lifecycle }: TServiceParams) {
  async function main() {
    terminal.application.setHeader("Code Glue", "Main Menu");

    const action = await terminal.menu<string>({
      keyMap: {
        esc: ["done"],
        s: {
          entry: ["synapse", "Synapse Entities"],
          highlight: "auto",
        },
      },
      right: [
        {
          entry: ["synapse", "Synapse Entities"],
        },
      ],
      rightHeader: "Actions",
    });

    switch (action) {
      case "done": {
        return;
      }

      case "synapse": {
        await cli.synapse.main();
        await main();
        return;
      }
    }
  }
  lifecycle.onReady(main);
}
