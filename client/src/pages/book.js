import React from "react";
import Button from "@mui/material/Button";
import Rating from "@mui/material/Rating";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import BookDetails from "../components/BookDetails";
import "../assets/css/book.css";

function Book() {
  return (
    <div className="book">
      <BookDetails
        image={
          "https://m.media-amazon.com/images/P/1118531647.01._SCLZZZZZZZ_SX500_.jpg"
        }
        title={"JavaScript and jQuery"}
        subtitle={"Interactive Front-End Web Development"}
        edition={"1st Edition"}
        author={"Jon Duckett"}
        format={"Paperback"}
        category={"Programming"}
        publisher={"Wiley"}
        publishDate={"December 24, 2013"}
        discountPrice={"$45"}
        price={"$39.99"}
        page={"640"}
      />

      <Button variant="contained">ORDER NOW</Button>

      <div className="book__description">
        <div>
          <h3>Description</h3>
          <div>
            <span>2.5 out of 5</span>
            <Rating
              name="half-rating-read"
              defaultValue={2.5}
              precision={0.5}
              readOnly
            />
          </div>
        </div>
        <hr />
        <p>
          In JavaScript and jQuery: Interactive Front-End Development,
          best-selling author Jon Duckett delivers a fully illustrated guide to
          making your websites more interactive and your interfaces more
          interesting and intuitive. In the book, you'll explore basic
          programming concepts that assume no prior knowledge of programming
          beyond an ability to create a web page using HTML & CSS.{" "}
          <span>
            Read more <KeyboardArrowDownIcon />
          </span>
        </p>
      </div>

      <div className="book__review">
        <h3>Customer reviews</h3>
        <hr />
        <div>
          <AccountCircleIcon />
          <span>Lilianna</span>
        </div>
        <p>
          I love the illustrations, examples, and simple layout of this book,
          but...it is outdated. It does not include all the "upgrades" of ES6.
          For example, I searched the index for the spread operator; not there.
          It does not cover arrow functions either. So, a good beginner's book?
          Yes. A reference for middle to advanced Javascript users? Not really.
        </p>
      </div>
    </div>
  );
}

export default Book;
