import Note from "../models/note.model.js";

// Create a new note
export const createNote = async (req, res) => {
  try {
    const { title, content } = req.body;

    if (!title || !content) {
      return res.status(400).json({ message: "Title and Content are required" });
    }

    // Associate the note with the logged-in user
    const newNote = new Note({
      title,
      content,
      user: req.user._id, 
    });

    const savedNote = await newNote.save();
    res.status(201).json(savedNote);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all notes (Only for the logged-in user)
export const getNotes = async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.status(200).json(notes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a note
export const updateNote = async (req, res) => {
  try {
    const { title, content } = req.body;
    const note = await Note.findById(req.params.id);

    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }

    // Check if the logged-in user owns this note
    if (note.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: "Not authorized to update this note" });
    }

    const updatedNote = await Note.findByIdAndUpdate(
      req.params.id,
      { title, content },
      { new: true }
    );

    res.status(200).json(updatedNote);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a note
export const deleteNote = async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);

    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }

    // Check if the logged-in user owns this note
    if (note.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: "Not authorized to delete this note" });
    }

    await note.deleteOne();

    res.status(200).json({ message: "Note deleted successfully!" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};