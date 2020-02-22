const baseConfig = require('configs/base');

const DB_URL = `mongodb://${baseConfig.DB_HOST}:${baseConfig.DB_PORT}/easy-event-v2`;
const FE_URL = 'https://easy-event.tk';

module.exports = {
  DB_URL,
  FE_URL,
};
