import NoteContext from "./noteContex";
import { useState } from "react";

const NoteState = (props) => {
  const notesInitial = [
    {
      "_id": "616eef7b8b969a624267abd6",
      "user": "616ee9b30b9d03574013a69d",
      "title": "My title",
      "description": "wakeup early",
      "tag": "personal",
      "date": "2021-10-19T16:16:59.794Z",
      "__v": 0
    },
    {
      "_id": "616eef7b8b969a624267abd61",
      "user": "616ee9b30b9d03574013a69d",
      "title": "My title",
      "description": "wakeup early",
      "tag": "personal",
      "date": "2021-10-19T16:16:59.794Z",
      "__v": 0
    },
    {
      "_id": "616eef7b8b969a624267abd62",
      "user": "616ee9b30b9d03574013a69d",
      "title": "My title",
      "description": "wakeup early",
      "tag": "personal",
      "date": "2021-10-19T16:16:59.794Z",
      "__v": 0
    }
  ]
  const [notes, setNotes] = useState(notesInitial)

  // Add a Note
  const addNote = (title, description, tag) => {
    // To-do API
    console.log("Adding a new note");
    const note = {
      "_id": "616eef7b8b969a624267abd62",
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
  const deleteNote = () => {

  }

  // Edit a Note
  const editNote = () => {

  }

  return (
    <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote }}>
      {props.children}
    </NoteContext.Provider>
  )
}

export default NoteState;