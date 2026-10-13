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

type ExtractData<R> = R extends { success: true; data: infer D } ? D : never;
type ExtractError<R> = R extends { success: false; error: infer E } ? E : never;

export type DataOf<R> = ExtractData<Awaited<R>>;
export type ErrorOf<R> = ExtractError<Awaited<R>>;

export type DataOfFn<F extends (...args: any[]) => any> = DataOf<ReturnType<F>>;
export type ErrorOfFn<F extends (...args: any[]) => any> = ErrorOf<
  ReturnType<F>
>;
