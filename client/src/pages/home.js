import React, { useEffect } from "react";
import Hero from "../assets/images/Hero.png";
import HomeBook from "../components/HomeBook";
import "../assets/css/home.css";

function Home({ books }) {
  useEffect(() => {
    document.title = "Buy Book Online | Bookly";
  }, []);

  return (
    <div className="home">
      <img src={Hero} alt="" width="100%" />

      <h3>Featured Books</h3>

      <div className="home__books">
        <HomeBook books={books} />
      </div>
    </div>
  );
}

export default Home;
