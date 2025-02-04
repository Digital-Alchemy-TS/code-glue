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

export function HeaderBlockService() {
  const boilerplateKeys = [
    "logger",
    "context",
    "event",
    "lifecycle",
    "scheduler",
    "config",
  ];
  const extraLibraries = ["hass", "synapse", "automation"];

  function generate() {
    return [
      `import { TServiceParams } from "@digital-alchemy/core";`,
      ...extraLibraries.map(
        i => `import { LIB_${i.toUpperCase()} } from "@digital-alchemy/${i}";`,
      ),
      ...dayjsContent,
      ``,
      `const { ${[...boilerplateKeys, ...extraLibraries].join(", ")} } =`,
      `  undefined as TServiceParams;`,
      ``,
    ].join(`\n`);
  }
  return { generate };
}
