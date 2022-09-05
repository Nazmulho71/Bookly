import React from "react";
import { Link } from "react-router-dom";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Rating from "@mui/material/Rating";
import "../assets/css/HomeBook.css";

function Book({ books }) {
  return (
    <>
      {books.map((book, i) => (
        <Link to={`/books/${book._id}`} key={i} className="homeBook">
          <img src={book.image} alt="" width={180} height={240} />

          <div className="homeBook__details">
            <div>
              <h3>
                {book.title}&nbsp;<span>{book.edition}</span>
              </h3>
            </div>

            <p>{book.author}</p>
            <Rating
              name="half-book.rating-read"
              defaultValue={book.rating}
              precision={0.1}
              size="small"
              readOnly
            />

            <div>
              <span
                style={{
                  color: book.discountPrice && "#999",
                  textDecorationLine: book.discountPrice && "line-through",
                }}
              >
                ${book.price}
              </span>
              {book.discountPrice && (
                <span
                  style={{ color: book.discountPrice ? "#c13207" : "#000" }}
                >
                  &nbsp;${book.discountPrice}
                </span>
              )}
            </div>

            <div>
              <ShoppingCartIcon />
              <FavoriteIcon />
            </div>
          </div>
        </Link>
      ))}
    </>
  );
}

export default Book;
