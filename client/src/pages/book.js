import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import CircularProgress from "@mui/material/CircularProgress";
import Button from "@mui/material/Button";
import Header from "../components/Header";
import BookDetails from "../components/BookDetails";
import BookDescription from "../components/BookDescription";
import BookReview from "../components/BookReview";
import "../assets/css/book.css";

function Book() {
  const { id } = useParams();
  const [book, setBook] = useState({});
  const [loading, setLoading] = useState(true);

  let baseUrl = "http://localhost:3000/api";

  useEffect(() => {
    let config = {
      method: "get",
      url: `${baseUrl}/books/${id}`,
      headers: {},
    };

    axios(config)
      .then(function (res) {
        setBook(res.data);
        setLoading(false);
      })
      .catch(function (err) {
        setLoading(false);
        console.log(err);
      });
  }, [baseUrl, id]);

  useEffect(() => {
    document.title = `${book.title}${
      book.subtitle ? ": " + book.subtitle : ""
    }`;
  }, [book]);

  return (
    <>
      <Header />
      <div className="book">
        {loading ? (
          <div className="book__loader">
            <CircularProgress />
          </div>
        ) : (
          <>
            <BookDetails
              image={book.image}
              title={book.title}
              subtitle={book.subtitle}
              edition={book.edition}
              author={book.author}
              format={book.format}
              category={book.category}
              publisher={book.publisher}
              publishDate={book.publishDate}
              discountPrice={book.discountPrice}
              price={book.price}
              page={book.page}
            />

            <Button variant="contained">ORDER NOW</Button>

            <BookDescription
              rating={book.rating}
              description={book.description}
            />

            <BookReview baseUrl={baseUrl} id={id} reviews={book.reviews} />
          </>
        )}
      </div>
    </>
  );
}

export default Book;
