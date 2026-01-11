import {
  deepExtend,
  is,
  TContext,
  TServiceParams,
} from "@digital-alchemy/core";

export function MetricsMeasure({ metrics }: TServiceParams) {
  return async function <T>(
    [context, method]: [context: TContext, method: string | { name: string }],
    callback: () => T,
    stats?: () => object,
  ): Promise<T> {
    const track = metrics.perf();
    const [module, service] = context.split(":");
    const logData: Record<string, string | number> = {
      method: is.object(method) ? method.name : method,
      module,
      service,
      status: "success",
    };
    try {
      return await callback();
    } catch (error) {
      logData.status = "error";
      if (error && typeof error === "object" && "status" in error) {
        logData.code = (error as { status: string | number }).status;
      }
      throw error;
    } finally {
      const ms = track();
      logData.ms = ms;
      if (stats) {
        deepExtend(logData, stats());
      }
      metrics.emit("performance", logData);
    }
  };
}
