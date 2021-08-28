interface SpriteItem {
  /**
   * Example: #ff34aa
   */
  color: string;
  x: number;
  y: number;
}

export type SpriteData = Record<string, SpriteItem>;
