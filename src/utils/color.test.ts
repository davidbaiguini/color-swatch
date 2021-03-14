import { color, hsl2rgb, rgb2hsl, brgb2rgb, rgb2brgb } from './color';

// From https://www.rapidtables.com/convert/color/hsl-to-rgb.html
const colorTable = {
  Black: {
    hsl: [0, 0, 0],
    hex: '000000',
    rgb: [0, 0, 0],
    brgb: [0, 0, 0],
  },
  White: {
    hsl: [0, 0, 100],
    hex: 'FFFFFF',
    rgb: [255, 255, 255],
    brgb: [10000, 10000, 10000],
  },

  Red: {
    hsl: [0, 100, 50],
    hex: 'FF0000',
    rgb: [255, 0, 0],
    brgb: [10000, 0, 0],
  },
  Lime: {
    hsl: [120, 100, 50],
    hex: '00FF00',
    rgb: [0, 255, 0],
    brgb: [0, 10000, 0],
  },
  Blue: {
    hsl: [240, 100, 50],
    hex: '0000FF',
    rgb: [0, 0, 255],
    brgb: [0, 0, 10000],
  },
  Yellow: {
    hsl: [60, 100, 50],
    hex: 'FFFF00',
    rgb: [255, 255, 0],
    brgb: [10000, 10000, 0],
  },
  Cyan: {
    hsl: [180, 100, 50],
    hex: '00FFFF',
    rgb: [0, 255, 255],
    brgb: [0, 10000, 10000],
  },
  Magenta: {
    hsl: [300, 100, 50],
    hex: 'FF00FF',
    rgb: [255, 0, 255],
    brgb: [10000, 0, 10000],
  },

  Silver: {
    hsl: [0, 0, 75],
    hex: 'BFBFBF',
    rgb: [191, 191, 191],
    brgb: [7490, 7490, 7490],
  },
  Gray: {
    hsl: [0, 0, 50],
    hex: '808080',
    rgb: [128, 128, 128],
    brgb: [5020, 5020, 5020],
  },
  Maroon: {
    hsl: [0, 100, 25],
    hex: '800000',
    rgb: [128, 0, 0],
    brgb: [5020, 0, 0],
  },
  Olive: {
    hsl: [60, 100, 25],
    hex: '808000',
    rgb: [128, 128, 0],
    brgb: [5020, 5020, 0],
  },
  Green: {
    hsl: [120, 100, 25],
    hex: '008000',
    rgb: [0, 128, 0],
    brgb: [0, 5020, 0],
  },
  Purple: {
    hsl: [300, 100, 25],
    hex: '800080',
    rgb: [128, 0, 128],
    brgb: [5020, 0, 5020],
  },
  Teal: {
    hsl: [180, 100, 25],
    hex: '008080',
    rgb: [0, 128, 128],
    brgb: [0, 5020, 5020],
  },
  Navy: {
    hsl: [240, 100, 25],
    hex: '000080',
    rgb: [0, 0, 128],
    brgb: [0, 0, 5020],
  },
};

const colorKeys = Object.keys(colorTable) as Array<keyof typeof colorTable>;

describe('The Color class', () => {
  describe('Should have the methods', () => {
    it('fromRGB', () => {
      expect(color()).toEqual(
        expect.objectContaining({ fromRGB: expect.any(Function) })
      );
    });
    it('toRGB', () => {
      expect(color()).toEqual(
        expect.objectContaining({ toRGB: expect.any(Function) })
      );
    });
    it('fromHSL', () => {
      expect(color()).toEqual(
        expect.objectContaining({ fromHSL: expect.any(Function) })
      );
    });
    it('fromBRGB', () => {
      expect(color()).toEqual(
        expect.objectContaining({ fromBRGB: expect.any(Function) })
      );
    });
    it('toBRGB', () => {
      expect(color()).toEqual(
        expect.objectContaining({ toBRGB: expect.any(Function) })
      );
    });
    it('toHSL', () => {
      expect(color()).toEqual(
        expect.objectContaining({ toHSL: expect.any(Function) })
      );
    });
  });

  describe('Should have chained methods working', () => {
    it('fromRGB --> toRGB', () => {
      const thisColor = color().fromRGB({ red: 0, green: 0, blue: 0 }).toRGB();
      expect(thisColor).toStrictEqual({ red: 0, green: 0, blue: 0 });
    });
    it('fromHSL --> toRGB', () => {
      const thisColor = color()
        .fromHSL({ hue: 0, saturation: 0, lightness: 0 })
        .toRGB();
      expect(thisColor).toStrictEqual({ red: 0, green: 0, blue: 0 });
    });
    it('fromBRGB --> toRGB', () => {
      const thisColor = color()
        .fromBRGB({ bred: 0, bgreen: 0, bblue: 0 })
        .toRGB();
      expect(thisColor).toStrictEqual({ red: 0, green: 0, blue: 0 });
    });
  });

  describe('Should fail when a color has not been set', () => {
    it('using toRGB method', () => {
      expect(() => {
        color().toRGB();
      }).toThrowError('You need to first set a color');
    });
    it('using toHSL method', () => {
      expect(() => {
        color().toHSL();
      }).toThrowError('You need to first set a color');
    });
  });

  describe('Should have a constructor that allows parameters', () => {
    it('using hsl', () => {
      expect(
        color('hsl', {
          hue: 0,
          saturation: 0,
          lightness: 0,
        }).toRGB()
      ).toStrictEqual({ red: 0, green: 0, blue: 0 });
    });
  });

  //   describe("Should fail missing SOMETHING", () => {
  //     it("using toRGB method", () => {
  //       expect(() => {
  //         color().fromRGB({ blue: 0, green: 0 });
  //       }).toThrow();
  //     });
  //   });
});

describe('The hsl2rgb function', () => {
  describe('Should convert the colors', () => {
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

describe('The rgb2hsl function', () => {
  describe('Should convert the colors', () => {
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

describe('The rgb2brgb function', () => {
  describe('Should convert the colors', () => {
    colorKeys.forEach((key) => {
      it(`color ${key}`, () => {
        expect(
          rgb2brgb({
            red: colorTable[key].rgb[0],
            green: colorTable[key].rgb[1],
            blue: colorTable[key].rgb[2],
          })
        ).toStrictEqual({
          bred: colorTable[key].brgb[0],
          bgreen: colorTable[key].brgb[1],
          bblue: colorTable[key].brgb[2],
        });
      });
    });
  });
});

describe('The brgb2rgb function', () => {
  describe('Should convert the colors', () => {
    colorKeys.forEach((key) => {
      it(`color ${key}`, () => {
        expect(
          brgb2rgb({
            bred: colorTable[key].brgb[0],
            bgreen: colorTable[key].brgb[1],
            bblue: colorTable[key].brgb[2],
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
