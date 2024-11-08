import { DATA_TYPES } from "@digital-alchemy/synapse";
import { MainMenuEntry, TableBuilderElement } from "@digital-alchemy/terminal";
import chalk from "chalk";

import { BINARY_SENSOR_DEVICE_CLASSES } from "../../utils";

export const DOMAIN_ELEMENTS = new Map<
  string,
  TableBuilderElement<Record<string, unknown>>[]
>([
  [
    "binary_sensor",
    [
      {
        options: [
          { entry: ["none", ""], helpText: "No device class" },
          ...[...BINARY_SENSOR_DEVICE_CLASSES.keys()].map(
            i =>
              ({
                entry: [i],
                helpText:
                  chalk.bold("Meaning:\n") +
                  BINARY_SENSOR_DEVICE_CLASSES.get(i)
                    .split(",")
                    .map(i => i.trim())
                    .join("\n")
                    .replace("On", chalk.green("On"))
                    .replace("Off", chalk.red("Off")),
              }) as MainMenuEntry<string>,
          ),
        ],
        path: "device_class",
        type: "pick-one",
      },
      {
        default: false,
        path: "is_on",
        type: "boolean",
      },
    ],
  ],
  [
    "button",
    [
      {
        options: ["identify", "restart", "update"].map(i => ({ entry: [i] })),
        path: "device_class",
        type: "pick-one",
      },
    ],
  ],
  [
    "date",
    [
      {
        helpText: `How should the ${chalk.blue("native_value")} field be presented?`,
        options: [
          {
            entry: ["iso"],
            helpText: "ISO Timestamp (hours/date removed as appropriate1)",
          },
          { entry: ["dayjs"], helpText: "DayJS library" },
          { entry: ["date"], helpText: "Javascript object" },
        ],
        path: "date_type",
        type: "pick-one",
      },
      {
        dateType: "date",
        fuzzy: "never",
        helpText: `Initial value`,
        path: "native_value",
        type: "date",
      },
    ],
  ],
  [
    "datetime",
    [
      {
        dateType: "datetime",
        fuzzy: "never",
        helpText: `Initial value`,
        path: "native_value",
        type: "date",
      },
    ],
  ],
  [
    "number",
    [
      {
        path: "native_max_value",
        type: "number",
      },
      {
        path: "native_min_value",
        type: "number",
      },
      {
        path: "step",
        type: "number",
      },
      {
        path: "native_value",
        type: "number",
      },
      {
        options: [
          { entry: ["auto"] },
          { entry: ["slider"] },
          { entry: ["box"] },
        ],
        path: "mode",
        type: "pick-one",
      },
    ],
  ],
  [
    "select",
    [
      {
        helpText: "One option per line",
        path: "options",
        type: "string",
      },
    ],
  ],
  [
    "sensor",
    [
      {
        options: [
          { entry: ["none"] },
          ...[...DATA_TYPES.keys()].map(
            key =>
              ({
                entry: [key],
                helpText: chalk.yellow(DATA_TYPES.get(key)),
              }) satisfies MainMenuEntry<string>,
          ),
        ],
        path: "device_class",
        type: "pick-one",
      },
      {
        helpText: "Default value",
        path: "state",
        type: "string",
      },
      {
        helpText: "Quantity of characters",
        path: "native_max",
        type: "number",
      },
    ],
  ],
  [
    "text",
    [
      {
        helpText: "Quantity of characters",
        path: "native_min",
        type: "number",
      },
      {
        helpText: "Default value",
        path: "native_value",
        type: "string",
      },
      {
        helpText: "A regex pattern that the text value must match to be valid.",
        path: "pattern",
        type: "string",
      },
      {
        // also native_value needed
        options: [{ entry: ["text"] }, { entry: ["password"] }],
        path: "device_class",
        type: "pick-one",
      },
    ],
  ],
]);
