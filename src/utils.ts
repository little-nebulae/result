import type { Failure, Result, Success } from "@/types";

export function succeed<TData>(data: TData): Success<TData> {
  return { success: true, data };
}

export function fail<TError extends Error>(error: TError): Failure<TError> {
  return { success: false, error };
}

export function unwrap<TData>(result: Result<TData, Error>): TData {
  if (result.success) {
    return result.data;
  }
  throw result.error;
}
