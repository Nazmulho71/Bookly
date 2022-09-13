import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import Cookies from "universal-cookie";
import Button from "@mui/material/Button";
import SearchIcon from "@mui/icons-material/Search";
import Avatar from "@mui/material/Avatar";
import Logo from "../assets/images/Logo.svg";
import WhiteLogo from "../assets/images/WhiteLogo.svg";
import "../assets/css/Header.css";

function Header() {
  const location = useLocation();
  const [username, setUsername] = useState();
  const [q, setQ] = useState("");

  const cookies = new Cookies();
  const token = cookies.get("token");

  let baseUrl = "http://localhost:3000/api";
  let firstLetter = username?.charAt(0);
  let home = location.pathname === "/";

  const navigateHome = () => {
    window.location.href = "/";
  };
  const navigateLogin = () => {
    window.location.href = "/login";
  };
  const navigateRegister = () => {
    window.location.href = "/register";
  };
  const navigateSearch = () => {
    window.location.href = `/search?q=${q}`;
  };

  useEffect(() => {
    let config = {
      method: "get",
      url: `${baseUrl}/users/profile`,
      headers: { "X-Auth-Token": token },
    };

    axios(config)
      .then(function (res) {
        setUsername(res.data.name);
      })
      .catch(function (err) {
        console.log(err);
      });
  }, [baseUrl, token]);

  return (
    <div className="header" style={{ background: home && "#fff" }}>
      <div className="header__logo" onClick={() => navigateHome()}>
        <img src={home ? Logo : WhiteLogo} alt="" />
      </div>

      <div className={home ? "header__search-home" : "header__search"}>
        <div>
          <Button>
            <SearchIcon />
          </Button>
          <input
            type="text"
            placeholder="Search books"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && navigateSearch()}
          />

          <button style={{ display: "none" }}>Search</button>
        </div>
      </div>

      {token ? (
        <div className="header__profile">
          <Avatar
            onClick={() => {
              cookies.remove("token");
              window.location.href = "/";
            }}
          >
            {firstLetter}
          </Avatar>
        </div>
      ) : (
        <div className={home ? "header__button-home" : "header__button"}>
          <Button variant="contained" onClick={() => navigateLogin()}>
            Login
          </Button>
          <Button variant="contained" onClick={() => navigateRegister()}>
            Register
          </Button>
        </div>
      )}
    </div>
  );
}

export default Header;
