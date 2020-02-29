/* eslint-disable no-console */
const mongoose = require('mongoose');
const chalk = require('chalk');
const configs = require('configs/index');

mongoose.Promise = global.Promise;

const { connection } = mongoose;
const logs = {
  connected: chalk.bold.cyan,
  error: chalk.bold.yellow,
  disconnected: chalk.bold.red,
  reconnected: chalk.bold.blue,
  terminated: chalk.bold.magenta,
};

connection.on('connected', () => {
  console.log(logs.connected(`Connected, default connection is open to: ${configs.DB_URL}`));
});

connection.on('error', (err) => {
  console.log(logs.error(`Error, default connection has occured ${err} erorr`));
});

connection.on('disconnected', () => {
  console.log(logs.disconnected('Disconnected'));
});

connection.on('reconnected', () => {
  console.log(logs.reconnected(`Reconnected, default connection is re-open to: ${configs.DB_URL}`));
});

process.on('SIGINT', () => {
  connection.close(() => {
    console.log(logs.terminated('Terminated, default connection is disconnected due to application termination'));
    process.exit(0);
  });
});

const open = () => mongoose.connect(configs.DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  auth: {
    user: configs.DB_USER,
    password: configs.DB_PWD,
  }
});
const defaultInstance = connection;

module.exports = {
  open,
  defaultInstance,
};
