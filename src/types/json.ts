import type { FlatError } from "@little-nebulae/error";
import type { JsonValue } from "type-fest";

export interface JsonSuccess<TData extends JsonValue> {
  success: true;
  data: TData;
}

export interface JsonFailure<TError extends FlatError> {
  success: false;
  error: TError;
}

export type JsonResult<TData extends JsonValue, TError extends FlatError> =
  | JsonSuccess<TData>
  | JsonFailure<TError>;

export type AsyncJsonResult<
  TData extends JsonValue,
  TError extends FlatError,
> = Promise<JsonResult<TData, TError>>;
