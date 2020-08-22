import styled, { css } from 'styled-components';

export const Container = styled.div<{
  invertY: boolean;
  invert: boolean;
  top: number;
  left: number;
  ref: any;
  width: number | string;
}>`
  left: ${props => props.left}px;
  top: ${props => props.top}px;
  display: block;
  position: absolute;
  width: ${props => props.width}px;
  padding-top: 10px;
  height: auto;
  z-index: 40000;
  ${props =>
    props.invert &&
    css`
      transform: translate(-100%);
    `}
  ${props =>
    props.invertY &&
    css`
      top: auto;
      padding-top: 0;
      padding-bottom: 10px;
      bottom: ${props.top}px;
    `}
`;

export const Wrapper = styled.div`
  padding: 5px;
  padding-top: 8px;
  border-radius: 5px;
  box-shadow: 0 5px 25px 0 rgba(0, 0, 0, 0.1);
  position: relative;
  margin: 0;

  color: #c2c6dc;
  background: #262c49;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-color: #414561;
`;

export const Header = styled.div`
  height: 40px;
  position: relative;
  margin-bottom: 8px;
  text-align: center;
`;

export const HeaderTitle = styled.span`
  box-sizing: border-box;
  color: #c2c6dc;
  display: block;
  border-bottom: 1px solid #414561;
  margin: 0 12px;
  overflow: hidden;
  padding: 0 32px;
  position: relative;
  text-overflow: ellipsis;
  white-space: nowrap;
  z-index: 1;

  height: 40px;
  line-height: 18px;
  font-size: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Content = styled.div`
  max-height: 632px;
`;

export const CloseButton = styled.div`
  padding: 18px 18px 14px 12px;
  position: absolute;
  top: 0;
  right: 0;
  z-index: 2;

  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 40;
  cursor: pointer;
`;

export const PreviousButton = styled.div`
  padding: 18px 18px 14px 12px;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 2;

  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 40;
  cursor: pointer;
`;

export const ContainerDiamond = styled.div<{
  invert: boolean;
  invertY: boolean;
}>`
  ${props => (props.invert ? 'right: 10px; ' : 'left: 15px;')}
  position: absolute;
  width: 10px;
  height: 10px;
  display: block;
  ${props =>
    props.invertY
      ? css`
          bottom: 0;
          border-bottom: 1px solid rgba(0, 0, 0, 0.1);
          border-right: 1px solid rgba(0, 0, 0, 0.1);
        `
      : css`
          top: 10px;
          border-top: 1px solid rgba(0, 0, 0, 0.1);
          border-left: 1px solid rgba(0, 0, 0, 0.1);
        `}
  transform: rotate(45deg) translate(-7px);
  z-index: 10;

  background: #262c49;
  border-color: #414561;
`;
