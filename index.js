'use strict';
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const routerSessions = require('./routers/sessions');

const {PORT, CLIENT_ORIGIN, DATABASE_URL} = require('./config');
const {dbConnect} = require('./db-mongoose');
// const mongoose = require('mongoose');
// const {dbConnect} = require('./db-knex');
const app = express();
app.use(bodyParser.json());

console.log('client origin:', CLIENT_ORIGIN);
app.use(
  morgan(process.env.NODE_ENV === 'production' ? 'common' : 'dev', {
    skip: (req, res) => process.env.NODE_ENV === 'test'
  })
);

app.use(
  cors({
    origin: CLIENT_ORIGIN
  })
);

app.use('/sessions', routerSessions);




function runServer(port = PORT) {
  const server = app
    .listen(port, () => {
      console.info(`App listening on port ${server.address().port}`);
    })
    .on('error', err => {
      console.error('Express failed to start');
      console.error(err);
    });
}


if (require.main === module) {
  dbConnect();
  runServer();
}

module.exports = {app};
