import React, { useState } from 'react';
import { observer } from 'mobx-react-lite';
import { CirclePicker } from 'react-color';

import { useBoardsStore } from '../../store';
import styled from 'styled-components';
import ReactDOM from 'react-dom';

interface ColorProps {
  color: string;
}

const Color = ({ color }: ColorProps) => {
  const { colors } = useBoardsStore();

  const [isPickerOpen, setPickerOpen] = useState(false);

  const togglePicker = () => setPickerOpen(s => !s);

  return (
    <>
      <button onClick={togglePicker}>
        <span
          className='block w-6 h-6 rounded-full'
          style={{ backgroundColor: color }}
        />
      </button>

      {isPickerOpen &&
        ReactDOM.createPortal(
          <div className='relative'>
            <StyledContainer className='mt-3 absolute z-10 text-white bg-gray-700 p-6 shadow-lg rounded'>
              <CirclePicker
                width={200}
                color={color}
                colors={colors.map(c => c.data.code)}
              />
            </StyledContainer>
            <div className='popover-arrow' />
          </div>,
          document.getElementById('__next')
        )}
    </>
  );
};

export default observer(Color);

const StyledContainer = styled.div`
  & ~ .popover-arrow {
    position: absolute;
    left: 5%;
    margin-left: -7px;
    top: 99%;
    clip: rect(0 18px 14px -4px);
  }

  & ~ .popover-arrow:after {
    content: '';
    display: block;
    width: 14px;
    height: 14px;
    background: #4a5568;
    transform: rotate(45deg) translate(6px, 6px);
    box-shadow: -1px -1px 1px -1px rgba(0, 0, 0, 0.54);
  }
`;
