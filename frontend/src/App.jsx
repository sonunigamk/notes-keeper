import Navbar from "./component/Navbar";
import Home from "./pages/Home";
import CreateNote from "./pages/CreateNote";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { Route, Routes, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { NoteProvider } from "./context/NoteContext";
import { AuthProvider, AuthContext } from "./context/AuthContext";
import { useContext } from "react";

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  if (loading) return <div className="text-white text-center mt-10">Loading...</div>;
  if (!user) return <Navigate to="/login" />;
  return children;
};

const App = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-white">
      {/* AuthProvider must wrap everything else */}
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
        </NoteProvider>
      </AuthProvider>
    </div>
  );
};

export default App;