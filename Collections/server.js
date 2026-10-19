
const express = require('express');
const path = require('path');

const app = express();
const port = 3000;

app.use(express.json());

// Allow Live Server to communicate with this backend.
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        return res.sendStatus(204);
    }

    next();
});

// Serve the frontend.
app.use(express.static(path.join(__dirname, 'public')));

// Mock college football team collection.
let teams = [
    { id: 1, name: 'Nebraska', conference: 'Big Ten', wins: 7 },
    { id: 2, name: 'Alabama', conference: 'SEC', wins: 10 },
    { id: 3, name: 'Oklahoma', conference: 'SEC', wins: 8 }
];

let nextId = 4;

// GET: Retrieve all teams.
app.get('/api/teams', (req, res) => {
    res.json(teams);
});

// GET: Retrieve one team.
app.get('/api/teams/:id', (req, res) => {
    const team = teams.find(t => t.id === Number(req.params.id));

    if (!team) {
        return res.status(404).json({ message: 'Team not found' });
    }

    res.json(team);
});

// POST: Add a new team.
app.post('/api/teams', (req, res) => {
    const team = {
        id: nextId++,
        name: req.body.name,
        conference: req.body.conference,
        wins: Number(req.body.wins)
    };

    teams.push(team);
    res.status(201).json(team);
});

// PUT: Update an existing team.
app.put('/api/teams/:id', (req, res) => {
    const team = teams.find(t => t.id === Number(req.params.id));

    if (!team) {
        return res.status(404).json({ message: 'Team not found' });
    }
    team.name = req.body.name;
    team.conference = req.body.conference;
    team.wins = Number(req.body.wins);

    res.json(team);
});

// DELETE: Remove a team.
app.delete('/api/teams/:id', (req, res) => {
    teams = teams.filter(t => t.id !== Number(req.params.id));
    res.status(204).end();
});

app.listen(port, () => {
    console.log(`College Football Teams running at http://localhost:${port}`);
});
