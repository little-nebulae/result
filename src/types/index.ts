export interface Success<TData> {
  success: true;
  data: TData;
}

export interface Failure<TError extends Error> {
  success: false;
  error: TError;
}

export type Result<TData, TError extends Error> =
  | Success<TData>
  | Failure<TError>;

export type AsyncResult<TData, TError extends Error> = Promise<
  Result<TData, TError>
>;
