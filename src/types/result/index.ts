import type { Failure } from "@/types/failure";
import type { Success } from "@/types/success";

export type Result<TData, TError extends Error> =
  | Success<TData>
  | Failure<TError>;
