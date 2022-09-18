import React, { useState, useEffect } from "react";
import axios from "axios";

function Cart() {
  const [books, setBooks] = useState({});
  const [isLoaded, setIsLoaded] = useState(false);
  let baseUrl = "http://localhost:3000/api";

  useEffect(() => {
    let config = {
      method: "get",
      url: `${baseUrl}/books`,
      headers: {},
    };

    axios(config)
      .then(function (res) {
        setIsLoaded(true);
        setBooks(res.data);
      })
      .catch(function (err) {
        setIsLoaded(true);
        console.log(err);
      });
  }, [baseUrl]);

  useEffect(() => {
    document.title = `${books.title}${
      books.subtitle ? ": " + books.subtitle : ""
    }`;
  }, [books]);

  return (
    <div>
      {!isLoaded ? (
        <p>Loading...</p>
      ) : (
        <div>
          {books.map(
            (book, i) => book.addToCart && <div key={i}>{book.title}</div>
          )}
        </div>
      )}
    </div>
  );
}

export default Cart;
