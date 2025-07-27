import { merge } from "../src/merge";

describe("merge()", () => {
  it("merges ascending + ascending + descending", () => {
    const c1 = [1, 3, 5];
    const c2 = [2, 4, 6];
    const c3 = [9, 8, 7]; 

    const result = merge(c1, c2, c3);
    expect(result).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9]);
  });

  it("handles empty arrays", () => {
    expect(merge([], [], [])).toEqual([]);
    expect(merge([1], [], [])).toEqual([1]);
    expect(merge([], [], [3, 2, 1])).toEqual([1, 2, 3]);
  });

  it("handles negative numbers", () => {
    expect(merge([-10, -5], [0], [2, 1])).toEqual([-10, -5, 0, 1, 2]);
  });
});