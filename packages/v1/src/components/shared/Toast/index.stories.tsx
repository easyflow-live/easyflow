import React from 'react';
import styled from '@emotion/styled';

import Toast from '.';

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

export default { title: 'Molecules/Toast', component: Toast };

export const basicToast = () => (
  <Overlay>
    <Centered>
      <Toast title='Started a new board' closeToast={() => {}} id={'0'} />
    </Centered>
  </Overlay>
);

export const undoToast = () => (
  <Overlay>
    <Centered>
      <Toast
        title='Started a new board'
        closeToast={() => {}}
        undo={() => {}}
        id={'0'}
      />
    </Centered>
  </Overlay>
);
