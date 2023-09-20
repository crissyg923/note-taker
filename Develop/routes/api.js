const api=require('express').Router();
// import {nanoid} from 'nanoid';
const { v4: uuidv4 } = require('uuid');
const fs=require('fs');

api.get('/notes', (req,res) => {
    fs.readFile('./db/notes.json', 'utf-8', (error,data) =>
    error ? console.error(error) : res.json(JSON.parse(data)));
});

api.post('/notes', (req,res) => {
    console.log(req.body);
    const { noteTitle, noteText} = req.body;

    if (req.body) {
        const newNote = {
            noteTitle,
            noteText,
            note_id: uuidv4(),
        };
       fs.readFile('./db/notes.json', 'utf-8', (error, data) => {
            if(error) {
                console.error('Error in adding note');
            } else {
       const noteData=JSON.parse(data);
       noteData.push(newNote);
       fs.writeFile('./db/notes.json', JSON.stringify(noteData), (err) => {
       if (err) {
         console.error(err);
       } else {
         console.log('Successfully added note!');
       } 
    });
}
});
}
});
    

module.exports = api;