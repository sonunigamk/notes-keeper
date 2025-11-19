import { Link, useLocation } from "react-router-dom";
import { useContext } from "react"; 
import { AuthContext } from "../context/AuthContext"; 

function Navbar() {
  const location = useLocation();
  const { user, logout } = useContext(AuthContext); 

  return (
    <nav className="bg-gray-900 text-white py-5 px-6 m-auto shadow-lg sticky top-0 z-50 w-[100%] md:w-[84%] ">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="flex items-center gap-1">
          <img src="/note-icon.png" alt="NoteKeeper Logo" className="w-6" />
          <span className="text-xl md:text-2xl text-blue-400 tracking-wide font-semibold">
            NoteKeeper
          </span>
        </Link>

        <div className="space-x-6 flex items-center">
          {/* Show these links ONLY if user is logged in */}
          {user ? (
            <>
              <Link to="/" className="hover:text-blue-400 transition">Home</Link>
              <Link to="/create" className="hover:text-blue-400 transition">Create Note</Link>
              <button
                onClick={logout}
                className="bg-red-500 px-3 py-1 rounded hover:bg-red-600 transition text-sm"
              >
                Logout
              </button>
            </>
          ) : (
            // Show these if user is NOT logged in
            <>
              <Link to="/login" className="hover:text-blue-400 transition">Login</Link>
              <Link to="/register" className="bg-blue-600 px-3 py-1 rounded hover:bg-blue-700 transition text-sm">Register</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;