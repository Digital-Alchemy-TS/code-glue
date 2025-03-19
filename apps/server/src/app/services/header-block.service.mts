const dayjsContent = [
  `import dayjs from "dayjs";`,
  `import advancedFormat from "dayjs/plugin/advancedFormat";`,
  `import isBetween from "dayjs/plugin/isBetween";`,
  `import timezone from "dayjs/plugin/timezone";`,
  `import utc from "dayjs/plugin/utc";`,
  `import weekOfYear from "dayjs/plugin/weekOfYear";`,
  `dayjs.extend(advancedFormat);`,
  `dayjs.extend(isBetween);`,
  `dayjs.extend(timezone);`,
  `dayjs.extend(utc);`,
  `dayjs.extend(weekOfYear);`,
];
const boilerplateKeys = [
  "logger",
  "context",
  "event",
  "lifecycle",
  "scheduler",
  "config",
];

const CORE_IMPORT = `import { TServiceParams, is, CronExpression } from "@digital-alchemy/core";`;

const importStatements = new Map([
  ["@digital-alchemy/hass", "{ LIB_HASS, PICK_ENTITY }"],
  ["@digital-alchemy/synapse", "{ LIB_SYNAPSE }"],
  ["@digital-alchemy/automation", "{ LIB_AUTOMATION }"],
]);
const serviceExtract = new Set(["hass", "automation", "synapse"]);

export function HeaderBlockService() {
  function debugBlock() {
    return [
      CORE_IMPORT,
      ...importStatements
        .entries()
        .map(([lib, statement]) => `import ${statement} from "${lib}";`),
      ``,
      ...dayjsContent,
      ``,
      `const { ${[...boilerplateKeys, ...serviceExtract.values()].join(", ")} } =`,
      `  undefined as TServiceParams;`,
      ``,
    ].join(`\n`);
  }

  function hiddenBlock() {
    return [
      CORE_IMPORT,
      ...importStatements
        .entries()
        .map(([lib, statement]) => `import ${statement} from "${lib}";`),
      ``,
      ...dayjsContent,
      ``,
      `declare global {`,
      ...[...boilerplateKeys, ...serviceExtract.values()].map(
        i => `  var ${i}: TServiceParams["${i}"];`,
      ),
      `}`,
      ``,
      `export {};`,
      ``,
    ].join(`\n`);
  }

  return { debugBlock, hiddenBlock };
}
