import { IconSprite } from "./IconSprite";

describe("IconSprite", () => {
  it("should getSize", () => {
    expect(IconSprite.getSize(214)).toMatchInlineSnapshot(`
Object {
  "columns": 14,
  "max": 224,
  "rows": 16,
  "total": 214,
}
`);
  });
});
