import React from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/home";
import Search from "./pages/search";
import Book from "./pages/book";
import "./assets/css/App.css";

function App() {
  return (
    <div className="app">
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<Search />} />
        <Route path="/books" element={<Book />} />
      </Routes>
    </div>
  );
}

export default App;
