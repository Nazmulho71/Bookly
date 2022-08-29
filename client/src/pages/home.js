import React from "react";
import Hero from "../assets/images/Hero.png";
import HomeBook from "../components/HomeBook";
import "../assets/css/home.css";

function Home() {
  return (
    <div className="home">
      <img src={Hero} alt="" width="100%" />

      <h3>Featured Books</h3>

      <div className="home__books">
        <HomeBook
          image={
            "https://m.media-amazon.com/images/P/1118531647.01._SCLZZZZZZZ_SX500_.jpg"
          }
          title={"JavaScript and jQuery"}
          edition={"1st Edition"}
          author={"Jon Duckett"}
          discountPrice={"$45"}
          price={"$39.99"}
        />
        <HomeBook
          image={
            "https://m.media-amazon.com/images/P/1118531647.01._SCLZZZZZZZ_SX500_.jpg"
          }
          title={"JavaScript and jQuery"}
          edition={"1st Edition"}
          author={"Jon Duckett"}
          discountPrice={"$45"}
          price={"$39.99"}
        />
        <HomeBook
          image={
            "https://m.media-amazon.com/images/P/1118531647.01._SCLZZZZZZZ_SX500_.jpg"
          }
          title={"JavaScript and jQuery"}
          edition={"1st Edition"}
          author={"Jon Duckett"}
          discountPrice={"$45"}
          price={"$39.99"}
        />
        <HomeBook
          image={
            "https://m.media-amazon.com/images/P/1118531647.01._SCLZZZZZZZ_SX500_.jpg"
          }
          title={"JavaScript and jQuery"}
          edition={"1st Edition"}
          author={"Jon Duckett"}
          discountPrice={"$45"}
          price={"$39.99"}
        />
        <HomeBook
          image={
            "https://m.media-amazon.com/images/P/1118531647.01._SCLZZZZZZZ_SX500_.jpg"
          }
          title={"JavaScript and jQuery"}
          edition={"1st Edition"}
          author={"Jon Duckett"}
          discountPrice={"$45"}
          price={"$39.99"}
        />
      </div>
    </div>
  );
}

export default Home;
