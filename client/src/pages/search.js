import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSearchParams } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import SearchBook from "../components/SearchBook";
import "../assets/css/search.css";

function Search() {
  const [searchParams] = useSearchParams();
  const [books, setBooks] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [filterParam, setFilterParam] = useState(["All"]);
  const [searchParam] = useState(["title", "author"]);
  const q = searchParams.get("q");

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
    document.title = `Bookly : ${q}`;
  }, [q]);

  const search = () => {
    return books.filter((book) => {
      if (book.category.name === filterParam) {
        return searchParam.some((newBook) => {
          return (
            book[newBook].toString().toLowerCase().indexOf(q.toLowerCase()) > -1
          );
        });
      } else if (filterParam === "All") {
        return searchParam.some((newBook) => {
          return (
            book[newBook].toString().toLowerCase().indexOf(q.toLowerCase()) > -1
          );
        });
      }
    });
  };

  return (
    <div className="search">
      {!isLoaded ? (
        <div className="book__loader">
          <CircularProgress />
        </div>
      ) : (
        <>
          <div className="search__filter">
            <label htmlFor="">Sort by Category: </label>
            <select
              name=""
              id=""
              onChange={(e) => setFilterParam(e.target.value)}
              className="custom-select"
              aria-label="Filter Books"
            >
              <option value="All">All</option>
              <option value="Islamic">Islamic</option>
              <option value="Programming">Programming</option>
              <option value="Category1">Category1</option>
            </select>
            <span className="focus"></span>
          </div>

          {search(books).map((book, i) => (
            <>
              <SearchBook
                key={i}
                image={book.image}
                title={book.title}
                subtitle={book.subtitle}
                edition={book.edition}
                author={book.author}
                publishDate={book.publishDate}
                discountPrice={book.discountPrice}
                price={book.price}
                description={book.description}
              />
              <hr />
            </>
          ))}
        </>
      )}
    </div>
  );
}

export default Search;
