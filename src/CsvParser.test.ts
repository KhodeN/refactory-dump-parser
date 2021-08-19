import { CsvParser } from "./CsvParser";

describe("CsvParser", () => {
  describe("parseRow", () => {
    it("simple parse", () => {
      expect(CsvParser.parseRow("1,2,3")).toEqual(["1", "2", "3"]);
      expect(CsvParser.parseRow("a,b,name")).toEqual(["a", "b", "name"]);
      expect(CsvParser.parseRow(",,")).toEqual(["", "", ""]);
      expect(CsvParser.parseRow(",x,")).toEqual(["", "x", ""]);
    });

    it("should trim spaces around separators (commas)", () => {
      expect(CsvParser.parseRow("1, 2, 3")).toEqual(["1", "2", "3"]);
      expect(CsvParser.parseRow("1 ,          2 ,3")).toEqual(["1", "2", "3"]);
    });

    it("with quotes", () => {
      expect(CsvParser.parseRow('"Hello, world",2,3')).toEqual([
        "Hello, world",
        "2",
        "3",
      ]);
    });
  });
});
