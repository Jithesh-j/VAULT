// src/App.jsx
import { useState } from "react";
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';

import Loginpage from "./Components/login/loginpage";
import Dashboard from "./Components/Homepage/Homepage";

// Simple Components for demo
const Documents = () => <h2>📂 Documents List</h2>;
const Chat = () => <h2>💬 AI Chat Interface</h2>;
const Settings = () => <h2>⚙️ User Settings</h2>;

function App() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate(); // Hook to move pages programmatically

  // Helper to handle login and move to dashboard
  const handleLogin = (userData) => {
    setUser(userData);
    navigate('/docs'); // Auto-redirect to docs after login
  };

  const handleLogout = () => {
    setUser(null);
    navigate('/login');
  };

  return (
    <Routes>
      
      {/* 1. PUBLIC ROUTE: Login */}
      <Route path="/login" element={
        !user ? <Loginpage onLoginSuccess={handleLogin} /> : <Navigate to="/docs" />
      } />

      {/* 2. PROTECTED ROUTES: Dashboard Layout */}
      {/* The Dashboard acts as a Wrapper around these children */}
      {user && (
        <Route path="/" element={<Dashboard user={user} onLogout={handleLogout} />}>
            
            {/* These render INSIDE the <Outlet /> of Dashboard */}
            <Route path="docs" element={<Documents />} />
            <Route path="chat" element={<Chat />} />
            <Route path="settings" element={<Settings />} />

            {/* Default redirect: If they go to localhost:5173/, send to docs */}
            <Route index element={<Navigate to="docs" />} />
            
        </Route>
      )}

      {/* 3. CATCH ALL: If not logged in, force to login */}
      <Route path="*" element={<Navigate to="/login" />} />

    </Routes>
  );
}

export default App;