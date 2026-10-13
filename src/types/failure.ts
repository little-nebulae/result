export interface Failure<TError extends Error> {
  success: false;
  error: TError;
}
