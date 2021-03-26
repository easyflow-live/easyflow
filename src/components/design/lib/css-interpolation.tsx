/*
 * CSS Interpolation helpers.
 */

import { Interpolation } from '@emotion/serialize';

/**
 * Style variant helper factory.
 *
 * i.e.:
 *
 *  ```
 *  type ButtonProps = { primary?: boolean, secondary?: boolean, danger?: boolean }
 *
 *  const Button = styled.button<ButtonProps>`
 *    color: white;
 *    background-color: grey;
 *
 *    ${variants({
 *      primary: 'background-color: blue;'
 *      secondary: 'background-color: yellow;'
 *      danger: 'background-color: red;'
 *    })}
 *  `
 * ```
 */
const variants = <P extends {}>(map: { [key: string]: Interpolation<P> }) =>
  Object.keys(map).map(prop => map[prop] || '');

export { variants };
