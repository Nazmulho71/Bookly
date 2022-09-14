import React from "react";
import moment from "moment";
import Rating from "@mui/material/Rating";
import ShortDescription from "./ShortDescription";
import "../assets/css/SearchBook.css";

function SearchBook({ book }) {
  const navigateBook = () => {
    window.location.href = `/books/${book._id}`;
  };

  return (
    <div className="searchBook">
      <img src={book.image} alt="" onClick={() => navigateBook(book)} />

      <div className="searchBook__details">
        <div>
          <h3 onClick={() => navigateBook(book)}>{book.title}</h3>
          {book.subtitle && <h3>:&nbsp;{book.subtitle}</h3>}
          <p>{book.edition}</p>
        </div>

        <p style={{ fontSize: "16px" }}>{book.author}</p>
        <p style={{ fontSize: "16px" }}>
          {moment(book.publishDate).format("MMMM Do YYYY")}
        </p>

        <div>
          <Rating
            name="half-book.rating-read"
            defaultValue={book.rating}
            precision={0.1}
            size="large"
            readOnly
          />
          <p style={{ margin: "0 0 0 10px" }}>{book.rating}</p>
        </div>

        <div className="searchBook__details-price">
          <span
            style={{
              color: book.discountPrice && "#999",
              textDecorationLine: book.discountPrice && "line-through",
            }}
          >
            ${book.price}
          </span>
          {book.discountPrice && (
            <span style={{ color: book.discountPrice && "#c13207" }}>
              &nbsp;${book.discountPrice}
            </span>
          )}
        </div>

        <div className="bookDescription" style={{ margin: 0 }}>
          <ShortDescription content={book.description} limit={400} />
        </div>
      </div>
    </div>
  );
}

export default SearchBook;
