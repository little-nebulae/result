import type { FlatError } from "@little-nebulae/error";
import type { JsonValue } from "type-fest";

import type { JsonFailure, JsonSuccess } from "@/types/json";

export function createJsonSuccess<TData extends JsonValue>(
  data: TData,
): JsonSuccess<TData> {
  return { success: true, data };
}

export function createJsonFailure<TError extends FlatError>(
  error: TError,
): JsonFailure<TError> {
  return { success: false, error };
}
