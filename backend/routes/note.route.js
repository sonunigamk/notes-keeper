import express from "express"; // Fixed typo: exress -> express
import {
  createNote,
  deleteNote,
  getNotes,
  updateNote,
} from "../controllers/note.controller.js";

import { protect } from "../middleware/auth.middleware.js"; 

const router = express.Router();

// Add 'protect' as the second argument
router.post("/create-note", protect, createNote);
router.get("/get-notes", protect, getNotes);
router.put("/update-note/:id", protect, updateNote);
router.delete("/delete-note/:id", protect, deleteNote);

export default router;
