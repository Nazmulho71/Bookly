import React, { useState } from "react";
import axios from "axios";
import "../assets/css/login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");

  let baseUrl = "http://localhost:3000/api";

  const handleSubmit = (e) => {
    e.preventDefault();

    let data = JSON.stringify({ email, password });
    let config = {
      method: "post",
      url: `${baseUrl}/auth`,
      headers: { "Content-Type": "application/json" },
      data: data,
    };

    axios(config)
      .then(function (res) {
        setErr("");
        document.cookie = "token=" + res.data;
        window.location.href = "/";
      })
      .catch(function (err) {
        setErr(err.response.data);
      });
  };

  return (
    <div className="login">
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          value={email}
          placeholder="Enter your email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          value={password}
          placeholder="Enter your Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit">Login</button>

        <p>{err}</p>
      </form>
    </div>
  );
}

export default Login;
