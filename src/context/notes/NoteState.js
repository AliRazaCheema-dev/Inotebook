
import NoteContext from "./noteContext";
import { useState } from "react";
const NoteState = (props)=>{
  const host = "http://localhost:5000";
    // const s1 = {
    //     "name":"Ali",
    //     "class":"Engineering"
    // }
    // const [state1, setstate1] = useState(s1)
    // const update= ()=>{
    //     setTimeout(() => {
    //         setstate1({
    //             "name":"Jutt",
    //     "class":"Developer"
    //         })
    //     }, 1000);
    // }
    const InitialNotes =[]
      const [notes, setnotes] = useState(InitialNotes);
       //Get a note

     
       const getNote = async () => {
        const token = localStorage.getItem('token');
    
        if (!token) {
            console.error("No token found. Unable to fetch notes.");
            return;
        }
    
        const response = await fetch(`${host}/api/notes/fetchallnotes`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "auth-token": token
            },
        });
    
        if (!response.ok) {
            console.error('API Status:', response.status);
            console.error('Server Error:', response.statusText);
            return;
        }
    
        const json = await response.json();
        setnotes(json);
    }
      //Add a note


      const addNote = async (title, description, tag)=>{
        //Api Call
        const response = await fetch(`${host}/api/notes/addnotes`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem('token')
          },
          body: JSON.stringify({title, description, tag}),
        });
        if (!response.ok) {
          console.error('Server Error:', response.statusText);
          return;
        }
       const note =await response.json();
        setnotes(notes.concat(note));
       
      }
      //Delete a note


      const deleteNote = async (id)=>{
        console.log("Deleting a note with this id" + id)
        const newNote = notes.filter((note)=>{return note._id !== id});
        setnotes(newNote);
        const response = await fetch(`${host}/api/notes/deletenotes/${id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem('token')
          },
        });
        const json=await response.json();
        console.log(json);
      }
      //Edit a note


      const editNote = async (id, title, description, tag)=>{
        //Api Call
        const response = await fetch(`${host}/api/notes/updatenotes/${id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem('token')
          },
          body: JSON.stringify({title, description, tag}),
        });
        const json=await response.json();
        console.log(json);
        let newNote = JSON.parse(JSON.stringify(notes))
        //Logic to edit in client side note
        for (let index = 0; index < notes.length; index++) {
          const element = newNote[index];
          if(element._id === id){
            newNote[index].title = title;
            newNote[index].description = description;
            newNote[index].tag = tag;
            break;
          }
        }
        setnotes(newNote);
      }

return(
           <NoteContext.Provider value={{notes, addNote, deleteNote, editNote, getNote}}>
            {props.children}
           </NoteContext.Provider>

)
}
export default NoteState;


