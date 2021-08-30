interface SpriteItem {
  /**
   * Example: #ff34aa
   */
  color: string;
  x: number;
  y: number;
}

export type SpriteData = Record<string, SpriteItem>;

export function pos(coordinate: number): number {
  return coordinate === 0 ? 0 : -coordinate;
}
