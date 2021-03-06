import { Theme as CharkaTheme, theme as chakraTheme } from '@chakra-ui/theme';
import { ColorHues } from '@chakra-ui/theme/dist/types/foundations/colors';
import { tailwindColors } from './colors';
import { systemFontStack, systemMonoFontStack } from './fonts';

export interface Theme extends CharkaTheme {
  colors: CharkaTheme['colors'] & {
    // Custom colors hues
    indigo: ColorHues;
  };
}

export const customTheme: Theme = {
  ...chakraTheme,
  fonts: {
    ...chakraTheme.fonts,
    body: systemFontStack,
    heading: systemFontStack,
    mono: systemMonoFontStack,
  },
  colors: {
    ...chakraTheme.colors,
    ...tailwindColors,
  },
  shadows: {
    ...chakraTheme.shadows,
    sm: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    lg:
      '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    xl:
      '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
    '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
    inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
    outline: '0 0 0 3px rgba(66, 153, 225, 0.5)',
    none: 'none',
  },
};
