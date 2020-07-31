// Get dependencies
const express = require('express');
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const User = require('./server/models/user.model');

// Get our API routes
const api = require('./server/routes/api');

const app = express();
// mongoose.connect('mongodb://localhost/myappdatabase');
const connectionString = 'mongodb://41a61445ac2c6c3e9e6d928ea108b8ad:Rfc270787loL@9a.mongo.evennode.com:27017,9b.mongo.evennode.com:27017/41a61445ac2c6c3e9e6d928ea108b8ad?replicaSet=eu-9';
const options = { keepAlive: 1, useNewUrlParser: true, useUnifiedTopology: true, };
// const options = { server: { socketOptions: { keepAlive: 1 }, useNewUrlParser: true, } };
mongoose.connect(connectionString, options);
mongoose.set('useCreateIndex', true);

// Connected handler
mongoose.connection.on('connected', function (err) {
  console.log("Connected to DB using chain: " + connectionString);
});

// Error handler
mongoose.connection.on('error', function (err) {
  console.log(err);
});

// Reconnect when closed
mongoose.connection.on('disconnected', function () {
   self.connectToDatabase();
});

async function seedData() {
  const seedUsers = [
    { firstName: 'Default', lastName: 'Defaultson', email: 'def@somemail.com', role: 'ARTIST', },
    { firstName: 'Success', lastName: 'Doe', email: 'john@example.com', role: 'DESIGNER', },
    { firstName: 'Danger', lastName: 'Moe', email: 'mary@example.com', role: 'ART_MANAGER', },
    { firstName: 'Info', lastName: 'Dooley', email: 'july@example.com', role: 'DESIGNER', },
    { firstName: 'Warning', lastName: 'Refs', email: 'bo@example.com', role: 'ARTIST', },
    { firstName: 'Active', lastName: 'Activeson', email: 'act@example.com', role: 'DESIGNER', },
  ];
  const users = await User.find({});
  console.log(users, users.length);
  if (!!users && users.length === 0) {
    seedUsers.forEach(async (user) => {
      await new User(user).save();
    });
    console.log(await User.find({}));
  }
}

seedData();

// Parsers for POST data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Point static path to dist
app.use(express.static(path.join(__dirname, 'dist/mean-app')));

// Set our api routes
app.use('/api', api);

// Catch all other routes and return the index file
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/mean-app/index.html'));
});

/**
 * Get port from environment and store in Express.
 */
const port = process.env.PORT || '3000';
app.set('port', port);

/**
 * Create HTTP server.
 */
const server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(port, () => console.log(`API running on localhost:${port}`));
