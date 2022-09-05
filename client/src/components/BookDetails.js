import React from "react";
import "../assets/css/BookDetails.css";

function BookDetails({ book }) {
  return (
    <div className="bookDetails">
      <img src={book.image} alt="" width={280} height={340} />

      <div className="bookDetails__details">
        <div>
          <h3>{book.title}</h3>
          {book.subtitle && <h3>:&nbsp;{book.subtitle}</h3>}
          <p style={{ marginLeft: 5 }}>{book.edition}</p>
        </div>

        <hr />

        <div>
          <span>Author:&nbsp;</span>
          <p>{book.author}</p>
        </div>

        <div>
          <span>Format:&nbsp;</span>
          <p>{book.format}</p>
        </div>

        <div>
          <span>Category:&nbsp;</span>
          <p>{book.category.name}</p>
        </div>

        <div>
          <span>Publisher:&nbsp;</span>
          <p>{book.publisher}</p>
        </div>

        <div>
          <span>Published:&nbsp;</span>
          <p>{book.publishDate}</p>
        </div>

        <div>
          <span>Price:&nbsp;</span>
          <p
            style={{ textDecorationLine: book.discountPrice && "line-through" }}
          >
            ${book.price}
          </p>
          {book.discountPrice && (
            <p style={{ color: book.discountPrice && "#c13207" }}>
              &nbsp;${book.discountPrice}
            </p>
          )}
        </div>

        <div>
          <span>Pages:&nbsp;</span>
          <p>{book.page}</p>
        </div>
      </div>
    </div>
  );
}

export default BookDetails;
