import React from 'react';
import styled from 'styled-components';

import PopupMenu, { PopupProvider } from '.';

const Overlay = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.4);
`;

const Centered = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  position: relative;
  height: 100vh;
`;

export default { title: 'Molecules/PopupMenu', component: PopupMenu };

export const basicDialog = () => (
  <PopupProvider>
    <Overlay>
      <Centered>
        <PopupMenu
          title='Start a new board'
          onClose={() => {}}
          top={0}
          left={0}
        >
          <div>Feature</div>
        </PopupMenu>
      </Centered>
    </Overlay>
  </PopupProvider>
);
