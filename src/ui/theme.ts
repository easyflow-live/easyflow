import { extendTheme } from '@chakra-ui/react';
import { Theme as CharkaTheme } from '@chakra-ui/theme';
import { colors } from './colors';
import { systemFontStack, systemMonoFontStack } from './fonts';

export const customTheme: CharkaTheme = extendTheme({
  fonts: {
    body: systemFontStack,
    heading: systemFontStack,
    mono: systemMonoFontStack,
  },
  colors: {
    ...colors,
  },
  shadows: {
    sm: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    lg:
      '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    xl:
      '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
    '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
    inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
    outline: '0 0 0 3px rgba(237, 100, 166, 0.5)',
    none: 'none',
  },
  styles: {
    global: {
      body: {
        backgroundColor: 'gray.800',
        color: 'gray.200',
        fontFamily: 'body',
        fontsize: '16px',
      },
    },
  },
});
