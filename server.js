require('dotenv').config({ path: `${__dirname}/.env` });
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const mongo = require('db/utils/connection');
const handleAPIRequest = require('middlewares/handleAPIRequest');
const handleNotFoundRequest = require('middlewares/handleNotFoundRequest');

// ----- Routes
const routes = [
  'auth',
  'category',
  'events',
  'users'
];

// ----- Express App configuration
const app = express();
const port = process.env.PORT || 3003;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(morgan('common'));
app.use(cors());

routes.forEach((endpoint) => app.use(require(`routes/${endpoint}`)));
app.use(handleAPIRequest);
app.use(handleNotFoundRequest);

// ----- Run
(async () => {
  try {
    await mongo.open();
    app.listen(port, () => console.log(`Server is running on port ${port}`));
  } catch (error) { console.log(error); }
})();
