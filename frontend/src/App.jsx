import Navbar from "./component/Navbar";
import Footer from "./component/Footer";
import Home from "./pages/Home";
import CreateNote from "./pages/CreateNote";
import { Route, Routes } from "react-router-dom";

import { Toaster } from "react-hot-toast";

const App = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-white ">
      <Navbar />

      <main className="flex-1 container mx-auto p-4  md:w-[90%]">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create" element={<CreateNote />} />
        </Routes>
      </main>

      <Footer />

      {/* for toast */}
      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
};

export default App;
