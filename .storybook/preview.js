import { themes } from '@storybook/theming';
import { ChakraProvider, ColorModeScript } from '@chakra-ui/react';

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
    <>
    <ColorModeScript initialColorMode={'dark'} />
    <ChakraProvider theme={customTheme}>
        <Story />
    </ChakraProvider>
    </>
  ),
];