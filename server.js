const express = require('express');
const path = require('path');
const fs = require('fs');
const uuid = require('uuid');
const PORT = 3001;



//Create an insistant for the app object 
const app = express();



//  !Middleware!
//  Sets up the Express app to handle data parsing 
// Allows us to access the files in the public folder 
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(express.static('public'));



// HTML Routes //

//Routes it to the index.html instead of giving an error
app.get('/', (req, res) =>{
    res.sendFile(path.join(__dirname, '/public/index.html'));
});
//Route for note.html
app.get('/notes', (req, res) =>{
    res.sendFile(path.join(__dirname, '/public/notes.html'));
});
    


// API routes // 

//Gets notes saved and joined in the db.json file 
app.get('/api/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '/db/db.json'))
});
//Post method to add new notes to db.json file
app.post('/api/notes', (req, res) => {
    const notes = JSON.parse(fs.readFileSync('./db/db.json'));
    const newNotes = req.body;
    newNotes.id = uuid.v4();
    notes.push(newNotes);
    fs.writeFileSync("./db/db.json", JSON.stringify(notes))
    res.json(notes);

});




// Listening PORT
//Queried PORT instead of hard coding it
app.listen(PORT, ()=> {
    console.log(`App is listening at http://localhost:${PORT}`)
})