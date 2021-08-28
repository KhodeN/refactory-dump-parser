import { ItemBeacon } from "./ItemBeacon";
import { ItemFactory } from "./ItemFactory";
import { ItemFuel } from "./ItemFuel";
import { ItemId } from "./ItemId";
import { ItemModule } from "./ItemModule";

export interface Item {
  beacon?: ItemBeacon;
  belt?: { speed: number };
  cargoWagon?: { size: number };
  category: string;
  factory?: ItemFactory;
  fluidWagon?: { capacity: number };
  fuel?: ItemFuel;
  id: ItemId;
  module?: ItemModule;
  name: string;
  row: number;
  stack?: number;
}
