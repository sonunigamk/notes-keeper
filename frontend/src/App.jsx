import Navbar from "./component/Navbar";
// import Footer from "./component/Footer"; // Uncomment if you have it
import Home from "./pages/Home";
import CreateNote from "./pages/CreateNote";
import Login from "./pages/Login"; // Import Login
import Register from "./pages/Register"; // Import Register
import { Route, Routes, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { NoteProvider } from "./context/NoteContext";
import { AuthProvider, AuthContext } from "./context/AuthContext"; // Import Auth
import { useContext } from "react";

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  if (loading) return <div>Loading...</div>;
  if (!user) return <Navigate to="/login" />;
  return children;
};

const App = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-white">
      <AuthProvider>
        <NoteProvider>
          <Toaster position="top-center" reverseOrder={false} />
          <Navbar />
          <main className="flex-1 container mx-auto p-4">
            <Routes>
              {/* Public Routes */}
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />

              {/* Protected Routes */}
              <Route
                path="/"
                element={
                  <ProtectedRoute>
                    <Home />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/create"
                element={
                  <ProtectedRoute>
                    <CreateNote />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </main>
          {/* <Footer /> */}
        </NoteProvider>
      </AuthProvider>
    </div>
  );
};

export default App;