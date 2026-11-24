import type { FlatError } from "@little-nebulae/error";
import type { JsonValue } from "type-fest";

import type { AsyncJsonResult, JsonResult } from "@/types/json";

import { createJsonFailure, createJsonSuccess } from "@/utils/create/json";

export function produceJsonResult<
  TData extends JsonValue,
  TError extends FlatError<string, JsonValue>,
>({
  tryFn,
  catchFn,
  finallyFn,
}: {
  tryFn: () => TData;
  catchFn: (error: unknown) => TError;
  finallyFn?: () => void;
}): JsonResult<TData, TError> {
  try {
    return createJsonSuccess(tryFn());
  } catch (error) {
    return createJsonFailure(catchFn(error));
  } finally {
    finallyFn?.();
  }
}

export async function produceAsyncJsonResult<
  TData extends JsonValue,
  TError extends FlatError<string, JsonValue>,
>({
  tryFn,
  catchFn,
  finallyFn,
}: {
  tryFn: () => Promise<TData>;
  catchFn: (error: unknown) => TError;
  finallyFn?: () => void | Promise<void>;
}): AsyncJsonResult<TData, TError> {
  try {
    return createJsonSuccess(await tryFn());
  } catch (error) {
    return createJsonFailure(catchFn(error));
  } finally {
    await finallyFn?.();
  }
}
