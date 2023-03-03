import { useState, useEffect } from "react";
import "./App.css";
import Auth from "./components/Auth/Auth";
import Chat from "./components/Chat/Chat";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";

function App() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  let location = useLocation();

  useEffect(() => {
    if (user) {
      navigate("/chat");
    }
  }, [user]);

  return (
    <div className="App">
      {location.pathname === "/" ? (
        <h1>Welcome to ChatApp</h1>
      ) : (
        <h1>ChatApp</h1>
      )}

      <Routes>
        <Route path="/" element={<Auth setUser={setUser} />} />
        <Route path="/chat" element={<Chat user={user} setUser={setUser} />} />
      </Routes>
    </div>
  );
}

export default App;
