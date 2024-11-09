/* eslint-disable sonarjs/code-eval */
import { DOWN, is, TServiceParams, UP } from "@digital-alchemy/core";

import { StoredAutomation } from "../../utils";

export function ExecuteService({ coordinator }: TServiceParams) {
  return function (automation: StoredAutomation) {
    const params = coordinator.context.build(automation.context);
    const sortedKeys = is.keys(params).toSorted((a, b) => (a > b ? UP : DOWN));
    const service = new Function(...sortedKeys, automation.body);
    service(...sortedKeys.map(i => params[i]));
  };
}
