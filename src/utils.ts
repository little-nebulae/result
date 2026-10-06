import type { AsyncResult, Failure, Result, Success } from "@/types";

export function succeed<TData>(data: TData): Success<TData> {
  return { success: true, data };
}

export function fail<TError extends Error>(error: TError): Failure<TError> {
  return { success: false, error };
}

export function unwrap<TData, TError extends Error>(
  result: Result<TData, TError>,
): TData {
  if (result.success) {
    return result.data;
  }
  throw result.error;
}

export async function unwrapAsync<TData, TError extends Error>(
  asyncResult: AsyncResult<TData, TError>,
): Promise<TData> {
  const result = await asyncResult;
  return unwrap(result);
}
