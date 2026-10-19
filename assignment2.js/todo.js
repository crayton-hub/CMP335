const Joi = require('joi');
const express = require('express');
const app = express();

app.use(express.json());

const todoA = [
    { id: 1, description: 'Math homework', completed: false, due: 'M 10/17/26',  },
    { id: 2, description: 'Clean Room', completed: false, due: 'T 10/18/26',  },
    { id: 3, description: 'Shoot Basketball', completed: false, due: 'W 10/19/26',  }
];

app.get('/', (req, res) => {
  res.send(todoA);
});

app.get('/api/todos', (req, res) => {
    res.send(todoA);
});


app.post('/api/todos', (req, res) => {

    const todo = {
        id: todoA.length + 1,
        description: req.body.description,
        completed: false,
        length: req.body.length,
        due: req.body.due,
    };
    todoA.push(todo);
    res.send(todo);
});

app.put('/api/todos/:id', (req, res) => {
    const todo = todoA.find(c => c.id === parseInt(req.params.id));
    if (!todo) return res.status(404).send('todo not found');
    
    const { error } = validatetodo(req.body);
    if (error)  return res.status(400).send(error.details[0].message);

    todo.length = req.body.length;
    todo.due = req.body.due;
    res.send(todo);

});

app.delete('/api/todos/:id', (req, res) => {
    const todo = todoA.find(c => c.id === parseInt(req.params.id));
    if (!todo) return res.status(404).send('todo not found');

    const index = todoA.indexOf(todo);
    todoA.splice(index, 1);
    res.send(todo);
});


function validatetodo(todo) {
    const schema = {
        name: Joi.string().min(3).required()
    };
    return Joi.validate(todo, schema);
}



app.get('/api/todos/:id', (req, res) => {
    const todo = todoA.find(c => c.id === parseInt(req.params.id));
    if (!todo) return res.status(404).send('todo not found');
    res.send(todo);
});

//PORT 
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
