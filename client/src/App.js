import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import Search from "./pages/search";
import Book from "./pages/book";
import Login from "./pages/login";
import Register from "./pages/register";
import "./assets/css/App.css";

function App() {
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<Search />} />
        <Route path="/books/:id" element={<Book />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </div>
  );
}

export default App;
