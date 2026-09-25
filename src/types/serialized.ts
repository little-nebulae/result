import type {
  ErrorObjectMeta,
  NestedErrorObject,
} from "@little-nebulae/serialize-error";
import type { JSONType } from "zod";

import type { Failure, Success } from "@/types";

export type SerializedSuccess<TData extends JSONType> = Success<TData>;

export type SerializedFailure<
  TError extends NestedErrorObject<string, ErrorObjectMeta>,
> = Failure<TError>;

export type SerializedResult<
  TData extends JSONType,
  TError extends NestedErrorObject<string, ErrorObjectMeta>,
> = SerializedSuccess<TData> | SerializedFailure<TError>;
