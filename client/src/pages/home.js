import React from "react";
import Hero from "../assets/images/Hero.png";

function Home() {
  return (
    <div className="home">
      <img src={Hero} alt="" width="100%" />

      <h3>Featured Books</h3>

      <div className="home__books"></div>
    </div>
  );
}

export default Home;
