import { hsl2rgb, rgb2hsl } from "./color";

// From https://www.rapidtables.com/convert/color/hsl-to-rgb.html
const colorTable = {
  Black: { hsl: [0, 0, 0], hex: "000000", rgb: [0, 0, 0] },
  White: { hsl: [0, 0, 100], hex: "FFFFFF", rgb: [255, 255, 255] },
  Red: { hsl: [0, 100, 50], hex: "FF0000", rgb: [255, 0, 0] },
  Lime: { hsl: [120, 100, 50], hex: "00FF00", rgb: [0, 255, 0] },
  Blue: { hsl: [240, 100, 50], hex: "0000FF", rgb: [0, 0, 255] },
  Yellow: { hsl: [60, 100, 50], hex: "FFFF00", rgb: [255, 255, 0] },
  Cyan: { hsl: [180, 100, 50], hex: "00FFFF", rgb: [0, 255, 255] },
  Magenta: { hsl: [300, 100, 50], hex: "FF00FF", rgb: [255, 0, 255] },
  Silver: { hsl: [0, 0, 75], hex: "BFBFBF", rgb: [191, 191, 191] },
  Gray: { hsl: [0, 0, 50], hex: "808080", rgb: [128, 128, 128] },
  Maroon: { hsl: [0, 100, 25], hex: "800000", rgb: [128, 0, 0] },
  Olive: { hsl: [60, 100, 25], hex: "808000", rgb: [128, 128, 0] },
  Green: { hsl: [120, 100, 25], hex: "008000", rgb: [0, 128, 0] },
  Purple: { hsl: [300, 100, 25], hex: "800080", rgb: [128, 0, 128] },
  Teal: { hsl: [180, 100, 25], hex: "008080", rgb: [0, 128, 128] },
  Navy: { hsl: [240, 100, 25], hex: "000080", rgb: [0, 0, 128] },
};

const colorKeys = Object.keys(colorTable) as Array<keyof typeof colorTable>;

describe("The hsl2rgb function", () => {
  describe("Should convert the colors", () => {
    colorKeys.forEach((key) => {
      it(`color ${key}`, () => {
        expect(
          hsl2rgb({
            hue: colorTable[key].hsl[0],
            saturation: colorTable[key].hsl[1],
            lightness: colorTable[key].hsl[2],
          })
        ).toStrictEqual({
          red: colorTable[key].rgb[0],
          green: colorTable[key].rgb[1],
          blue: colorTable[key].rgb[2],
        });
      });
    });
  });
});

describe("The rgb2hsl function", () => {
  describe("Should convert the colors", () => {
    colorKeys.forEach((key) => {
      it(`color ${key}`, () => {
        expect(
          rgb2hsl({
            red: colorTable[key].rgb[0],
            green: colorTable[key].rgb[1],
            blue: colorTable[key].rgb[2],
          })
        ).toStrictEqual({
          hue: colorTable[key].hsl[0],
          saturation: colorTable[key].hsl[1],
          lightness: colorTable[key].hsl[2],
        });
      });
    });
  });
});
