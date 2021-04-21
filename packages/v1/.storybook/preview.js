import { themes } from '@storybook/theming';
import { ChakraProvider } from '@chakra-ui/react';

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
    <ChakraProvider theme={customTheme}>
        <Story />
    </ChakraProvider>
  ),
];