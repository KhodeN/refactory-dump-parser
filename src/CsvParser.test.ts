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
      Ingredients: string;
      MaxBeltLength: string;
      MaxHp: string;
      Note: string;
      Research: string;
      Sid: string;
      Sort: string;
    }

    interface Resource {
      heat_energy: string;
      min_required: string;
      note: string;
      recipe1_count: string;
      recipe1_duration: string;
      recipe1_group: string;
      recipe1_research: string;
      recipe1_sources: string;
      recipe2_count: string;
      recipe2_duration: string;
      recipe2_group: string;
      recipe2_research: string;
      recipe2_sources: string;
      sid: string;
      sort: string;
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

    const differentStructures = `Sid,Note,Sort,Research,Ingredients,MaxHp,ConnectRadius,,,,,,,,
electricity.pole.1,ElectricPillar.png|Электрический столб|Electric pole,3.04,,StoneBrick*5;CopperCable*6,10,5,,,,,,,,
electricity.pole.ship,ElectricPillar.png|Электрический столб|Electric pole,-4.004,,,0,15,,,,,,,,
Sid,Note,Sort,Research,Ingredients,MaxHp,ElectricityPower,SpeedScale,DurationSeconds,NeedHeatEnergy,NeedWater,,,,
electricity.heat.lvl1,FuelGenerator.png|Топливный генератор (ур. 1)|Fuel generator (lev. 1),3.51,electronic1,StoneBrick*30;IronPlate*40;CopperCable*50,200,30,1,6,5,0,,,,
electricity.heat.lvl2,FuelGenerator_2.png|Топливный генератор (ур. 2)|Fuel generator (lev. 2),3.51,electronic1,StoneBrick*50;SteelPlate*10;Electronic*20,200,40,1,6,3,0,,,,
electricity.heat.lvl3,FuelGenerator_3.png|Топливный генератор (ур. 3)|Fuel generator (lev. 3),3.51,microelectronics,SteelGirder*20;SteelDetails*40;Microcircuit*10,200,50,1,6,1,0,,,,
!electricity.heat.big.1,<no_icon>|Теплоэлектростанция|Thermal power plant,3.52,,Concrete*100;EnergyBattery*150;OpticalResonator*60,500,200,1,6,2,2,,,,
electricity.endless_power.spaceship,Spaceship_Energyblock.png|Корабельный генератор|Shipboard power unit,-4.003,,CopperCable*50;EnergyBattery*40,0,45,1,10,0,0,,,,
Sid,Note,Sort,Research,Ingredients,MaxHp,ElectricityPower,SpeedScale,MinDistanceBetweenWindmills,,,,,,
electricity.wind.1,Windmill.png|Ветрогенератор|Wind turbine,3.53,wind,CopperCable*100;SteelDetails*60;Electronic*50,200,40,1,25,,,,,,
Sid,Note,Sort,Research,Ingredients,MaxHp,ElectricityPower,SpeedScale,,,,,,,
!electricity.solarpanel.1,<no_icon>|Солнечная панель|Solar panel,3.54,solar,CopperPlate*28;SteelPlate*5;Glass*10,100,10,1,,,,,,,
Sid,Note,Sort,Research,Ingredients,MaxHp,ElectricityPower,MaxWorkTime,ElectricityConsumption,ExplosionRadius,Damage,UpgradeToTrapSid,,,
electricity.battery.1,Accumulator.png|Аккумулятор|Battery,3.61,accumulator,CarbonDust*50;EnergyBattery*30,100,10,600,10,5,200,fireball.trap,,,
Sid,Note,Sort,Research,Ingredients,MaxHp,ElectricityConsumption,,,,,,,,
!electricity.lamp.test,<no_icon>|Лампа|Floodlight,3.71,,CopperCable*2;Glass*2,1,10,,,,,,,,`;

    it("should parse lines", () => {
      const result = CsvParser.parseSection<Record>(section);
      expect(result.length).toBe(6);
      // console.table(result);
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
      // console.table(result);
    });

    it("should parse different structures", () => {
      const result = CsvParser.parseFile(differentStructures);
      expect(result).toMatchInlineSnapshot(`
Array [
  Object {
    "ConnectRadius": "5",
    "Ingredients": "StoneBrick*5;CopperCable*6",
    "MaxHp": "10",
    "Note": "ElectricPillar.png|Электрический столб|Electric pole",
    "Research": "",
    "Sid": "electricity.pole.1",
    "Sort": "3.04",
  },
  Object {
    "ConnectRadius": "15",
    "Ingredients": "",
    "MaxHp": "0",
    "Note": "ElectricPillar.png|Электрический столб|Electric pole",
    "Research": "",
    "Sid": "electricity.pole.ship",
    "Sort": "-4.004",
  },
  Object {
    "DurationSeconds": "6",
    "ElectricityPower": "30",
    "Ingredients": "StoneBrick*30;IronPlate*40;CopperCable*50",
    "MaxHp": "200",
    "NeedHeatEnergy": "5",
    "NeedWater": "0",
    "Note": "FuelGenerator.png|Топливный генератор (ур. 1)|Fuel generator (lev. 1)",
    "Research": "electronic1",
    "Sid": "electricity.heat.lvl1",
    "Sort": "3.51",
    "SpeedScale": "1",
  },
  Object {
    "DurationSeconds": "6",
    "ElectricityPower": "40",
    "Ingredients": "StoneBrick*50;SteelPlate*10;Electronic*20",
    "MaxHp": "200",
    "NeedHeatEnergy": "3",
    "NeedWater": "0",
    "Note": "FuelGenerator_2.png|Топливный генератор (ур. 2)|Fuel generator (lev. 2)",
    "Research": "electronic1",
    "Sid": "electricity.heat.lvl2",
    "Sort": "3.51",
    "SpeedScale": "1",
  },
  Object {
    "DurationSeconds": "6",
    "ElectricityPower": "50",
    "Ingredients": "SteelGirder*20;SteelDetails*40;Microcircuit*10",
    "MaxHp": "200",
    "NeedHeatEnergy": "1",
    "NeedWater": "0",
    "Note": "FuelGenerator_3.png|Топливный генератор (ур. 3)|Fuel generator (lev. 3)",
    "Research": "microelectronics",
    "Sid": "electricity.heat.lvl3",
    "Sort": "3.51",
    "SpeedScale": "1",
  },
  Object {
    "DurationSeconds": "6",
    "ElectricityPower": "200",
    "Ingredients": "Concrete*100;EnergyBattery*150;OpticalResonator*60",
    "MaxHp": "500",
    "NeedHeatEnergy": "2",
    "NeedWater": "2",
    "Note": "<no_icon>|Теплоэлектростанция|Thermal power plant",
    "Research": "",
    "Sid": "!electricity.heat.big.1",
    "Sort": "3.52",
    "SpeedScale": "1",
  },
  Object {
    "DurationSeconds": "10",
    "ElectricityPower": "45",
    "Ingredients": "CopperCable*50;EnergyBattery*40",
    "MaxHp": "0",
    "NeedHeatEnergy": "0",
    "NeedWater": "0",
    "Note": "Spaceship_Energyblock.png|Корабельный генератор|Shipboard power unit",
    "Research": "",
    "Sid": "electricity.endless_power.spaceship",
    "Sort": "-4.003",
    "SpeedScale": "1",
  },
  Object {
    "ElectricityPower": "40",
    "Ingredients": "CopperCable*100;SteelDetails*60;Electronic*50",
    "MaxHp": "200",
    "MinDistanceBetweenWindmills": "25",
    "Note": "Windmill.png|Ветрогенератор|Wind turbine",
    "Research": "wind",
    "Sid": "electricity.wind.1",
    "Sort": "3.53",
    "SpeedScale": "1",
  },
  Object {
    "ElectricityPower": "10",
    "Ingredients": "CopperPlate*28;SteelPlate*5;Glass*10",
    "MaxHp": "100",
    "Note": "<no_icon>|Солнечная панель|Solar panel",
    "Research": "solar",
    "Sid": "!electricity.solarpanel.1",
    "Sort": "3.54",
    "SpeedScale": "1",
  },
  Object {
    "Damage": "200",
    "ElectricityConsumption": "10",
    "ElectricityPower": "10",
    "ExplosionRadius": "5",
    "Ingredients": "CarbonDust*50;EnergyBattery*30",
    "MaxHp": "100",
    "MaxWorkTime": "600",
    "Note": "Accumulator.png|Аккумулятор|Battery",
    "Research": "accumulator",
    "Sid": "electricity.battery.1",
    "Sort": "3.61",
    "UpgradeToTrapSid": "fireball.trap",
  },
  Object {
    "ElectricityConsumption": "10",
    "Ingredients": "CopperCable*2;Glass*2",
    "MaxHp": "1",
    "Note": "<no_icon>|Лампа|Floodlight",
    "Research": "",
    "Sid": "!electricity.lamp.test",
    "Sort": "3.71",
  },
]
`);
      console.table(result);
    });
  });
});
