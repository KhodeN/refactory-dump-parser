export interface ItemFactory {
  category?: string;
  mining?: boolean;
  modules: number;
  pollution?: number;
  research?: true;
  silo?: { parts: number; launch: number };
  speed: number;
  type?: "burner" | "heat" | "electric";
  usage?: number;
  drain?: number;
}
