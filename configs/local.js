const { DB_USER, DB_PWD } = process.env;
const DB_URL = 'mongodb://127.0.0.1:27017/easy-event-v2';

const localConfig = {
  DB_URL,
  DB_USER,
  DB_PWD,
};

export default localConfig;
