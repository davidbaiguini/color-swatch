import React, { useEffect } from 'react';
import styled from 'styled-components';

import { Header } from './components/Header/Header';
import { Footer } from './components/Footer/Footer';
import { Button } from './components/Button/Button';
import { ColorSwatches } from './components/ColorSwatches/ColorSwatches';
import type { RgbColor, HslColor, BrgbColor } from './utils/color';
import { useLazyFetch } from './hooks/useLazyFetch';

const AppWrapper = styled.div`
  background-color: #111827;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const Page = styled.div`
  flex: 1;
  padding: 20px;
  position: relative;
`;

const ButtonContainer = styled.div`
  text-align: center;
  margin-bottom: 20px;
`;

const Panel = styled.div`
  padding: 10px;
  flex: 1;
  background: white;
  border-radius: 5px;
  max-width: 500px;
  margin: 0 auto;
  position: relative;
`;

const PanelContent = styled.div`
  position: relative;
  padding: 25px;
  background: white;
  border-radius: 5px;
  min-height: 555px;
`;

const PanelBackground = styled.div`
  position: absolute;
  top: -10px;
  left: -10px;
  bottom: -10px;
  right: -10px;
  background: conic-gradient(
    from 180deg at 50% 50%,
    #006aff 0deg,
    #52e0c4 139.2deg,
    #fe00d7 285.11deg,
    #006aff 320deg
  );
  filter: blur(150px);
`;

export type ColorListItem = {
  kind: 'rgb' | 'hsl' | 'brgb';
  components: RgbColor | HslColor | BrgbColor;
};

export type ColorList = ColorListItem[];

export const App: React.FC = () => {
  const [fetchColors, { data, loading, error }] = useLazyFetch<ColorList>(
    'https://challenge.structrs.com/rest/colors/list-extended'
  );

  // Fetch the first list of colors on load
  useEffect(() => {
    fetchColors();
  }, [fetchColors]);

  return (
    <AppWrapper>
      <Header />
      <Page>
        <Panel>
          <PanelBackground />
          <PanelContent>
            <ButtonContainer>
              <Button onClick={() => fetchColors()}>
                Reload list of colors
              </Button>
            </ButtonContainer>
            {error ? (
              'Oops, something went wrong fetching the list of colors'
            ) : (
              <ColorSwatches loading={loading} colorList={data} />
            )}
          </PanelContent>
        </Panel>
      </Page>
      <Footer />
    </AppWrapper>
  );
};
