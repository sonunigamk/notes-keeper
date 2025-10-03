import { useState } from "react";
import { createContext } from "react";
import BACKEND_URL from "../api/url";
import { useEffect } from "react";

export const NoteContext = createContext();

export const NoteProvider = ({ Children }) => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  //feth all notes
  const getNotes = async () => {
    setLoading(true);
    try {
      const response = await BACKEND_URL.get("/get-notes");
      setNotes(response.data);
    } catch (error) {
      console.error("Error fetching notes", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getNotes();
  }, []);

  //create a note
  const createNote = async (note) => {
    const res = await BACKEND_URL.post("create-note", note);
    setNotes([res.data, ...notes]);
  };

  //update a note
  const updateNote = async (id, note) => {
    const res = await BACKEND_URL.patch(`/update-note/${id}`, updateNote);
    setNotes(notes.map((note) => (note._id ? res.data : note)));
  };

  // delete a note
  const deleteNote = async (id) => {
    await BACKEND_URL.delete(`/delete-note/${id}`);
    setNotes(notes.filter((note) => note._id != id));
  };

  return (
    <NoteContext.Provider
      value={{ notes, loading, createNote, updateNote, deleteNote }}
    >
      {Children}
    </NoteContext.Provider>
  );
};
