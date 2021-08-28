import { ItemId } from "./ItemId";

export interface ItemFuel {
  category: string;
  result?: ItemId;
  value: number;
}
