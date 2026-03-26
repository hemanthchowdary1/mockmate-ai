import { BrowserRouter, Routes, Route } from "react-router-dom";
import { InterviewProvider } from "./context/InterviewContext";
import { AuthProvider } from "./context/AuthContext";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Interview from "./pages/Interview";
import Results from "./pages/Results";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <AuthProvider>
      <InterviewProvider>
        <BrowserRouter>
          <div style={{ minHeight: "100vh", background: "#050508" }}>

            {/* Orb 1 */}
            <div style={{
              position: "fixed", borderRadius: "50%", pointerEvents: "none", zIndex: 0,
              width: "600px", height: "600px",
              background: "radial-gradient(circle, rgba(99,102,241,0.3) 0%, transparent 70%)",
              top: "-200px", right: "-150px", filter: "blur(80px)",
              animation: "float-1 12s ease-in-out infinite",
            }} />

            {/* Orb 2 */}
            <div style={{
              position: "fixed", borderRadius: "50%", pointerEvents: "none", zIndex: 0,
              width: "500px", height: "500px",
              background: "radial-gradient(circle, rgba(6,182,212,0.2) 0%, transparent 70%)",
              bottom: "-150px", left: "-100px", filter: "blur(80px)",
              animation: "float-2 15s ease-in-out infinite",
            }} />

            <Navbar />

            <div style={{ position: "relative", zIndex: 1, paddingTop: "72px" }}>
              <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
                <Route path="/interview" element={<ProtectedRoute><Interview /></ProtectedRoute>} />
                <Route path="/results" element={<ProtectedRoute><Results /></ProtectedRoute>} />
              </Routes>
            </div>

          </div>
        </BrowserRouter>
      </InterviewProvider>
    </AuthProvider>
  );
}

export default App;