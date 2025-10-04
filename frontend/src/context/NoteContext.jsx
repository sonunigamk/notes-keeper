import { createContext, useEffect, useState } from "react";
import BACKEND_URL from "../api/url";
import { toast } from "react-hot-toast";

export const NoteContext = createContext();

export const NoteProvider = ({ children }) => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch all notes
  const getNotes = async () => {
    setLoading(true);
    try {
      const response = await BACKEND_URL.get("/get-notes");
      setNotes(response.data || []);
    } catch (error) {
      console.error("Error fetching notes:", error.response?.data || error.message);
      toast.error("Failed to fetch notes");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getNotes();
  }, []);

  // Create a note
  const createNote = async (note) => {
    try {
      const res = await BACKEND_URL.post("/create-note", note);
      setNotes([res.data, ...notes]);
      toast.success("Note created successfully!");
    } catch (error) {
      console.error("Create note error:", error.response?.data || error.message);
      toast.error("Failed to create note");
    }
  };

  // Update a note
  const updateNote = async (id, updateData) => {
    try {
      const originalNote = notes.find((note) => note._id === id);

      // No changes made
      if (originalNote.title === updateData.title && originalNote.content === updateData.content) {
        toast("No changes made");
        return;
      }

      const res = await BACKEND_URL.put(`/update-note/${id}`, updateData);
      setNotes(notes.map((note) => (note._id === id ? res.data : note)));
      toast.success("Note updated successfully!");
    } catch (error) {
      console.error("Update note error:", error.response?.data || error.message);
      toast.error("Failed to update note");
    }
  };

  // Delete a note
  const deleteNote = async (id) => {
    try {
      await BACKEND_URL.delete(`/delete-note/${id}`);
      setNotes(notes.filter((note) => note._id !== id));
      toast.success("Note deleted successfully!");
    } catch (error) {
      console.error("Delete note error:", error.response?.data || error.message);
      toast.error("Failed to delete note");
    }
  };

  return (
    <NoteContext.Provider value={{ notes, loading, createNote, updateNote, deleteNote }}>
      {children}
    </NoteContext.Provider>
  );
};
