var feathers = require('feathers');
var rest = require('feathers-rest');
var socketio = require('feathers-socketio');
var bodyParser = require('body-parser');
var app = feathers();

var todoService = {
  todos: [{
    text: 'Learn Feathers',
    complete: false
  }],
  find: function (params, callback) {
    callback(null, this.todos);
  },
  create: function (data, params, callback) {
    this.todos.push(data);
    // Call back with the Todo data
    callback(null, data);
  }
}

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