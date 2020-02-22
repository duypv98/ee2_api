const prodConfig = require('configs/prod');
const localConfig = require('configs/local');
const devConfig = require('configs/dev');
const deepFreeze = require('deep-freeze');
const baseConfig = require('configs/base');

const env = process.env.APP_ENV;

const envConfig = (env === 'development') ? devConfig : (env === 'production') ? prodConfig : localConfig;

const configs = {
  ...envConfig,
  ...baseConfig,
};

deepFreeze(configs);

module.exports = configs;
