import type { BaseError } from "@little-nebulae/error";

import type { Failure, Success } from "@/types";

export function createSuccess<TData>(data: TData): Success<TData> {
  return { success: true, data };
}

export function createFailure<TError extends BaseError<string>>(
  error: TError,
): Failure<TError> {
  return { success: false, error };
}
