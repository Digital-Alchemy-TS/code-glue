import { TServiceParams } from "@digital-alchemy/core";

export type CacheDriverOptions = Pick<
  TServiceParams,
  "logger" | "config" | "lifecycle"
>;

export interface ICacheDriver<T> {
  get<T>(key: string, defaultValue?: T): Promise<T | undefined>;
  set<T>(key: string, value: T, ttl: number): Promise<void>;
  del(key: string): Promise<void>;
  getClient(): T;
  keys(pattern?: string): Promise<string[]>;
}

export type TCache = {
  state: () => "healthy" | "unhealthy";
  count: (type: string) => Promise<number>;
  getClient: <T = ICacheDriver<unknown>>() => T;
  del: (key: string) => Promise<void>;
  get: <T>(key: string, defaultValue?: T) => Promise<T>;
  set: <T>(key: string, value: T, ttl?: number) => Promise<void>;
  keys: (pattern?: string) => Promise<string[]>;
};

export enum CacheProviders {
  redis = "redis",
  memory = "memory",
}

export enum CachePrefixes {
  login_attempt = "login_attempt",
  last_user_session = "last_user_session",
  session = "session",
  reverse_session = "reverse_session",
  api_result = "api_result",
}
