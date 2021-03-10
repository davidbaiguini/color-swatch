import styled from "styled-components";
import { prop } from "styled-tools";

import { RgbColor } from "../../utils/color";

const ColorSwatchWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const ColorTile = styled.div<{ rgbCssColor: string }>`
  height: 75px;
  width: 75px;
  box-shadow: 0px 0px 5px 2px #000000;
  border: solid 1px white;
  background: ${prop("rgbCssColor")};
`;

const ColorText = styled.div`
  padding-left: 10px;
`;

type ColorSwatchProps = {
  rgbColor: RgbColor;
};

export const ColorSwatch: React.FC<ColorSwatchProps> = ({ rgbColor }) => {
  const rgbCssColor = `rgb(${rgbColor.red}, ${rgbColor.green}, ${rgbColor.blue})`;
  return (
    <ColorSwatchWrapper>
      <ColorTile rgbCssColor={rgbCssColor} />
      <ColorText>
        RGB color: {`(${rgbColor.red}, ${rgbColor.green}, ${rgbColor.blue})`}
      </ColorText>
    </ColorSwatchWrapper>
  );
};
