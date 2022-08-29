import React from "react";
import { Link, useLocation } from "react-router-dom";
import Button from "@mui/material/Button";
import SearchIcon from "@mui/icons-material/Search";
import Logo from "../assets/images/Logo.svg";
import WhiteLogo from "../assets/images/WhiteLogo.svg";
import "../assets/css/Header.css";

function Header() {
  const home = useLocation().pathname === "/";

  return (
    <div className="header" style={{ background: home && "#fff" }}>
      <div className="header__logo">
        <Link to="/">
          <img src={home ? Logo : WhiteLogo} alt="" />
        </Link>
      </div>

      <div className={home ? "header__search-home" : "header__search"}>
        <div>
          <Button>
            <SearchIcon />
          </Button>
          <input type="text" placeholder="Search books" />
        </div>
      </div>

      <div className={home ? "header__button-home" : "header__button"}>
        <Button variant="contained">Login</Button>
        <Button variant="contained">Register</Button>
      </div>
    </div>
  );
}

export default Header;
