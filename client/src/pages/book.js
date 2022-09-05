import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import Button from "@mui/material/Button";
import BookDetails from "../components/BookDetails";
import BookDescription from "../components/BookDescription";
import BookReview from "../components/BookReview";
import "../assets/css/book.css";

function Book({ books }) {
  const { id } = useParams();
  const book = books.find((book) => book._id === id);

  useEffect(() => {
    document.title = `${book.title}${
      book.subtitle ? ": " + book.subtitle : ""
    }`;
  }, [book]);

  return (
    <div className="book">
      <BookDetails book={book} />

      <Button variant="contained">ORDER NOW</Button>

      <BookDescription book={book} />

      <BookReview book={book} />
    </div>
  );
}

export default Book;
