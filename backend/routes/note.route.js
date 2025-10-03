import exress from "express";
import {
  createNote,
  deleteNote,
  getNotes,
  updateNote,
} from "../controllers/note.controller.js";

const router = exress.Router();

router.post("/create-note", createNote);
router.get("/get-notes", getNotes);
router.patch("/update-note/:id", updateNote);
router.delete("/delete-note/:id", deleteNote);

export default router;
