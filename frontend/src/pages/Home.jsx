import React, { useContext } from "react";
import { NoteContext } from "../context/NoteContext";
import NoteCard from "../component/NoteCard";

const Home = () => {
  const { notes, loading } = useContext(NoteContext);


  if (loading) {
    return (
      <div className=" flex justify-center items-center min-h-screen">
        <p className="text-lg text-gray-600">Loading...!</p>
      </div>
    );
  }

  if (notes.length === 0) {
    return (
      <div className=" flex justify-center items-center min-h-screen">
        <p className="text-lg text-gray-700">No notes available.</p>
      </div>
    );
  }

  return (
    <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4"> 
      {notes.map((note) => {
      return <NoteCard key={note.id} note={note} />;
      })}
    </div>
  );
};

export default Home;
