/* eslint-disable sonarjs/code-eval */
import { DOWN, is, TServiceParams, UP } from "@digital-alchemy/core";
import { formatObjectId } from "@digital-alchemy/synapse";

import { StoredAutomation } from "../../utils";

export function ExecuteService({ coordinator }: TServiceParams) {
  const extraProperties = new Map<string, unknown>([["is", is]]);

  return function (automation: StoredAutomation) {
    // create a log context
    const context = is.empty(automation.context)
      ? formatObjectId(automation.title)
      : automation.context;

    // build up TServiceParams
    const params = coordinator.context.build(context);

    // create list of keys that will go into fn
    const sortedKeys = is.keys(params).toSorted((a, b) => (a > b ? UP : DOWN));
    const full = [...sortedKeys, ...extraProperties.keys()];

    // build service
    const service = new Function(...full, automation.body);

    // execute
    service(...sortedKeys.map(i => params[i]), ...extraProperties.values());
  };
}
