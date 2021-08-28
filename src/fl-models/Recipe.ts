import { ItemId } from "./ItemId";
import { RecipeBase } from "./RecipeBase";

export interface Recipe extends RecipeBase {
  cost?: number;
  expensive?: RecipeBase;
  id: ItemId;
  name: string;
  part?: ItemId;
  producers: ItemId[];
}
