import React from 'react';
import styled from 'styled-components';

const HeaderWrapper = styled.div`
  text-transform: uppercase;
  text-align: center;
  position: relative;
  color: white;
  background-color: #111827;
  z-index: 1;

  &:after {
    content: '';
    left: 0;
    right: 0;
    position: absolute;
    height: 3px;
    background: #fe00d7;
    background: linear-gradient(90deg, #006aff 0%, #52e0c4 50%, #fe00d7 100%);
  }
`;

export const Header: React.FC = () => {
  return (
    <HeaderWrapper>
      <h1>Color Swatches</h1>
    </HeaderWrapper>
  );
};
