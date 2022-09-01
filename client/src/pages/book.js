import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import Button from "@mui/material/Button";
import Rating from "@mui/material/Rating";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import BookDetails from "../components/BookDetails";
import "../assets/css/book.css";

function Book({ books }) {
  const { _id } = useParams();
  const book = books.find((book) => book._id === _id);

  console.log("_id", _id);
  console.log("book", book);

  useEffect(() => {
    document.title = `${book.title}: ${book.subtitle}`;
  }, []);

  return (
    <div className="book">
      <BookDetails book={book} />

      <Button variant="contained">ORDER NOW</Button>

      <div className="book__description">
        <div>
          <h3>Description</h3>
          <div>
            <span>{book.rating} out of 5</span>
            <Rating
              name="half-rating-read"
              defaultValue={book.rating}
              precision={0.5}
              readOnly
            />
          </div>
        </div>
        <hr />
        <p>
          {book.description}&nbsp;
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
