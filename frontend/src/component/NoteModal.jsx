// src/component/NoteModal.jsx
import React, { useState } from "react";

const NoteModal = ({ note, onClose }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(note.content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); // reset after 2s
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative bg-gray-800 text-white rounded-lg shadow-2xl max-w-xl w-full px-5 py-3  bottom-2"
      >
        {/* Title + Close */}
        <div className="flex items-center justify-between mb-2 pl-4">
          <h2 className="text-lg font-semibold truncate">{note.title}</h2>
          <button
            onClick={onClose}
            className="text-gray-300 hover:text-white text-xl leading-none"
          >
            ×
          </button>
        </div>

        {/* Scrollable Content Box with fixed Copy Button */}
        <div className="relative bg-gray-900 rounded-lg p-3 max-h-80 overflow-y-auto">
          {/* Copy Button (fixed inside top-right corner) */}
          <div className="sticky top-2 right-2 flex justify-end">
            <button
              onClick={handleCopy}
              className={`flex items-center gap-1 px-2 py-1 rounded-md text-xs transition ${
                copied
                  ? "bg-gray-600 text-white"
                  : "bg-gray-800 hover:bg-gray-600"
              }`}
            >
              <img src="/copy.svg" alt="copy" className="w-4 h-4 invert" />
              {copied ? "Copied" : "Copy"}
            </button>
          </div>

          <pre className="whitespace-pre-wrap text-sm leading-relaxed font-sans ">
            {note.content}
          </pre>
        </div>

        {/* Footer */}
        <div className="mt-3 text-xs text-gray-400 border-t border-gray-700 pt-2">
          Created:{" "}
          {new Date(note.createdAt).toLocaleDateString("en-GB", {
            day: "numeric",
            month: "short",
            year: "numeric",
          })}
        </div>
      </div>
    </div>
  );
};

export default NoteModal;
