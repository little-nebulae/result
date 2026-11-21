import type { BaseError } from "@little-nebulae/error";

import type { AsyncResult, Result } from "@/types";

import { createFailure, createSuccess } from "@/utils/create";

export function produceResult<TData, TError extends BaseError<string>>({
  tryFn,
  catchFn,
  finallyFn,
}: {
  tryFn: () => TData;
  catchFn: (error: unknown) => TError;
  finallyFn?: () => void;
}): Result<TData, TError> {
  try {
    return createSuccess(tryFn());
  } catch (error) {
    return createFailure(catchFn(error));
  } finally {
    finallyFn?.();
  }
}

export async function produceAsyncResult<
  TData,
  TError extends BaseError<string>,
>({
  tryFn,
  catchFn,
  finallyFn,
}: {
  tryFn: () => Promise<TData>;
  catchFn: (error: unknown) => TError;
  finallyFn?: () => void | Promise<void>;
}): AsyncResult<TData, TError> {
  try {
    return createSuccess(await tryFn());
  } catch (error) {
    return createFailure(catchFn(error));
  } finally {
    await finallyFn?.();
  }
}
