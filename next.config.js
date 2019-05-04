const withCSS = require('@zeit/next-css');
const dotEnvResult = require('dotenv').config();

if (dotEnvResult.error) {
  throw dotEnvResult.error;
}
const parsedVariables = dotEnvResult.parsed || {};
const dotEnvVariables = {};

for (const key of Object.keys(parsedVariables)) {
  dotEnvVariables[key] = process.env[key];
}

module.exports = withCSS({
  env: {
    ...dotEnvVariables,
  },
});
