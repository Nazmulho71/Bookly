import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import axios from "axios";
import Header from "./components/Header";
import Home from "./pages/home";
import Search from "./pages/search";
import Book from "./pages/book";
import "./assets/css/App.css";

function App() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    let baseUrl = "http://localhost:3000/api";
    let config = {
      method: "get",
      url: `${baseUrl}/books`,
      headers: {},
    };

    axios(config)
      .then(function (res) {
        setBooks(res.data);
      })
      .catch(function (err) {
        console.log(err);
      });
  }, []);

  return (
    <div className="app">
      <Header />

      <Routes>
        <Route path="/" element={<Home books={books} />} />
        <Route path="/search" element={<Search />} />
        <Route path="/books/:id" element={<Book books={books} />} />
      </Routes>
    </div>
  );
}

export default App;
