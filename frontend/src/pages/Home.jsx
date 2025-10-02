import React, { useContext, useState } from "react";
import { NoteContext } from "../context/NoteContext";
import NoteCard from "../component/NoteCard";
import NoteModal from "../component/NoteModal";

const Home = () => {
  const { notes, loading } = useContext(NoteContext);
  const [selectedNote, setSelectedNote] = useState(null);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-lg text-gray-600">Loading...!</p>
      </div>
    );
  }

  if (!notes || notes.length === 0) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-lg text-gray-700">No notes available.</p>
      </div>
    );
  }

  return (
    <>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
        {notes.map((note) => (
          <NoteCard
            key={note._id}
            note={note}
            onClick={() => setSelectedNote(note)}
          />
        ))}
      </div>

      {selectedNote && (
        <NoteModal note={selectedNote} onClose={() => setSelectedNote(null)} />
      )}
    </>
  );
};

export default Home;
