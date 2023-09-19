const express = require('express');
const path = require('path');
const notes = require('./routes/notes');

const PORT = process.env.PORT || 3001;

const app=express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use('/notes', notes);

app.use(express.static('public'));

app.get('/', (req, res) =>
    res.sendFile(path.join(__dirname, 'public/assets/index.html'))
);

app.get('*', (req,res) =>
    res.sendFile(path.join(__dirname, 'public/assets/index.html')) 
);

app.listen(PORT, () =>
console.log(`App listening at http://localhost:${PORT}`)
);