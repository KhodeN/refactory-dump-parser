import { ItemId } from "./ItemId";

export interface RecipeBase {
  in?: Record<ItemId, number>;
  out?: Record<ItemId, number>;
  time?: number;
}
