import React, { useEffect } from 'react';
import styled from 'styled-components';

import { Header } from './components/Header/Header';
import { Footer } from './components/Footer/Footer';
import { Button } from './components/Button/Button';
import { ColorSwatches } from './components/ColorSwatches/ColorSwatches';
import type { RgbColor, HslColor } from './utils/color';
import { useLazyFetch } from './hooks/useLazyFetch';

const PageWrapper = styled.div`
  background-color: #111827;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const Page = styled.div`
  flex: 1;
  padding: 20px;
`;

const ButtonContainer = styled.div`
  text-align: center;
  margin-bottom: 20px;
`;

const Panel = styled.div`
  padding: 25px;
  flex: 1;
  background: white;
  border-radius: 5px;
  max-width: 500px;
  margin: 0 auto;
`;

export type ColorListItem = {
  kind: string; // One of "rgb", or "hsl"
  components: RgbColor | HslColor;
};

export type ColorList = ColorListItem[];

export const App: React.FC = () => {
  const [fetchColors, { data, loading, error }] = useLazyFetch<ColorList>(
    'https://challenge.structrs.com/rest/colors/list'
  );

  // Fetch the first list of colors on load
  useEffect(() => {
    fetchColors();
  }, [fetchColors]);

  return (
    <PageWrapper>
      <Header />
      <Page className="App-header">
        <Panel>
          <ButtonContainer>
            <Button onClick={() => fetchColors()}>Reload list of colors</Button>
          </ButtonContainer>
          {error ? (
            'Oops, something went wrong fetching the list of colors'
          ) : (
            <ColorSwatches loading={loading} colorList={data} />
          )}
        </Panel>
      </Page>
      <Footer />
    </PageWrapper>
  );
};
