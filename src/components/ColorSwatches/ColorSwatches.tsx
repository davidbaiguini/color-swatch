import React, { useState } from 'react';
import styled from 'styled-components';

import type { ColorList } from '../../App';
import { color } from '../../utils/color';
import { ColorSwatch } from '../ColorSwatch/ColorSwatch';

const ColorSwatchesWrapper = styled.div`
  display: grid;
  grid-gap: 5px;
`;

type ColorSwatchesProps = {
  colorList?: ColorList;
  loading: boolean;
};

export const ColorSwatches: React.FC<ColorSwatchesProps> = ({
  colorList,
  loading,
}) => {
  const [selectedColor, setSelectedColor] = useState('');

  if (loading) {
    return <div>loading...</div>;
  }

  if (!colorList || colorList.length < 1) {
    return <div>No color</div>;
  }

  return (
    <ColorSwatchesWrapper>
      {colorList.map((colorItem) => {
        const rgbColor = color(colorItem.kind, colorItem.components).toRGB();
        const idColor = `${colorItem.kind}-${JSON.stringify(
          colorItem.components
        )}`;
        return (
          <ColorSwatch
            onClick={() => setSelectedColor(idColor)}
            isSelected={selectedColor === idColor}
            key={idColor}
            colorText={`${colorItem.kind}: ${JSON.stringify(
              colorItem.components
            )}`}
            rgbColor={rgbColor}
          />
        );
      })}
    </ColorSwatchesWrapper>
  );
};
