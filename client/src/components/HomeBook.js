import React from "react";
import { Link } from "react-router-dom";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Rating from "@mui/material/Rating";
import "../assets/css/HomeBook.css";

function Book({ books }) {
  console.log(books);

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
              precision={0.5}
              size="small"
              readOnly
            />

            <div>
              <span className="homeBook__details-discount">
                ${book.discountPrice}
              </span>
              <span>${book.price}</span>
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
