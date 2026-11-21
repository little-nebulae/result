import type { BaseError } from "@little-nebulae/error";

import type { AsyncResult, Result } from "@/types";

export function unwrap<TData, TError extends BaseError<string>>(
  result: Result<TData, TError>,
): TData {
  if (result.success) {
    return result.data;
  }
  throw result.error;
}

export async function unwrapAsync<TData, TError extends BaseError<string>>(
  asyncResult: AsyncResult<TData, TError>,
): Promise<TData> {
  const result = await asyncResult;
  return unwrap(result);
}
