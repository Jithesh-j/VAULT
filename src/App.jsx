import { useState } from "react";
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';

import Loginpage from "./Components/login/loginpage";
import Homepage from "./Components/Homepage/Homepage";

import Documents from "./Components/Documents/Documents";
import Chat from "./Components/AIChat/AIChat";
import Settings from "./Components/Settings/Settings";

function App() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const handleLogin = (userData) => {
    setUser(userData);
    navigate('/docs');
  };

  const handleLogout = () => {
    setUser(null);
    navigate('/login');
  };

  return (
    <Routes>

      {/* PUBLIC */}
      <Route
        path="/login"
        element={!user ? <Loginpage onLoginSuccess={handleLogin} /> : <Navigate to="/docs" />}
      />

      {/* PROTECTED LAYOUT */}
      {user && (
        <Route path="/" element={<Homepage user={user} onLogout={handleLogout} />}>
          <Route index element={<Navigate to="docs" />} />
          <Route path="docs" element={<Documents user={user} />} />
          <Route path="chat" element={<Chat />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      )}

      {/* FALLBACK */}
      <Route path="*" element={<Navigate to="/login" />} />

    </Routes>
  );
}

export default App;
