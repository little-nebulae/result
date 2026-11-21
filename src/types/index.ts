import type { BaseError } from "@little-nebulae/error";

export interface Success<TData> {
  success: true;
  data: TData;
}

export interface Failure<TError extends BaseError<string>> {
  success: false;
  error: TError;
}

export type Result<TData, TError extends BaseError<string>> =
  | Success<TData>
  | Failure<TError>;

export type AsyncResult<TData, TError extends BaseError<string>> = Promise<
  Result<TData, TError>
>;
