import { ItemId } from "./ItemId";

export interface Defaults {
  beacon?: ItemId;
  beaconModule?: ItemId;
  cargoWagon?: ItemId;
  disabledRecipes?: ItemId[];
  fluidWagon?: ItemId;
  fuel?: ItemId;
  maxBelt?: ItemId;
  maxFactoryRank?: ItemId[];
  minBelt?: ItemId;
  minFactoryRank?: ItemId[];
  modIds?: string[];
  moduleRank?: ItemId[];
}
