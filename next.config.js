const Dotenv = require('dotenv-webpack');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const webpack = require('webpack');

module.exports = {
  webpack: (config, { dev }) => {
    config.plugins.push(new Dotenv({ systemvars: true }));

    if (!dev) {
      if (Array.isArray(config.optimization.minimizer)) {
        config.optimization.minimizer.push(new OptimizeCSSAssetsPlugin({}));
      }
    }

    config.plugins.push(new webpack.DefinePlugin({ __DEV__: dev }));

    return config;
  },
};
