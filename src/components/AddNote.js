
import React, { useState,  useContext } from 'react'
import NoteContext from '../context/notes/noteContext'
function AddNote(props) {
    const context= useContext(NoteContext);
  const {addNote} = context;
    const [note, setNote] = useState({title:"", description: "", tag:""})
    const handleClick = (e)=>{
        e.preventDefault();
        addNote(note.title, note.description, note.tag);
        setNote({title:"", description: "", tag:""})
        props.showAlert("success","Notes have been added Sucessfully")
    }
    const onChange = (e)=>{
        setNote({...note, [e.target.name]:e.target.value})
    }
  return (
    <div>
        <h4 className="my-2 mx-5">Add Note</h4>
      <form className="mx-5 my-2">
        <div className="mb-3">
          <label htmlFor="title" className="form-label">Title</label>
          <input type="text" className="form-control" id="title" name='title' aria-describedby="emailHelp" minLength={5} value={note.title} required onChange={onChange}/>
          
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">Description</label>
          <input type="text" className="form-control" id="description" name='description' minLength={5} value={note.description} required onChange={onChange}/>
        </div>
        <div className="mb-3">
          <label htmlFor="tag" className="form-label">Tag</label>
          <input type="text" className="form-control" id="tag" name='tag'  value={note.tag} onChange={onChange}/>
        </div>
        <button disabled={note.title.length<5 || note.description.length < 5} type="submit" className="btn btn-primary" onClick={handleClick}>Add Note</button>
      </form>
    </div>
  )
}

export default AddNote