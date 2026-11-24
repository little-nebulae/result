import type { BaseError, BaseErrorMeta } from "@little-nebulae/error";

import type { AsyncResult, Result } from "@/types";

export function unwrapResult<
  TData,
  TError extends BaseError<string, unknown, BaseErrorMeta>,
>(result: Result<TData, TError>): TData {
  if (result.success) {
    return result.data;
  }
  throw result.error;
}

export async function unwrapAsyncResult<
  TData,
  TError extends BaseError<string, unknown, BaseErrorMeta>,
>(asyncResult: AsyncResult<TData, TError>): Promise<TData> {
  const result = await asyncResult;
  return unwrapResult(result);
}
