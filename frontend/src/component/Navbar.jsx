import { Link, useLocation } from "react-router-dom";

function Navbar() {
  const location = useLocation();

  return (
    <nav className="bg-gray-900 text-white py-3 px-6 m-auto shadow-lg sticky top-0 z-50 w-[100%] md:w-[84%] ">
      <div className="container mx-auto flex justify-between items-center p-">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-1">
          <img src="/note-icon.png" alt="NoteKeeper Logo" className="w-6" />
          <span className="text-xl md:text-2xl text-blue-400 tracking-wide font-semibold">
            NoteKeeper
          </span>
        </Link>

        {/* Links */}
        <div className="space-x-6">
          <Link
            to="/"
            className={`hover:text-blue-400 transition ${
              location.pathname === "/"
                ? "text-blue-400 font-semibold"
                : "text-gray-300"
            }`}
          >
            Home
          </Link>
          <Link
            to="/create"
            className={`hover:text-blue-400 transition ${
              location.pathname === "/create"
                ? "text-blue-400 font-semibold"
                : "text-gray-300"
            }`}
          >
            Create Note
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
