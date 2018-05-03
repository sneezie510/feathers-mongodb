var feathers = require('feathers');
var mongodb = require('feathers-mongodb');
var rest = require('feathers-rest');
var socketio = require('feathers-socketio');
var bodyParser = require('body-parser');

var app = feathers();
// On MongoDB use the `feathers-demo` database
// and the `todos` collection
var todoService = mongodb({
  db: 'feathers-demo',
  collection: 'todos'
});

// Configure REST and SocketIO endpointss
app.configure(rest());
app.configure(socketio());
// Parse JSON and form HTTP bodies
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// Use the Todo service object
app.use('/todos', todoService);

// Start the application on port 3030
app.listen(3030, () => console.log('Feathers mongodb started at http://localhost:3030'));