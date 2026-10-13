import type { Result } from "@/types/result";

export type AsyncResult<TData, TError extends Error> = Promise<
  Result<TData, TError>
>;
