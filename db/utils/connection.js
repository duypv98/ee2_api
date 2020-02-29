const mongoose = require('mongoose');
const chalk = require('chalk');
const configs = require('configs/index');

mongoose.Promise = global.Promise;

const { connection } = mongoose;
const LOG_TAG = {
  connected: chalk.bold.cyan,
  error: chalk.bold.yellow,
  disconnected: chalk.bold.red,
  reconnected: chalk.bold.blue,
  terminated: chalk.bold.magenta,
};

connection.on('connected', () => {
  console.log(LOG_TAG.connected(`Connected, default connection is open to: ${configs.DB_URL}`));
});

connection.on('error', (err) => {
  console.log(LOG_TAG.error(`Error, default connection has occured ${err} erorr`));
});

connection.on('disconnected', () => {
  console.log(LOG_TAG.disconnected('Disconnected'));
});

connection.on('reconnected', () => {
  console.log(LOG_TAG.reconnected(`Reconnected, default connection is re-open to: ${configs.DB_URL}`));
});

process.on('SIGINT', () => {
  connection.close(() => {
    console.log(LOG_TAG.terminated('Terminated, default connection is disconnected due to application termination'));
    process.exit(0);
  });
});

const open = async () => {
  try {
    await mongoose.connect(configs.DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      auth: {
        user: configs.DB_USER,
        password: configs.DB_PWD,
      }
    });
  } catch (e) {
    throw new Error(`Connection Error: ${e}`);
  }
};
const defaultInstance = connection;

module.exports = {
  open,
  defaultInstance
};
