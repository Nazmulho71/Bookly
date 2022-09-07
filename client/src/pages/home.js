import React, { useState, useEffect } from "react";
import axios from "axios";
import Hero from "../assets/images/Hero.png";
import Header from "../components/Header";
import HomeBook from "../components/HomeBook";
import "../assets/css/home.css";

function Home() {
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

  useEffect(() => {
    document.title = "Buy Book Online | Bookly";
  }, []);

  return (
    <>
      <Header />
      <div className="home">
        <img src={Hero} alt="" width="100%" />

        <h3>Featured Books</h3>

        <div className="home__books">
          <HomeBook books={books} />
        </div>
      </div>
    </>
  );
}

export default Home;
