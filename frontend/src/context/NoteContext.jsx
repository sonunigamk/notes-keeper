import { createContext, useEffect, useState } from "react";
import BACKEND_URL from "../api/url"; // Make sure this points to your updated axios instance
import { toast } from "react-hot-toast";

export const NoteContext = createContext();

export const NoteProvider = ({ children }) => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  // 1. Fetch all notes
  const getNotes = async () => {
    setLoading(true);
    try {
      // UPDATED PATH: Now uses /notes prefix
      const response = await BACKEND_URL.get("/notes/get-notes");
      setNotes(response.data || []);
    } catch (error) {
      // Don't show error toast if it's just a 401 (not logged in yet)
      if (error.response?.status !== 401) {
        console.error("Error fetching notes:", error.response?.data || error.message);
        toast.error("Failed to fetch notes");
      }
    } finally {
      setLoading(false);
    }
  };

  // Fetch notes when the provider mounts (or you can move this to Home.jsx)
  useEffect(() => {
    getNotes();
  }, []);

  // 2. Create a note
  const createNote = async (note) => {
    try {
      // UPDATED PATH: Now uses /notes prefix
      const res = await BACKEND_URL.post("/notes/create-note", note);
      setNotes([res.data, ...notes]);
      toast.success("Note created successfully!");
    } catch (error) {
      console.error("Create note error:", error.response?.data || error.message);
      toast.error("Failed to create note");
    }
  };

  // 3. Update a note
  const updateNote = async (id, updateData) => {
    try {
      const originalNote = notes.find((note) => note._id === id);

      // Check if no changes were made
      if (
        originalNote.title === updateData.title &&
        originalNote.content === updateData.content
      ) {
        toast("No changes made");
        return;
      }

      // UPDATED PATH: Now uses /notes prefix
      const res = await BACKEND_URL.put(`/notes/update-note/${id}`, updateData);

      setNotes(notes.map((note) => (note._id === id ? res.data : note)));
      toast.success("Note updated successfully!");
    } catch (error) {
      console.error("Update note error:", error.response?.data || error.message);
      toast.error("Failed to update note");
    }
  };

  // 4. Delete a note
  const deleteNote = async (id) => {
    try {
      // UPDATED PATH: Now uses /notes prefix
      await BACKEND_URL.delete(`/notes/delete-note/${id}`);

      setNotes(notes.filter((note) => note._id !== id));
      toast.success("Note deleted successfully!");
    } catch (error) {
      console.error("Delete note error:", error.response?.data || error.message);
      toast.error("Failed to delete note");
    }
  };

  return (
    <NoteContext.Provider
      value={{ notes, loading, createNote, updateNote, deleteNote, getNotes }}
    >
      {children}
    </NoteContext.Provider>
  );
};