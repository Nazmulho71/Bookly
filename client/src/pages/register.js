import React, { useState } from "react";
import axios from "axios";
import "../assets/css/login.css";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");

  let baseUrl = "http://localhost:3000/api";

  const handleSubmit = (e) => {
    e.preventDefault();

    let data = JSON.stringify({ name, email, password });
    let config = {
      method: "post",
      url: `${baseUrl}/users`,
      headers: { "Content-Type": "application/json" },
      data: data,
    };

    axios(config)
      .then(function (res) {
        setErr("");
        window.location.href = "/login";
      })
      .catch(function (err) {
        setErr(err.response.data);
      });
  };

  return (
    <div className="register">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={name}
          placeholder="Enter your name"
          onChange={(e) => setName(e.target.value)}
        />
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

        <button type="submit">Register</button>

        <p>{err}</p>
      </form>
    </div>
  );
}

export default Register;
