import { useState, useEffect } from "react";
import "./Auth.css";

function Auth({ setUser }) {
  const [authForm, setAuthForm] = useState({
    username: "",
    password: "",
  });

  const [error, setError] = useState("");

  function handleChange(e) {
    setAuthForm((authForm) => ({
      ...authForm,
      [e.target.name]: e.target.value,
    }));
  }

  async function handleClick(e) {
    let url = "/api/users";

    if (e.target.innerText === "Login") {
      url = `${url}/login`;
    } else {
      url = `${url}/signup`;
    }

    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(authForm),
    });

    if (!res.ok) return setError("Invalid password");

    const user = await res.json();

    setUser(user);
  }

  return (
    <>
      <div className="Auth">
        <div>
          <label>Username</label>
          <input
            type="text"
            name="username"
            value={authForm.username}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={authForm.password}
            onChange={handleChange}
          />
        </div>
        <div className="btn-wrapper">
          <button onClick={handleClick}>Login</button>
          <button onClick={handleClick}>Sign Up</button>
        </div>
      </div>
    </>
  );
}

export default Auth;
