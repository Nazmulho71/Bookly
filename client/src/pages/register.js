import React, { useState, useEffect } from "react";
import axios from "axios";
import Button from "@mui/material/Button";
import Logo from "../assets/images/Logo.svg";
import LoginBackground from "../assets/images/LoginBackground.png";
import "../assets/css/login.css";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    let data = JSON.stringify({ name, email, password });
    let config = {
      method: "post",
      url: "/api/users",
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

  useEffect(() => {
    document.title = "Register | Bookly";
  }, []);

  return (
    <div className="login">
      <div className="login__form">
        <div>
          <img src={Logo} alt="" />
        </div>

        <h1>
          Create a new account<span style={{ color: "#61CEF7" }}>.</span>
        </h1>
        <span>Bookly makes it easy to fill your shelves</span>

        <form onSubmit={handleSubmit}>
          <p>Name</p>
          <input
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={{ border: err && "2px solid #f2709b" }}
          />

          <p>Email:</p>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ border: err && "2px solid #f2709b" }}
          />

          <p>Password:</p>
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ border: err && "2px solid #f2709b" }}
          />

          <div className="login__form-bottom">&nbsp;</div>

          <Button variant="contained" type="submit">
            Register
          </Button>
          <p>{err}</p>
        </form>

        <p>
          Already have an account?{" "}
          <span onClick={() => (window.location.href = "/login")}>Log in</span>
        </p>
      </div>

      <div className="login__background">
        <img src={LoginBackground} alt="" />
      </div>
    </div>
  );
}

export default Register;
