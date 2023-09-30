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
    const { title, text} = req.body;

    if (req.body) {
        const newNote = {
            title,
            text,
            id: uuidv4(),
        };
       fs.readFile('./db/notes.json', 'utf-8', (error, data) => {
            if(error) {
                console.error('Error in adding note');
                return res.status('Error reading notes from json file.')
            } else {
       const noteData=JSON.parse(data);
       noteData.push(newNote);
       fs.writeFile('./db/notes.json', JSON.stringify(noteData), (err) => {
       if (err) {
         console.error(err);
         return res.status(500).send('Error displaying notes.')
       } else {
            res.json(noteData)
            console.log('Successfully added note!');
       } 
    });
}
});
}
});

api.delete('/notes/:id', (req, res) => {
    console.log(req.params.id);
    var requestedNote=req.params.id;
    
    fs.readFile('./db/notes.json', 'utf-8', (error, data) => {
        if (error) {
            console.log('Error reading notes.');
            return res.status(500).send('Error reading notes.')
        }
        const parsedData=JSON.parse(data);
        console.log(parsedData[3].id);
        const noteToRemove = parsedData.findIndex(note => note.id===requestedNote);
        parsedData.splice(noteToRemove, 1);
        
    fs.writeFile('./db/notes.json', JSON.stringify(parsedData), (err) => {
        if (err) {
              console.error(err);
              return res.status(500).send('Error displaying notes.')
        } else {
                 res.json(parsedData)
                 console.log('Successfully deleted note!');
               } 
    })
})
});
    

module.exports = api;