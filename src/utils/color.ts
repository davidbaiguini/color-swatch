// https://www.rapidtables.com/convert/color/hsl-to-rgb.html
// https://www.peko-step.com/en/tool/hslrgb_en.html

export type RgbColor = {
  red: number; // [0, 255]
  green: number; // [0, 255]
  blue: number; // [0, 255]
};

export type HslColor = {
  hue: number; // [0, 360] degrees
  saturation: number; // [0, 100] percentage
  lightness: number; // [0, 100] percentage
};

export type BrgbColor = {
  bred: number; // [0, 10000]
  bgreen: number; // [0, 10000]
  bblue: number; // [0, 10000]
};

export const rgb2rgb = ({ red, green, blue }: RgbColor): RgbColor => {
  return {
    red: Math.min(red, 255),
    green: Math.min(green, 255),
    blue: Math.min(blue, 255),
  };
};

export const rgb2brgb = ({ red, green, blue }: RgbColor): BrgbColor => {
  return {
    bred: Math.round((red / 255) * 10000),
    bgreen: Math.round((green / 255) * 10000),
    bblue: Math.round((blue / 255) * 10000),
  };
};

export const brgb2rgb = ({ bred, bgreen, bblue }: BrgbColor): RgbColor => {
  return {
    red: Math.round((bred / 10000) * 255),
    green: Math.round((bgreen / 10000) * 255),
    blue: Math.round((bblue / 10000) * 255),
  };
};

export const rgb2hsl = (rgbColor: RgbColor): HslColor => {
  let { red, green, blue } = rgbColor;

  // Make r, g, and b fractions of 1
  red /= 255;
  green /= 255;
  blue /= 255;

  // Find greatest and smallest channel values
  const cmin = Math.min(red, green, blue);
  const cmax = Math.max(red, green, blue);
  const delta = cmax - cmin;

  let hue = 0;
  let saturation = 0;
  let lightness = 0;

  // Calculate hue
  // No difference
  if (delta === 0) {
    hue = 0;
  }
  // Red is max
  else if (cmax === red) {
    hue = ((green - blue) / delta) % 6;
  }
  // Green is max
  else if (cmax === green) {
    hue = (blue - red) / delta + 2;
  }
  // Blue is max
  else {
    hue = (red - green) / delta + 4;
  }

  hue = Math.round(hue * 60);

  // Make negative hues positive behind 360°
  if (hue < 0) hue += 360;

  // Calculate lightness
  lightness = (cmax + cmin) / 2;

  // Calculate saturation
  saturation = delta === 0 ? 0 : delta / (1 - Math.abs(2 * lightness - 1));

  // Multiply l and s by 100
  saturation = Math.abs(Math.round(saturation * 100));
  lightness = Math.abs(Math.round(lightness * 100));

  return {
    hue,
    saturation,
    lightness,
  };
};

export const hsl2rgb = (hslColor: HslColor): RgbColor => {
  let { saturation, lightness } = hslColor;
  const { hue } = hslColor;

  // Must be fractions of 1
  saturation /= 100;
  lightness /= 100;

  let red = 0;
  let green = 0;
  let blue = 0;

  const chroma = (1 - Math.abs(2 * lightness - 1)) * saturation;
  const x = chroma * (1 - Math.abs(((hue / 60) % 2) - 1));
  const m = lightness - chroma / 2;

  if (0 <= hue && hue < 60) {
    red = chroma;
    green = x;
    blue = 0;
  } else if (60 <= hue && hue < 120) {
    red = x;
    green = chroma;
    blue = 0;
  } else if (120 <= hue && hue < 180) {
    red = 0;
    green = chroma;
    blue = x;
  } else if (180 <= hue && hue < 240) {
    red = 0;
    green = x;
    blue = chroma;
  } else if (240 <= hue && hue < 300) {
    red = x;
    green = 0;
    blue = chroma;
  } else if (300 <= hue && hue < 360) {
    red = chroma;
    green = 0;
    blue = x;
  }

  red = Math.round((red + m) * 255);
  green = Math.round((green + m) * 255);
  blue = Math.round((blue + m) * 255);

  return { red, green, blue };
};

class Color {
  private _color?: RgbColor;

  // constructor() {}

  private get color() {
    if (!this._color) {
      throw new Error('You need to first set a color');
    }
    return this._color;
  }

  private set color(value) {
    this._color = value;
  }

  public fromRGB(rgbColor: RgbColor): Color {
    const { red, green, blue } = rgbColor;
    this.color = rgb2rgb({ red, green, blue });
    return this;
  }

  public fromHSL(hslColor: HslColor): Color {
    const { hue, lightness, saturation } = hslColor;
    this.color = hsl2rgb({ hue, lightness, saturation });
    return this;
  }

  public fromBRGB(brgbColor: BrgbColor): Color {
    const { bred, bgreen, bblue } = brgbColor;
    this.color = brgb2rgb({ bred, bgreen, bblue });
    return this;
  }

  public toRGB() {
    const { red, green, blue } = this.color;
    return rgb2rgb({ red, green, blue });
  }

  public toHSL() {
    const { red, green, blue } = this.color;
    return rgb2hsl({ red, green, blue });
  }

  public toBRGB() {
    const { red, green, blue } = this.color;
    return rgb2brgb({ red, green, blue });
  }
}

export const color = (): Color => {
  return new Color();
};
