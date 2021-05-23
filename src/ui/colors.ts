export interface ThemeableColor {
  dark: string;
  light: string;
}

export type ThemeableColors = {
  [color: string]: ThemeableColor;
};

export const colors = {
  gray: {
    50: '#fcfeff',
    100: '#f7fafc',
    200: '#edf2f7',
    300: '#e2e8f0',
    400: '#cbd5e0',
    500: '#a0aec0',
    600: '#718096',
    700: '#4a5568',
    750: '#3d495d',
    800: '#2d3748',
    900: '#1a202c',
  },
  pink: {
    50: '#fffafb',
    100: '#fff5f7',
    200: '#fed7e2',
    300: '#fbb6ce',
    400: '#f687b3',
    500: '#ed64a6',
    600: '#d53f8c',
    700: '#b83280',
    800: '#97266d',
    900: '#702459',
  },
};
