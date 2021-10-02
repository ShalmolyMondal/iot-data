'use strict';

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv/config');

// Import routes
const apiRoutes = require('./api');

const app = express();
const PORT = 8080;
const HOST = '0.0.0.0';

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Connect to DB
// 'mongodb://<db_user>:<password>@mongodb:27017/admin'
mongoose.connect(
  process.env.DB_CONNECTION_URL,
  { useNewUrlParser: true }
)

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'CONNECTION ERROR'));
db.once('open', () => {
  // connected
  console.log("Connected too DB");
})

app.use(apiRoutes);

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);