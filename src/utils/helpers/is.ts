import { is } from "@digital-alchemy/core";

is.keys = <O extends object>(o: O) => Object.keys(o) as (keyof O)[];

declare module "@digital-alchemy/core" {
  export interface IsIt {
    /**
     * This SHOULD BE the way Object.keys works... but it doesn't because reasons 🖕
     */
    keys<O extends object>(input: O): (keyof O)[];
  }
}
