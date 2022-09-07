import React from "react";
import Header from "../components/Header";
import SearchBook from "../components/SearchBook";
import "../assets/css/search.css";

function Search() {
  return (
    <>
      <Header />
      <div className="search">
        <SearchBook
          image={
            "https://m.media-amazon.com/images/P/1118531647.01._SCLZZZZZZZ_SX500_.jpg"
          }
          title={"JavaScript and jQuery"}
          subtitle={"Interactive Front-End Web Development"}
          edition={"1st Edition"}
          author={"Jon Duckett"}
          publishDate={"December 24, 2013"}
          discountPrice={"$45"}
          price={"$39.99"}
          description={
            "Since Don’t Make Me Think was first published in 2000, hundreds of thousands of Web designers and developers have relied on usability guru Steve Krug’s guide to help them understand the principles of intuitive navigation..."
          }
        />
        <hr />
        <SearchBook
          image={
            "https://m.media-amazon.com/images/P/1118531647.01._SCLZZZZZZZ_SX500_.jpg"
          }
          title={"JavaScript and jQuery"}
          subtitle={"Interactive Front-End Web Development"}
          edition={"1st Edition"}
          author={"Jon Duckett"}
          publishDate={"December 24, 2013"}
          discountPrice={"$45"}
          price={"$39.99"}
          description={
            "Since Don’t Make Me Think was first published in 2000, hundreds of thousands of Web designers and developers have relied on usability guru Steve Krug’s guide to help them understand the principles of intuitive navigation..."
          }
        />
      </div>
    </>
  );
}

export default Search;
