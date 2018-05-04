const feathers = require('@feathersjs/feathers');
const express = require('@feathersjs/express');
const socketio = require('@feathersjs/socketio');

const MongoClient = require('mongodb').MongoClient;
const service = require('feathers-mongodb');

// Create an Express compatible Feathers application instance.
const app = express(feathers());
// Turn on JSON parser for REST services
app.use(express.json());
// Turn on URL-encoded parser for REST services
app.use(express.urlencoded({ extended: true }));
// Enable REST services
app.configure(express.rest());
// Enable Socket.io
app.configure(socketio());

// Connect to the db, create and register a Feathers service.
app.use('/messages', service({
  paginate: {
    default: 15,
    max: 25
  }
}));

// A basic error handler, just like Express
app.use(express.errorHandler());

// Connect to your MongoDB instance(s)
MongoClient.connect('mongodb://localhost:27017/feathers')
  .then(function (client) {
    // Set the model now that we are connected
    app.service('messages').Model = client.db('feathers').collection('messages');

    // Now that we are connected, create a dummy Message
    app.service('messages').create({
      text: 'Message created on server'
    }).then(message => console.log('Created message', message));
  }).catch(error => console.error(error));

// Start the server.
const port = 3030;

app.listen(port, () => {
  console.log(`Feathers server listening on port ${port}`);
});