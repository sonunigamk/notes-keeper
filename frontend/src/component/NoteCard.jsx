import React, { useContext, useEffect, useState } from "react";
import { NoteContext } from "../context/NoteContext";

function NoteCard({ note, onClick }) {
  const { deleteNote, updateNote } = useContext(NoteContext);
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({ title: note.title, content: note.content });

  useEffect(() => {
    setEditData({ title: note.title, content: note.content });
  }, [note]);

  const handleUpdate = () => {
    updateNote(note._id, editData);
    setIsEditing(false);
  };

  return (
    <>
      {/* Normal Note Card */}
      <div
        className={`bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-md hover:shadow-lg transition-all p-5 flex flex-col cursor-pointer`}
        onClick={() => !isEditing && onClick?.(note)}
      >
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">{note.title}</h2>
        <p className="text-gray-600 dark:text-gray-300 mt-2 flex-1 line-clamp-3">{note.content}</p>
        <div className="mt-4 flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
          <span>
            {new Date(note.createdAt).toLocaleDateString("en-GB", {
              day: "numeric",
              month: "short",
              year: "numeric",
            })}
          </span>
          <div className="flex gap-2">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsEditing(true);
              }}
              className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded-lg transition"
            >
              Edit
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                deleteNote(note._id);
              }}
              className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg transition"
            >
              Delete
            </button>
          </div>
        </div>
      </div>

      {/* Edit Form as Centered Modal */}
      {isEditing && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 p-2">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl p-6 w-full max-w-[45vw]">
            <input
              type="text"
              className="border rounded-lg px-3 py-2 w-full mb-3 focus:ring-2 focus:ring-blue-500 outline-none bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-lg font-semibold"
              value={editData.title}
              onChange={(e) => setEditData({ ...editData, title: e.target.value })}
            />
            <textarea
              className="border rounded-lg p-4 w-full mb-2 focus:ring-2 focus:ring-blue-500 outline-none bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-md"
              rows="8"
              value={editData.content}
              onChange={(e) => setEditData({ ...editData, content: e.target.value })}
            />
            <div className="flex gap-2 justify-end">
              <button
                onClick={handleUpdate}
                className="bg-green-500 hover:bg-green-600 text-white px-4 py-1 rounded-lg transition"
              >
                Save
              </button>
              <button
                onClick={() => setIsEditing(false)}
                className="bg-red-500 hover:bg-gray-500 text-white px-4 py-1 rounded-lg transition"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default NoteCard;
