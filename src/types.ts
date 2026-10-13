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

type InferData<TResult> = TResult extends { success: true; data: infer TData }
  ? TData
  : never;
type InferError<TResult> = TResult extends {
  success: false;
  error: infer TError;
}
  ? TError
  : never;

export type DataOf<TResult> = InferData<Awaited<TResult>>;
export type ErrorOf<TResult> = InferError<Awaited<TResult>>;

export type DataOfFn<TFn extends (...args: any[]) => any> = DataOf<
  ReturnType<TFn>
>;
export type ErrorOfFn<TFn extends (...args: any[]) => any> = ErrorOf<
  ReturnType<TFn>
>;
