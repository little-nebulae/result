import { describe, expectTypeOf, test } from "vitest";

import type { AsyncResult, DataOf, DataOfFn, ErrorOf, Result } from "@/types";

describe("DataOf should infer the type of", () => {
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

  test("Result's TData, even when TData is a generic", () => {
    type TestData<TName extends string> = {
      id: number;
      name: TName;
      content: string;
      createdAt: Date;
      updatedAt: Date;
    };
    type TestName = "Jim Raynor";
    type TestResult = Result<TestData<TestName>, Error>;
    type InferredData = DataOf<TestResult>;

    expectTypeOf<InferredData>().toEqualTypeOf<TestData<TestName>>();
    expectTypeOf<InferredData>().not.toEqualTypeOf<
      TestData<`NOT_${TestName}`>
    >();
    expectTypeOf<InferredData>().not.toEqualTypeOf<TestData<string>>();
  });
});

describe("ErrorOf should infer the type of", () => {
  test("AsyncResult's TError", () => {
    type TestError = SyntaxError;
    type TestResult = AsyncResult<undefined, TestError>;
    type InferredError = ErrorOf<TestResult>;
    expectTypeOf<InferredError>().toEqualTypeOf<TestError>();
  });

  test("Result's TError", () => {
    type TestError = TypeError;
    type TestResult = Result<undefined, TestError>;
    type InferredError = ErrorOf<TestResult>;
    expectTypeOf<InferredError>().toEqualTypeOf<TestError>();
  });

  test("Result's TError, even when TError is a generic custom error", () => {
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

  test("Result's TError union, even when each union member is a generic custom error", () => {
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

describe("DataOfFn should infer the type of a function's", () => {
  test("Result's TData", () => {
    type TestData = {
      id: number;
      content: string;
      createdAt: Date;
      updatedAt: Date;
    };
    function doSomething(): Result<TestData, Error> {
      try {
        return {
          success: true,
          data: {
            id: 1,
            content: "Hello there!",
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        };
      } catch (error) {
        return {
          success: false,
          error: new Error("Kaboom, baby!", { cause: error }),
        };
      }
    }
    type InferredData = DataOfFn<typeof doSomething>;

    expectTypeOf<InferredData>().toEqualTypeOf<TestData>();
  });

  test("AsyncResult's TData", () => {
    type TestData = {
      id: number;
      content: string;
      createdAt: Date;
      updatedAt: Date;
    };
    async function doSomething(): AsyncResult<TestData, Error> {
      try {
        return {
          success: true,
          data: {
            id: 1,
            content: "Hello there!",
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        };
      } catch (error) {
        return {
          success: false,
          error: new Error("Kaboom, baby!", { cause: error }),
        };
      }
    }
    type InferredData = DataOfFn<typeof doSomething>;

    expectTypeOf<InferredData>().toEqualTypeOf<TestData>();
  });

  test("AsyncResult's TData, even when TData is a generic", () => {
    type TestData<TName extends string> = {
      id: number;
      name: TName;
      content: string;
      createdAt: Date;
      updatedAt: Date;
    };
    type TestName = "Jim Raynor";
    async function doSomething<T extends string>(
      name: T,
    ): AsyncResult<TestData<T>, Error> {
      try {
        return {
          success: true,
          data: {
            id: 1,
            name,
            content: "Hello there!",
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        };
      } catch (error) {
        return {
          success: false,
          error: new Error("Kaboom, baby!", { cause: error }),
        };
      }
    }
    type InferredData = DataOfFn<typeof doSomething<TestName>>;

    expectTypeOf<InferredData>().toEqualTypeOf<TestData<TestName>>();
    expectTypeOf<InferredData>().not.toEqualTypeOf<
      TestData<`NOT_${TestName}`>
    >();
    expectTypeOf<InferredData>().not.toEqualTypeOf<TestData<string>>();
  });
});
