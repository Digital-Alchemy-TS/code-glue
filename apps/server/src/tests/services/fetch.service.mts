import { TServiceParams } from "@digital-alchemy/core";

/**
 * Simple service for issuing calls against the internal Fastify http server
 */
export function TestingFetch({}: TServiceParams) {
  return {
    /**
     * issue the call and return a json response
     */
    async json<T>(): Promise<T> {
      // path: Omit<InjectOptions, "url"> = {}, // url: string,
      // const response = await http.bindings.httpServer.inject({ url, ...path });
      // return (await response.json()) as T;
      return undefined;
    },
    /**
     * issue the call and return the raw response object
     */
    // async response(url: string, path: Omit<InjectOptions, "url"> = {}) {
    //   return await http.bindings.httpServer.inject({ url, ...path });
    // },
  };
}
