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

export function attempt<TData, TError extends Error>(
  tryFn: () => TData,
  catchFn: (error: unknown) => TError,
  finallyFn?: () => void,
): Result<TData, TError> {
  try {
    return succeed(tryFn());
  } catch (error) {
    return fail(catchFn(error));
  } finally {
    finallyFn?.();
  }
}

export async function attemptAsync<TData, TError extends Error>(
  tryFn: () => Promise<TData>,
  catchFn: (error: unknown) => TError,
  finallyFn?: () => void | Promise<void>,
): AsyncResult<TData, TError> {
  try {
    return succeed(await tryFn());
  } catch (error) {
    return fail(catchFn(error));
  } finally {
    await finallyFn?.();
  }
}
