import { useState, useEffect, createContext } from "react";
import toast from "react-hot-toast";

import BACKEND_URL from "../api/url";

export const NoteContext = createContext();

export const NoteProvider = ({ children }) => {
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
    const res = await BACKEND_URL.post("/create-note", note);
    setNotes([res.data, ...notes]);
  };

  //update a note
  const updateNote = async (id, updatedNote) => {
    const oldNote = notes.find((note) => note._id === id);

    // Check if nothing changed
    if (
      oldNote.title === updatedNote.title &&
      oldNote.content === updatedNote.content
    ) {
      toast("No changes detected.");
      return;
    }

    try {
      const res = await BACKEND_URL.patch(`/update-note/${id}`, updatedNote);
      setNotes(notes.map((note) => (note._id === id ? res.data : note)));
      toast.success("Note updated successfully!");
    } catch (error) {
      console.error("Error updating note:", error);
      toast.error("Failed to update note!");
    }
  };

  // delete a note
  const deleteNote = async (id) => {
    await BACKEND_URL.delete(`/delete-note/${id}`);
    setNotes(notes.filter((note) => note._id != id));
    toast.success("Note deleted successfully!");
  };

  return (
    <NoteContext.Provider
      value={{ notes, loading, createNote, updateNote, deleteNote }}
    >
      {children}
    </NoteContext.Provider>
  );
};
