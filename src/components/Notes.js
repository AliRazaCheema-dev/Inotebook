import React, { useState,useContext, useEffect, useRef } from 'react'
import NoteContext from '../context/notes/noteContext'
import Noteitem from './Noteitem';
import AddNote from './AddNote';
import { useNavigate } from 'react-router-dom';

function Notes(props) {
  let navigate = useNavigate();
  const context = useContext(NoteContext);
  const { notes, getNote, editNote } = context;
  useEffect(() => {
    if(localStorage.getItem('token')){
    getNote();}
    else{
      props.showAlert("danger", "Please login first")
      navigate('/login')
    }
    // eslint-disable-next-line 
  }, [])

  const ref = useRef(null);
  const closeRef = useRef(null);
   const [note, setNote] = useState({id:"",etitle:"", edescription: "", etag:""})
  const updateNote = (curretNote) => {
    ref.current.click();
    setNote({id:curretNote._id, etitle:curretNote.title, edescription:curretNote.description, etag:curretNote.tag});
   
  }

 
  const handleClick = (e)=>{
    closeRef.current.click();
    editNote(note.id, note.etitle, note.edescription, note.etag)
     props.showAlert("success","Notes have been updated Sucessfully")
    
}

const onChange = (e)=>{
    setNote({...note, [e.target.name]:e.target.value})
}

  return (
    <>
      <AddNote showAlert={props.showAlert}/>
      <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
        Launch demo modal
      </button>

      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form className="mx-5 my-2">
                <div className="mb-3">
                  <label htmlFor="etitle" className="form-label">Title</label>
                  <input type="text" className="form-control" id="etitle" name='etitle' aria-describedby="emailHelp" value={note.etitle} minLength={5} required onChange={onChange} />

                </div>
                <div className="mb-3">
                  <label htmlFor="description" className="form-label">Description</label>
                  <input type="text" className="form-control" id="edescription" name='edescription' value={note.edescription} minLength={5} required  onChange={onChange} />
                </div>
                <div className="mb-3">
                  <label htmlFor="tag" className="form-label">Tag</label>
                  <input type="text" className="form-control" id="etag" name='etag' value={note.etag}  onChange={onChange} />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button ref={closeRef}type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button disabled={note.etitle.length<5 || note.edescription.length < 5}  onClick={handleClick} type="button" className="btn btn-primary">Update Note</button>
            </div>
          </div>
        </div>
      </div>
      <div className=" my-2 mx-5 row">
        <h4 >Your Notes</h4>
        <div className="container">
        {(notes.length === 0 && "No note to display this time")}
        </div>
        {notes.map(
          (note) => {
            return <Noteitem key={note._id} updateNote={updateNote} note={note} showAlert={props.showAlert}/>
          }
        )}
      </div>
    </>
  )
}

export default Notes