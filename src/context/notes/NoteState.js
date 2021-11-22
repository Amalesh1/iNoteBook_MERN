import NoteContext from "./noteContex";
import { useState } from "react";

const NoteState = (props) => {
  const host = 'http://localhost:5000'
  const notesInitial = []
  const [notes, setNotes] = useState(notesInitial)

  //Get all notes
  const getNote = async () => {
    // To-do API
    const response = await fetch(`${host}/api/notes/fetchnotes`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjE2ZWU5YjMwYjlkMDM1NzQwMTNhNjlkIn0sImlhdCI6MTYzNDY1ODg0MH0.eKfOXmNHXbdVj5VQ0mLBPzei-hE-32LSMpQSDAOMr_Y'

      },
    });
    const json = await (response.json());
    setNotes(json);
    console.log(json);
  }

  // Add a Note
  const addNote = async (title, description, tag) => {
    // To-do API
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjE2ZWU5YjMwYjlkMDM1NzQwMTNhNjlkIn0sImlhdCI6MTYzNjI5MDU5MH0.FIxexzBwnNje1s0JSg-JOEag3-9W7UwHqhXCx8GzDO4'

      },

      body: JSON.stringify(title, description, tag)
    });
    const json = response.json();

    console.log("Adding a new note");
    const note = {
      "_id": "616eef7b8b969a624267abd623",
      "user": "616ee9b30b9d03574013a69d",
      "title": title,
      "description": description,
      "tag": tag,
      "date": "2021-10-19T16:16:59.794Z",
      "__v": 0
    }
    setNotes(notes.concat(note))
  }

  //Delete a Note
  const deleteNote = (id) => {
    console.log("Deleting a note with id " + id)
    const newNotes = notes.filter((note) => { return note._id !== id })
    setNotes(newNotes)
  }

  // Edit a Note

  const editNote = async (id, title, description, tag) => {
    // API call

    const response = await fetch(`${host}api/notes/updatenote/${id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjE2ZWU5YjMwYjlkMDM1NzQwMTNhNjlkIn0sImlhdCI6MTYzNjI5MDU5MH0.FIxexzBwnNje1s0JSg-JOEag3-9W7UwHqhXCx8GzDO4'

      },

      body: JSON.stringify(title, description, tag)
    });
    const json = response.json();
    //Logic to edit a note

    for (let index = 0; index < notes.length; index++) {
      const element = notes[index];
      if (element.id === id) {
        element.title = title;
        element.description = description
        element.tag = tag
      }

    }
  }

  return (
    <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNote }}>
      {props.children}
    </NoteContext.Provider>
  )
}

export default NoteState;