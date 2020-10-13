import { themes } from '@storybook/theming';
import { ThemeProvider, ColorModeProvider } from '@chakra-ui/core';

import '../src/styles/style.css';
import { customTheme } from '../src/ui/theme';

// or global addParameters
export const parameters = {
  docs: {
    theme: themes.dark,
  },
};


export const decorators = [
  Story => (
    <ThemeProvider theme={customTheme}>
      <ColorModeProvider>
        <Story />
      </ColorModeProvider>
    </ThemeProvider>
  ),
];