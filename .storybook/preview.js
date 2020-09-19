import { themes } from '@storybook/theming';

import '../src/styles/style.css';

// or global addParameters
export const parameters = {
  docs: {
    theme: themes.dark,
  },
};
