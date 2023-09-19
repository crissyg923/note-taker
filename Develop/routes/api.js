const api=require('express').Router();
const{nanoid}=require('nanoid');
const fs=require('fs');

api.get('/', (req,res) => {
    fs.readFile('./db/notes.json', 'utf-8', (error,data) =>
    error ? console.error(error) : res.json(JSON.parse(data)));
});