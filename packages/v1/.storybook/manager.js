import { addons } from '@storybook/addons';
import { themes } from '@storybook/theming';
import { create } from '@storybook/theming/create';

const customTheme = create({
  appBg: '#1a202c',
  appContentBg: '#2d3748',
  appBorderColor: '#2d3748',
  brandImage: 'https://easyflow.live/static/images/icon.ico',
});

addons.setConfig({
  theme: { ...themes.dark, ...customTheme },
});
