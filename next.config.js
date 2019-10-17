const withCSS = require('@zeit/next-css');
const withSASS = require('@zeit/next-sass');
const path = require('path');
const Dotenv = require('dotenv-webpack');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = withSASS(
  withCSS({
    webpack: (config, env) => {
      config.plugins = config.plugins || [];

      config.plugins = [
        ...config.plugins,

        // Read the .env file
        new Dotenv({
          path: path.join(__dirname, env === 'production' ? '.env' : '.env'),
          systemvars: true
        })
      ];

      if (config.mode === 'production') {
        if (Array.isArray(config.optimization.minimizer)) {
          config.optimization.minimizer.push(new OptimizeCSSAssetsPlugin({}));
        }
      }

      return config;
    }
  })
);
