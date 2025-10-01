import Navbar from "./component/Navbar";
import Footer from "./component/Footer";
import Home from "./pages/Home";
import CreateNote from "./pages/CreateNote";
import { Route,Routes } from "react-router-dom";

const App = () => {
  return (
    <div>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create-note" element={<CreateNote/>} />
    
      </Routes>

      <Footer />
    </div>
  );
};

export default App;
