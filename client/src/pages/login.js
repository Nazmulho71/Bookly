import React, { useState } from "react";
import axios from "axios";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import Logo from "../assets/images/Logo.svg";
import LoginBackground from "../assets/images/LoginBackground.png";
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
      <div className="login__form">
        <div>
          <img src={Logo} alt="" />
        </div>

        <h1>
          Login to your account<span style={{ color: "#61CEF7" }}>.</span>
        </h1>
        <span>& Start exploring</span>

        <form onSubmit={handleSubmit}>
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

          <div className="login__form-bottom">
            <p>
              <Checkbox /> Remember me
            </p>

            <p>Forgot password?</p>
          </div>

          <Button variant="contained" type="submit">
            Log in
          </Button>
          <p>{err}</p>
        </form>

        <p>
          Don't have an account?{" "}
          <span onClick={() => (window.location.href = "/register")}>
            Register Now
          </span>
        </p>
      </div>

      <div className="login__background">
        <img src={LoginBackground} alt="" />
      </div>
    </div>
  );
}

export default Login;
