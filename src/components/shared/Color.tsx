import React, { useRef } from 'react';
import { observer } from 'mobx-react-lite';
import { CirclePicker } from 'react-color';
import styled from 'styled-components';
import usePortal from 'react-cool-portal';
import { useSpring, animated } from 'react-spring';

import { useRect } from '../../hooks/use-rect';
import { useBoardsStore } from '../../store';

const TOP_PADDING = 35;
const LEFT_PADDING = 9;

interface ColorProps {
  color: string;
  onChange: (color: string) => void;
}

const Color: React.FC<ColorProps> = props => {
  const { color, onChange } = props;

  const { colors } = useBoardsStore();

  const buttonRef = useRef<HTMLButtonElement>();
  const [buttonRect] = useRect(buttonRef);

  const { Portal, toggle, isShow } = usePortal({ defaultShow: false });
  const style = useSpring({ opacity: isShow ? 1 : 0 });

  const handleChange = ({ hex }: { hex: string }) => onChange(hex);

  return (
    <div>
      <div className='-ml-2 inline-flex hover:bg-gray-800 rounded transition duration-300'>
        <button onClick={toggle} className='p-2' ref={buttonRef}>
          <span
            className='block w-6 h-6 rounded-full'
            style={{ backgroundColor: color }}
          />
        </button>
      </div>

      <Portal>
        <animated.div
          className='absolute z-10'
          style={{
            ...style,
            top: buttonRect.top + TOP_PADDING,
            left: buttonRect.left + LEFT_PADDING,
          }}
        >
          <StyledContainer className='mt-3 relative z-10 text-white bg-gray-700 p-6 shadow-lg rounded'>
            <CirclePicker
              width={200}
              color={color}
              colors={colors.map(c => c.data.code)}
              onChangeComplete={handleChange}
            />
            <div className='popover-arrow' />
          </StyledContainer>
        </animated.div>
      </Portal>
    </div>
  );
};

export default observer(Color);

const StyledContainer = styled.div`
  & .popover-arrow {
    position: absolute;
    left: 5%;
    margin-left: -7px;
    top: -14px;
    clip: rect(0 18px 14px -4px);
  }

  & .popover-arrow:after {
    content: '';
    display: block;
    width: 14px;
    height: 14px;
    background: #4a5568;
    transform: rotate(45deg) translate(6px, 6px);
    box-shadow: -1px -1px 1px -1px rgba(0, 0, 0, 0.54);
  }
`;
