import type { FlatError } from "@little-nebulae/error";
import type { JsonValue } from "type-fest";

import type { AsyncJsonResult, JsonResult } from "@/types/json";

export function unwrapJsonResult<
  TData extends JsonValue,
  TError extends FlatError<string, JsonValue>,
>(result: JsonResult<TData, TError>): TData {
  if (result.success) {
    return result.data;
  }
  throw result.error;
}

export async function unwrapAsyncJsonResult<
  TData extends JsonValue,
  TError extends FlatError<string, JsonValue>,
>(asyncResult: AsyncJsonResult<TData, TError>): Promise<TData> {
  const result = await asyncResult;
  return unwrapJsonResult(result);
}
