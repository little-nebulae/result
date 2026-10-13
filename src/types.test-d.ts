import { describe, expectTypeOf, test } from "vitest";

import type { AsyncResult, DataOf, ErrorOf, Result } from "@/types";

describe("DataOf should infer the type of", () => {
  test("Result's TData", () => {
    type TestData = {
      id: number;
      content: string;
      createdAt: Date;
      updatedAt: Date;
    };
    type TestResult = Result<TestData, Error>;
    type InferredData = DataOf<TestResult>;
    expectTypeOf<InferredData>().toEqualTypeOf<TestData>();
  });

  test("AsyncResult's TData", () => {
    type TestData = {
      id: number;
      content: string;
      createdAt: Date;
      updatedAt: Date;
    };
    type TestResult = AsyncResult<TestData, Error>;
    type InferredData = DataOf<TestResult>;
    expectTypeOf<InferredData>().toEqualTypeOf<TestData>();
  });
});

describe("ErrorOf should infer the type of", () => {
  test("Result's TError", () => {
    type TestError = TypeError;
    type TestResult = Result<undefined, TestError>;
    type InferredError = ErrorOf<TestResult>;
    expectTypeOf<InferredError>().toEqualTypeOf<TestError>();
  });

  test("AsyncResult's TError", () => {
    type TestError = SyntaxError;
    type TestResult = AsyncResult<undefined, TestError>;
    type InferredError = ErrorOf<TestResult>;
    expectTypeOf<InferredError>().toEqualTypeOf<TestError>();
  });

  test("Result's TError, even when TError is a generic", () => {
    interface TestError<TCode extends string> extends Error {
      code: TCode;
    }
    type TestErrorCode = "TEST_ERROR";
    type TestResult = Result<undefined, TestError<TestErrorCode>>;
    type InferredError = ErrorOf<TestResult>;

    expectTypeOf<InferredError>().toEqualTypeOf<TestError<TestErrorCode>>();
    expectTypeOf<InferredError>().not.toEqualTypeOf<
      TestError<`NOT_${TestErrorCode}`>
    >();
    expectTypeOf<InferredError>().not.toEqualTypeOf<TestError<string>>();
  });

  test("Result's TError union, even when each union member is a generic", () => {
    interface TestTypeError<TCode extends string> extends TypeError {
      code: TCode;
    }
    interface TestSyntaxError<TCode extends string> extends SyntaxError {
      code: TCode;
    }
    type TestTypeErrorCode = "TEST_TYPE_ERROR";
    type TestSyntaxErrorCode = "TEST_SYNTAX_ERROR";
    type TestError =
      | TestTypeError<TestTypeErrorCode>
      | TestSyntaxError<TestSyntaxErrorCode>;
    type TestResult = Result<undefined, TestError>;
    type InferredError = ErrorOf<TestResult>;

    expectTypeOf<InferredError>().toEqualTypeOf<TestError>();
    expectTypeOf<InferredError>().not.toEqualTypeOf<
      TestTypeError<TestTypeErrorCode>
    >();
    expectTypeOf<InferredError>().not.toEqualTypeOf<
      TestSyntaxError<TestSyntaxErrorCode>
    >();
    expectTypeOf<TestTypeError<TestTypeErrorCode>>().toExtend<InferredError>();
    expectTypeOf<
      TestSyntaxError<TestSyntaxErrorCode>
    >().toExtend<InferredError>();
  });
});
