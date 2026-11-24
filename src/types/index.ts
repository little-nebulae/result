import type { BaseError, BaseErrorMeta } from "@little-nebulae/error";

export interface Success<TData> {
  success: true;
  data: TData;
}

export interface Failure<
  TError extends BaseError<string, unknown, BaseErrorMeta>,
> {
  success: false;
  error: TError;
}

export type Result<
  TData,
  TError extends BaseError<string, unknown, BaseErrorMeta>,
> = Success<TData> | Failure<TError>;

export type AsyncResult<
  TData,
  TError extends BaseError<string, unknown, BaseErrorMeta>,
> = Promise<Result<TData, TError>>;
