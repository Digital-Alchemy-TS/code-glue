import { is, TServiceParams } from "@digital-alchemy/core";
import chalk from "chalk";

import {
  SynapseEntities,
  SynapseEntityCreateOptions,
  SynapseEntityTypes,
} from "../../utils";
import { DOMAIN_ELEMENTS } from "../helpers";

const cancel = Symbol.for("cancel");
type cancel = typeof cancel;
type PartialCreate = Pick<
  SynapseEntityCreateOptions,
  "type" | "name" | "suggested_object_id" | "labels"
>;

export function CLISynapseService({ terminal, cli, hass }: TServiceParams) {
  // #MARK: main
  async function main() {
    terminal.application.setHeader("Synapse");

    const current = await cli.api.synapse.list();

    const action = await terminal.menu<string | SynapseEntities>({
      keyMap: {
        c: {
          entry: ["Create Entity", "create"],
          highlight: "auto",
        },
        esc: ["done"],
      },
      left: current.map(item => ({
        entry: [item.name, item],
        helpText: item.documentation,
        type: item.type,
      })),
      leftHeader: "Current Entities",
      right: [
        {
          entry: ["Create Entity", "create"],
        },
      ],
      rightHeader: "Actions",
    });

    switch (action) {
      case "done": {
        return;
      }
      case "create": {
        await createEntity();
        await main();
        return;
      }
    }

    if (is.string(action)) {
      return;
    }
    await editEntity(action);
    await main();
  }

  // #MARK: editEntity
  async function editEntity(entity: SynapseEntities) {
    terminal.application.setHeader("Synapse", entity.name);

    const action = await terminal.menu({
      condensed: true,
      headerMessage: `${chalk.bold("Type")}: ${chalk.yellow(entity.type)}`,
      keyMap: {
        a: {
          entry: ["Attributes", "attributes"],
          highlight: "auto",
        },
        c: {
          entry: ["Entity Configuration", "config"],
          highlight: "auto",
        },
        escape: ["done"],
        i: {
          entry: ["Default Icon", "icon"],
          highlight: "auto",
        },
        l: {
          entry: ["Locals", "locals"],
          highlight: "auto",
        },
        r: {
          entry: ["Rebuild", "rebuild"],
          highlight: "auto",
        },
      },
      left: [
        {
          entry: ["Rebuild", "rebuild"],
          helpText: "Recreate the entity",
        },
        {
          entry: ["Delete", "delete"],
          helpText: `Remove the entity ${chalk.bold.red("(destructive!)")}`,
        },
        {
          entry: ["Notes", "docs"],
          helpText: ["Notes to self", entity.documentation],
        },
        {
          entry: ["Default Icon", "icon"],
          helpText: ["Default icon for Home Assistant dashboard", entity.icon],
        },
      ],
      right: [
        {
          entry: ["Entity Configuration", "config"],
          helpText: [
            "Additional configuration for this specific entity domain",
            terminal.text.type(JSON.parse(entity.defaultConfig)),
          ],
        },
        {
          entry: ["Locals", "locals"],
          helpText: [
            "Additional data to store against the entity, not reported to Home Assistant",
            terminal.text.type({
              defaults: JSON.parse(entity.defaultLocals),
              types: entity.locals,
            }),
          ],
        },
        {
          entry: ["Attributes", "attributes"],
          helpText: [
            "Reported to Home Assistant as entity.attributes",
            terminal.text.type({
              defaults: JSON.parse(entity.defaultAttributes),
              types: entity.attributes,
            }),
          ],
        },
      ],
      search: false,
      showHeaders: false,
    });

    switch (action) {
      // * done
      case "done": {
        return;
      }

      // * rebuild
      case "rebuild": {
        await editEntity(entity);
        return;
      }

      // * delete
      case "delete": {
        const confirm = await terminal.confirm({
          current: false,
          label: "Are you sure you want to delete",
        });
        if (!confirm) {
          return;
        }
        await cli.api.synapse.delete(entity.id);
        return;
      }

      // * docs
      case "docs": {
        const documentation = await terminal.string({
          current: entity.icon,
          label: "Documentation",
        });
        if (documentation !== entity.documentation) {
          entity = await cli.api.synapse.update(entity.id, { documentation });
        }
        await editEntity(entity);
        return;
      }

      // * icon
      case "icon": {
        const icon = await terminal.string({
          current: entity.icon,
          label: "Icon",
        });
        if (icon !== entity.documentation) {
          entity = await cli.api.synapse.update(entity.id, { icon });
        }
        await editEntity(entity);
        return;
      }

      // * config
      case "config": {
        entity = await editConfig(entity);
        await editEntity(entity);
        return;
      }

      // * locals
      case "locals": {
        entity = await editLocals(entity);
        await editEntity(entity);
        return;
      }

      // * attributes
      case "attributes": {
        entity = await editAttributes(entity);
        await editEntity(entity);
        return;
      }
    }
  }

  // #MARK: editConfig
  async function editConfig(entity: SynapseEntities): Promise<SynapseEntities> {
    terminal.application.setHeader("Edit Config", entity.name);

    const action = await terminal.object<Record<string, unknown>, cancel>({
      cancel,
      elements: DOMAIN_ELEMENTS.get(entity.type),
      helpNotes: [
        "Values vary by entity type",
        "Used to set up the default state of the entity, values able to be updated at runtime",
      ].join("\n"),
    });

    if (action === cancel) {
      return entity;
    }

    return await cli.api.synapse.update(entity.id, {
      defaultConfig: JSON.stringify(action),
    });
  }

  // #MARK: editAttributes
  async function editAttributes(
    entity: SynapseEntities,
  ): Promise<SynapseEntities> {
    terminal.application.setHeader("Edit Attributes", entity.name);

    const action = await terminal.menu({
      condensed: true,
      keyMap: {
        escape: ["done"],
      },
      right: [
        {
          entry: ["types"],
        },
        {
          entry: ["defaults"],
        },
      ],
      search: false,
    });

    switch (action) {
      case "done": {
        return entity;
      }

      case "types": {
        const types = await terminal.string({
          // current: entity.
        });
        return entity;
      }
    }
    return undefined;
  }

  // #MARK: editLocals
  async function editLocals(entity: SynapseEntities): Promise<SynapseEntities> {
    return entity;
  }

  // #MARK: createEntity
  async function createEntity() {
    terminal.application.setHeader("Synapse", "Create Entity");
    const options = await terminal.object<PartialCreate, cancel>({
      cancel,
      elements: [
        // * type
        {
          name: "Entity Type",
          options: Object.values(SynapseEntityTypes).map(type => ({
            entry: [type],
          })),
          path: "type",
          type: "pick-one",
        },
        // * name
        {
          helpText: "Friendly name",
          path: "name",
          type: "string",
        },
        // * suggested_object_id
        {
          helpText:
            "(optional) Used to influence entity id creation, name used otherwise",
          path: "suggested_object_id",
          type: "string",
        },
        // * labels
        {
          default: [],
          helpText: "Optional",
          items: "Labels",
          options: hass.label.current.map(label => ({
            entry: [label.name, label.label_id],
            helpText: label.description,
          })),
          path: "labels",
          type: "pick-many",
        },
      ],
      validate(options) {
        if (is.empty(options.current.name)) {
          options.sendMessage({
            immediateClear: true,
            message: chalk.bold.red("🛑 name is required\n"),
          });
          return false;
        }
        return true;
      },
    });
    if (options === cancel) {
      return;
    }
    const result = await cli.api.synapse.create({
      ...options,
      attributes: "never",
      defaultAttributes: "{}",
      defaultConfig: "{}",
      defaultLocals: "{}",
      documentation: "",
      icon: "",
      locals: "never",
      suggested_object_id: "",
    });
    terminal.screen.printLine(terminal.text.type(result));
    await terminal.prompt.acknowledge({ label: "Successfully created entity" });
  }

  return { main };
}
