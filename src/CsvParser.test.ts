import { CsvParser } from "./CsvParser";

describe("CsvParser", () => {
  describe("parseRow", () => {
    it("should split row by commas", () => {
      expect(CsvParser.parseRow("1,2,3")).toEqual(["1", "2", "3"]);
      expect(CsvParser.parseRow("a,b,name")).toEqual(["a", "b", "name"]);
      expect(CsvParser.parseRow(",,")).toEqual(["", "", ""]);
      expect(CsvParser.parseRow(",x,")).toEqual(["", "x", ""]);
    });

    it("should trim spaces around separators (commas)", () => {
      expect(CsvParser.parseRow("1, 2, 3")).toEqual(["1", "2", "3"]);
      expect(CsvParser.parseRow("1 ,          2 ,3")).toEqual(["1", "2", "3"]);
    });

    it("should handle quoted values", () => {
      expect(CsvParser.parseRow('"Hello, world",2,3')).toEqual([
        "Hello, world",
        "2",
        "3",
      ]);
    });
  });

  describe("parseSection", () => {
    interface Record {
      Sid: string;
      Note: string;
      Sort: string;
      Research: string;
      Ingredients: string;
      MaxHp: string;
      MaxBeltLength: string;
    }

    interface Resource {
      sid: string;
      note: string;
      heat_energy: string;
      min_required: string;
      sort: string;
      recipe1_group: string;
      recipe1_count: string;
      recipe1_duration: string;
      recipe1_sources: string;
      recipe1_research: string;
      recipe2_group: string;
      recipe2_count: string;
      recipe2_duration: string;
      recipe2_sources: string;
      recipe2_research: string;
    }

    // language=csv
    const section = `Sid,Note,Sort,Research,Ingredients,MaxHp,MaxBeltLength,,,,,,,,
belt.belt1,Belt.png|Конвейер|Сonveyor,3.01,,IronDetails*1,1,,,,,,,,,
belt.belt05,Belt.png|Вход или выход продукции|Product inlet or outlet,0,,,0,,,,,,,,,
belt.puzzle1,Belt.png|Конвейер|Сonveyor,0,,IronDetails*1,1,,,,,,,,,
belt.puzzle05,Belt.png|Вход или выход продукции|Product inlet or outlet,0,,,0,,,,,,,,,
belt.underground1,Belt_Underground.png|Подземный конвейер|Underground conveyor,3.21,belt.intersection,IronDetails*12;StoneBrick*10,80,6,,,,,,,,
belt.splitter.1,Splitter.png|Разделитель|Splitter,3.11,belt.intersection,IronDetails*6,30,,,,,,,,,`;
    const section2 = `sid,,note,heat_energy,min_required,sort,,recipe1_group,recipe1_count,recipe1_duration,recipe1_sources,recipe1_research,,recipe2_group,recipe2_count,recipe2_duration,recipe2_sources,recipe2_research
,,"При переименовании id ресурса, поправить на новое название Lang и все вкладки конфига. И в сохранениях встанут все здания, что его производили.",,,,,,,,,,,,,,,
IronOre,,IronOre.png|Железная руда|Iron ore,,,1.01,,MiningUnderground,1,3,Mining*0,,,,,,,
IronPlate,,IronPlate.png|Железные пластины|Iron plates,,250,2.01,,Smelter,1,2.5,IronOre*2,,,Smelter,4,5,IronDust*4,improved.smelting
IronDetails,,IronDetails.png|Железные детали|Iron parts,,250,3.01,,Constructor,3,5.5,IronPlate*2,,,,,,,
CopperOre,,CopperOre.png|Медная руда|Copper ore,,,1.02,,MiningUnderground,1,3,Mining*0,,,,,,,`;

    it("should parse lines", () => {
      const result = CsvParser.parseSection<Record>(section);
      expect(result.length).toBe(6);
      console.table(result);
    });

    it("should skip empty rows", () => {
      const result = CsvParser.parseSection<Record>(`,xxxx
Sid,Note
,,,,,
variable,note`);
      expect(result).toEqual([{ Sid: "variable", Note: "note" }]);
    });

    it("should parse lines 2", () => {
      const result = CsvParser.parseSection<Resource>(section2);
      expect(result.length).toBe(4);
      console.table(result);
    });
  });
});
