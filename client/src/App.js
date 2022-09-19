import React from "react";
import { useLocation, Routes, Route } from "react-router-dom";
import Header from "./components/Common/Header";
import Home from "./pages/home";
import Login from "./pages/login";
import Register from "./pages/register";
import Profile from "./pages/profile";
import Search from "./pages/search";
import Book from "./pages/book";
import "./assets/css/App.css";

function App() {
  const location = useLocation();

  let login = location.pathname === "/login";
  let register = location.pathname === "/register";

  return (
    <div className="app">
      {login || register ? null : <Header />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/search" element={<Search />} />
        <Route path="/books/:id" element={<Book />} />
        {/* <Route path="/cart" element={<Cart />} /> */}
      </Routes>
    </div>
  );
}

export default App;
