/// <reference types="jest" />

export const add = (a: number, b: number): number => a + b;
describe("add", () => {
  it("should add two numbers", () => {
    expect(add(1, 1)).toEqual(2);
  });
});