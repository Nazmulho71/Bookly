import React, { useState, useEffect } from "react";
import axios from "axios";
import CircularProgress from "@mui/material/CircularProgress";
import HomeBook from "../components/Home/HomeBook";
import Hero from "../assets/images/Hero.png";
import "../assets/css/home.css";

function Home() {
  const [books, setBooks] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    let config = {
      method: "get",
      url: "/api/books",
      headers: {},
    };

    axios(config)
      .then(function (res) {
        setIsLoaded(true);
        setBooks(res.data);
      })
      .catch(function (err) {
        setIsLoaded(true);
        console.log(err);
      });
  }, []);

  useEffect(() => {
    document.title = "Buy Books Online | Bookly";
  }, []);

  return (
    <div className="home">
      <img src={Hero} alt="" width="100%" />

      <h3>Featured Books</h3>

      <div className="home__books">
        {!isLoaded ? (
          <div className="book__loader">
            <CircularProgress />
          </div>
        ) : (
          <HomeBook books={books} />
        )}
      </div>
    </div>
  );
}

export default Home;
