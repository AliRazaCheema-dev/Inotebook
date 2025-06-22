const express = require('express');
const router = express.Router();
const Note = require('../models/Notes');
const { body, validationResult } = require('express-validator');
var fetchuser = require('../middlewares/fetchuserid');

//Route-1 Get all the notes using Get /api/notes/fetchallnotes  login required
router.get('/fetchallnotes', fetchuser, async (req, res) => {
    try {
        const notes = await Note.find({ user: req.user.id });
        res.json(notes);
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ "message": "Some error occured" })
    }

})
//Route-2 Add new note using POST /api/notes/addnotes  login required
router.post('/addnotes', fetchuser, [

    body('title', 'please enter the title').isLength({ min: 3 }),
    body('description', 'Please enter min 5 characters description').isLength({ min: 5 }),

], async (req, res) => {
    const { title, description, tag } = req.body;
    //if there are errors, return the errors
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const note = new Note({
            title, description, tag, user: req.user.id
        })
        const savedNote = await note.save();
        res.json(savedNote);
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ "message": "Some error occured" })
    }

})
//Route-3 update existing notes using Put /api/notes/update  login required
router.put('/updatenotes/:id', fetchuser, [


], async (req, res) => {
    const { title, description, tag } = req.body;
   
    try {
         //Create a newNote
    const newNote = {};
    if (title){newNote.title = title};
    if (description){newNote.description = description};
    if (tag){newNote.tag = tag};
    //Find the note and update it
    let note =await Note.findById(req.params.id);
    if (!note){ return res.status(404).send("Not Found")}
    if(note.user.toString() !== req.user.id){return res.status(401).send("you are not authorized")}
    note = await Note.findByIdAndUpdate(req.params.id, {$set:newNote}, {new:true})
    res.json({note});
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ "message": "Some error occured" })
    }
})
//Route-4 update existing notes using Delete /api/notes/deletenotes  login required
router.delete('/deletenotes/:id', fetchuser, [


], async (req, res) => {
    const { title, description, tag } = req.body;
   
    try {
    //Find the note and delete it
    let note =await Note.findById(req.params.id);
    if (!note){ return res.status(404).send("Not Found")}
    if(note.user.toString() !== req.user.id){return res.status(401).send("you are not authorized")}
    note = await Note.findByIdAndDelete(req.params.id)
    res.json({"Success": "Note has been deleted", note});
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ "message": "Some error occured" })
    }
})
module.exports = router;