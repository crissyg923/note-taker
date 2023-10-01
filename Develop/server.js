// Imports necessary dependencies 
const express = require('express');
const path = require('path');
const api = require('./routes/api');

const PORT = process.env.PORT || 3001;

const app=express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use('/api', api);

app.use(express.static('public'));

// Route for homepage
app.get('/', (req, res) =>
    res.sendFile(path.join(__dirname, 'public/index.html'))
);

// Route for retrieving and displaying notes
app.get('/notes', (req,res) =>
    res.sendFile(path.join(__dirname, 'public/notes.html'))
)

// Route that leads to homepage for any undefined route
app.get('*', (req,res) =>
    res.sendFile(path.join(__dirname, 'public/index.html')) 
);

app.listen(PORT, () =>
console.log(`App listening at http://localhost:${PORT}`)
);