import React from "react";
import { useLocation } from "react-router-dom";
import Cookies from "universal-cookie";
import Button from "@mui/material/Button";
import SearchIcon from "@mui/icons-material/Search";
import Avatar from "@mui/material/Avatar";
import Logo from "../assets/images/Logo.svg";
import WhiteLogo from "../assets/images/WhiteLogo.svg";
import "../assets/css/Header.css";

function Header() {
  const home = useLocation().pathname === "/";
  const cookies = new Cookies();
  const token = cookies.get("token");

  const navigateHome = () => {
    window.location.href = "/";
  };
  const navigateLogin = () => {
    window.location.href = "/login";
  };
  const navigateRegister = () => {
    window.location.href = "/register";
  };

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
          <input type="text" placeholder="Search books" />
        </div>
      </div>

      {token ? (
        <div className="header__profile">
          <Avatar
            onClick={() => {
              cookies.remove("token");
              window.location.reload();
            }}
          >
            H
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
