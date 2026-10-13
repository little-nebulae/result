import { describe, expectTypeOf, test } from "vitest";

import type { DataOf, Result } from "@/types";

describe("DataOf should infer the type of", () => {
  test("Result's TData generic param", () => {
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
});
