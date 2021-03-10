import React from "react";
import styled from "styled-components";

import type { ColorList } from "../../App";
import { color, HslColor, RgbColor } from "../../utils/color";
import { ColorSwatch } from "../ColorSwatch/ColorSwatch";

const ColorSwatchesWrapper = styled.div`
  display: grid;
  grid-gap: 25px;
`;

type ColorSwatchesProps = {
  colorList?: ColorList;
  loading: boolean;
};

export const ColorSwatches: React.FC<ColorSwatchesProps> = ({
  colorList,
  loading,
}) => {
  if (loading) {
    return <div>loading...</div>;
  }

  if (!colorList || colorList.length < 1) {
    return <div>No color</div>;
  }

  return (
    <ColorSwatchesWrapper>
      {colorList.map((colorItem) => {
        let rgbColor;
        switch (colorItem.kind) {
          case "rgb":
            rgbColor = color()
              .fromRGB(colorItem.components as RgbColor)
              .toRGB();
            break;
          case "hsl":
            rgbColor = color()
              .fromHSL(colorItem.components as HslColor)
              .toRGB();
            break;
          default:
            throw new Error("Color not supported");
        }
        return <ColorSwatch rgbColor={rgbColor} />;
      })}
    </ColorSwatchesWrapper>
  );
};
