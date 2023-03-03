import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import io from "socket.io-client";
import "./Chat.css";

function Chat({ user, setUser }) {
  const [msg, setMsg] = useState("");
  const [chat, setChat] = useState([]);
  const navigate = useNavigate();
  const socketRef = useRef();

  useEffect(() => {
    if (!socketRef.current && user) {
      socketRef.current = io();
    }

    socketRef.current.on("update chat", (data) => {
      setChat((chat) => [...chat, data]);
    });

    return () => {
      socketRef.current.off("update chat");
      socketRef.current.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!user) navigate("/");
  }, [user]);

  function handleChange(e) {
    setMsg(e.target.value);
  }

  function handleClick() {
    socketRef.current.emit("new message", makeMsgData(msg));
    setChat((chat) => [...chat, makeMsgData(msg)]);
    setMsg("");
    //submit message
  }

  function makeMsgData(msg) {
    return {
      username: user.username,
      msg,
    };
  }

  function handleLogout() {
    setUser(null);
  }

  return (
    <>
      <div className="Chat">
        <button onClick={handleLogout}>Logout</button>
        <main>
          <ul>
            {chat.map((m, idx) => (
              <li key={m + idx}>
                {m.username}: {m.msg}
              </li>
            ))}
          </ul>
        </main>
        <div>
          <input type="text" name="msg" value={msg} onChange={handleChange} />
          <button onClick={handleClick}>Post</button>
        </div>
      </div>
    </>
  );
}

export default Chat;
