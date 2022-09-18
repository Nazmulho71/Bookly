import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Cookies from "universal-cookie";
import CircularProgress from "@mui/material/CircularProgress";
import Button from "@mui/material/Button";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import BookDetails from "../components/Book/BookDetails";
import BookDescription from "../components/Book/BookDescription";
import BookReview from "../components/Book/BookReview";
import "../assets/css/book.css";

function Book() {
  const { id } = useParams();
  const [book, setBook] = useState({});
  const [isLoaded, setIsLoaded] = useState(false);

  const cookies = new Cookies();
  const token = cookies.get("token");
  let baseUrl = "http://localhost:3000/api";

  const updateBook = () => {
    let data = JSON.stringify({
      title: book.title,
      image: book.image,
      categoryId: book.category._id,
      price: book.price,
      author: book.author,
      description: book.description,
      page: book.page,
      format: book.format,
      publisher: book.publisher,
      numberInStock: book.numberInStock,
      addToCart: true,
    });

    let config = {
      method: "put",
      url: `${baseUrl}/books/${id}`,
      headers: {
        "X-Auth-Token": token,
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios(config)
      .then(function (res) {
        window.location.reload();
      })
      .catch(function (err) {
        console.log(err);
      });
  };

  useEffect(() => {
    let config = {
      method: "get",
      url: `${baseUrl}/books/${id}`,
      headers: {},
    };

    axios(config)
      .then(function (res) {
        setIsLoaded(true);
        setBook(res.data);
      })
      .catch(function (err) {
        setIsLoaded(true);
        console.log(err);
      });
  }, [baseUrl, id]);

  useEffect(() => {
    document.title = `${book.title}${
      book.subtitle ? ": " + book.subtitle : ""
    }`;
  }, [book]);

  console.log(book);

  return (
    <div className="book">
      {!isLoaded ? (
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

          <Button
            variant="contained"
            onClick={() =>
              book.addToCart ? (window.location.href = "/cart") : updateBook()
            }
          >
            <ShoppingCartOutlinedIcon /> {book.addToCart ? "Go" : "Add"} To Cart
          </Button>

          <BookDescription
            rating={book.rating}
            description={book.description}
          />

          <BookReview baseUrl={baseUrl} id={id} reviews={book.reviews} />
        </>
      )}
    </div>
  );
}

export default Book;
