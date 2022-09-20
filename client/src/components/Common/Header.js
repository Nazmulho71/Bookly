import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import Cookies from "universal-cookie";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import Settings from "@mui/icons-material/Settings";
import Logout from "@mui/icons-material/Logout";
import Logo from "../../assets/images/Logo.svg";
import WhiteLogo from "../../assets/images/WhiteLogo.svg";
import "../../assets/css/Header.css";

function Header() {
  const location = useLocation();
  const [username, setUsername] = useState();
  const [q, setQ] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);

  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const cookies = new Cookies();
  const token = cookies.get("token");
  let photo = localStorage.getItem("photo");
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
      url: `/api/users`,
      headers: { "X-Auth-Token": token },
    };

    axios(config)
      .then(function (res) {
        setUsername(res.data.name);
      })
      .catch(function (err) {
        console.log(err);
      });
  }, [token]);

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
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? "account-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
          >
            {photo ? (
              <Avatar alt={firstLetter} src={photo} />
            ) : (
              <Avatar>{firstLetter}</Avatar>
            )}
          </IconButton>

          <Menu
            anchorEl={anchorEl}
            id="account-menu"
            open={open}
            onClose={handleClose}
            onClick={handleClose}
            PaperProps={{
              elevation: 0,
              sx: {
                overflow: "visible",
                filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                mt: 1.5,
                "& .MuiAvatar-root": {
                  width: 32,
                  height: 32,
                  ml: -0.5,
                  mr: 1,
                },
                "&:before": {
                  content: '""',
                  display: "block",
                  position: "absolute",
                  top: 0,
                  right: 14,
                  width: 10,
                  height: 10,
                  bgcolor: "background.paper",
                  transform: "translateY(-50%) rotate(45deg)",
                  zIndex: 0,
                },
              },
            }}
            transformOrigin={{ horizontal: "right", vertical: "top" }}
            anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
          >
            <MenuItem onClick={() => (window.location.href = "/profile")}>
              <Avatar /> My Profile
            </MenuItem>
            <Divider />
            <MenuItem>
              <ListItemIcon>
                <Settings fontSize="small" />
              </ListItemIcon>
              Settings
            </MenuItem>
            <MenuItem
              onClick={() => {
                window.location.href = "/";
                cookies.remove("token");
              }}
            >
              <ListItemIcon>
                <Logout fontSize="small" />
              </ListItemIcon>
              Logout
            </MenuItem>
          </Menu>
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
