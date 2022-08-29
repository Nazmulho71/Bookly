import React from "react";
import Button from "@mui/material/Button";
import SearchIcon from "@mui/icons-material/Search";
import Logo from "../assets/images/Logo.svg";
import "../assets/css/Header.css";

function Header() {
  return (
    <div className="header">
      <div className="header__logo">
        <img src={Logo} alt="" />
      </div>

      <div className="header__search">
        <div>
          <Button>
            <SearchIcon />
          </Button>
          <input type="text" placeholder="Search books" />
        </div>
      </div>

      <div className="header__button">
        <Button variant="contained">Login</Button>
        <Button variant="contained">Register</Button>
      </div>
    </div>
  );
}

export default Header;
