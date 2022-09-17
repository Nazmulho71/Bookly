import React from "react";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Rating from "@mui/material/Rating";
import "../../assets/css/HomeBook.css";

function Book({ books }) {
  const navigateBook = (book) => {
    window.location.href = `/books/${book._id}`;
  };

  return (
    <>
      {books.map((book, i) => (
        <div className="homeBook" key={i} onClick={() => navigateBook(book)}>
          <img src={book.image} alt="" width={180} height={240} />

          <div className="homeBook__details">
            <div>
              <h3>
                {book.title}&nbsp;<span>{book.edition}</span>
              </h3>
            </div>

            <p>{book.author}</p>
            <Rating
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
        </div>
      ))}
    </>
  );
}

export default Book;
