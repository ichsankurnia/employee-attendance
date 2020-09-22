if (process.env.NODE_ENV === 'development') {
  require('dotenv').config();
}

const express = require('express');
const cors = require('cors');
const moment = require('moment-timezone');
const app = express();
const routes = require('./routes');
const { errorHandler } = require('./middlewares');

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.setHeader('Access-Control-Allow-Methods', 'POST, GET, PATCH, DELETE, OPTIONS');
  next();
});
app.use(routes);
app.use(errorHandler);

moment.tz.setDefault("Asia/Jakarta");

// server.listen(PORT, () => {
//   console.log(`Server is running on ${process.env.BASE_URL}:${PORT}`);
// });


module.exports = app;
