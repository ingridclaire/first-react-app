const express = require('express');
const server = express();
const port = 8080;

server.use(express.json());
let id = 0;
let todos = [];
// for testing
// let todos = [{ id: 1, description: 'test', done: false, critical: false }];

function postTodos(request) {
  id += 1;
  const newTodo = {id: id, ...request.body};
  todos = [...todos, newTodo];
  return {newId: id};
}

function deleteTodos(request) {
  const todoId = parseInt(request.params.id);
  todos = todos.filter((todo) => todo.id !== todoId);
  // return {}; // I would have thought this was needed for
  // the json packing but that does not seem to be the case.
}

function putTodos(request) {
  const todoId = parseInt(request.params.id);
  for (let todo of todos) {
    if (todo.id === todoId) {
      todo[request.body.toUpdate] = !todo[request.body.toUpdate];
      break;
    }
  }
}

// api routes
server.get('/api/todos', (_, res) => res.json({todos: todos}));
server.post('/api/todos', (req, res) => res.json(postTodos(req)));
server.delete('/api/todos/:id', (req, res) => res.json(deleteTodos(req)));
server.put('/api/todos/:id', (req, res) => res.json(putTodos(req)));

// listen for connections
server.listen(port, () => 
  console.log(`Simulated backend listening on port ${port}!`)
);