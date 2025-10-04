import Navbar from "./component/Navbar";
import Footer from "./component/Footer";
import Home from "./pages/Home";
import CreateNote from "./pages/CreateNote";
import { Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";

const App = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-white">
      <Toaster position="top-center" reverseOrder={false} />

      <Navbar />

      <main className="flex-1 container mx-auto p-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create" element={<CreateNote />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
};

export default App;
