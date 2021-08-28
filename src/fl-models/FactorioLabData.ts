import { Category } from "./Category";
import { Defaults } from "./Defaults";
import { Icon } from "./Icon";
import { Item } from "./Item";
import { ItemId } from "./ItemId";
import { Recipe } from "./Recipe";

export interface FactorioLabData {
  categories: Category[];
  defaults: Defaults;
  icons: Icon[];
  items: Item[];
  limitations: { "productivity-module": ItemId[] };
  recipes: Recipe[];
}
