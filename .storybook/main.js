const path = require('path');

module.exports = {
  stories: ['../src/**/*.stories.@(ts|tsx|js|jsx|mdx)'],
  addons: ['@storybook/addon-actions', '@storybook/addon-links'],
  webpackFinal: async config => {
    config.resolve.modules = [
      path.resolve(__dirname, '../src'),
      ...config.resolve.modules,
    ];

    return config;
  },
};
