import styled, { css } from 'styled-components';
import { prop, ifProp } from 'styled-tools';

import { RgbColor } from '../../utils/color';

const ColorSwatchWrapper = styled.div<{ isSelected: boolean }>`
  display: flex;
  align-items: center;
  border: solid 2px white;
  padding: 5px;
  ${ifProp(
    'isSelected',
    css`
      border-color: #fd07d7;
      box-shadow: 0px 0px 5px 2px #fc0cd7;
    `
  )}
`;

const ColorTile = styled.div<{ rgbCssColor: string }>`
  height: 75px;
  width: 75px;
  box-shadow: 0px 0px 5px 2px #000000;
  border: solid 1px white;
  background: ${prop('rgbCssColor')};
  cursor: pointer;
`;

const ColorText = styled.div`
  padding-left: 10px;
  font-size: 14px;
  height: 17px;
`;

type ColorSwatchProps = {
  rgbColor: RgbColor;
  colorText: string;
  isSelected: boolean;
  onClick:
    | ((event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void)
    | undefined;
};

export const ColorSwatch: React.FC<ColorSwatchProps> = ({
  rgbColor,
  colorText,
  isSelected = false,
  onClick,
}) => {
  const rgbCssColor = `rgb(${rgbColor.red}, ${rgbColor.green}, ${rgbColor.blue})`;
  const rgbTextColor = `RGB color: ${`(${rgbColor.red}, ${rgbColor.green}, ${rgbColor.blue})`}`;
  return (
    <ColorSwatchWrapper isSelected={isSelected} onClick={onClick}>
      <ColorTile rgbCssColor={rgbCssColor} />
      <div>
        <ColorText>{colorText}</ColorText>
        <ColorText>{isSelected ? rgbTextColor : ' '}</ColorText>
      </div>
    </ColorSwatchWrapper>
  );
};
