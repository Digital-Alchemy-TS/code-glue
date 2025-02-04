import { NONE, TServiceParams } from "@digital-alchemy/core";

export function StatsService({}: TServiceParams) {
  function current() {
    return {
      automations: NONE,
    };
  }

  return { current };
}
