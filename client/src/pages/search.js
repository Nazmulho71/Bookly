import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSearchParams } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import SearchBook from "../components/Search/SearchBook";
import "../assets/css/search.css";

function Search() {
  const [searchParams] = useSearchParams();
  const [books, setBooks] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [filterParam, setFilterParam] = useState("All");
  const [searchParam] = useState(["title", "author"]);

  const q = searchParams.get("q");

  const search = (books) => {
    return books.filter((book) => {
      if (book.category.name === filterParam) {
        return searchParam.some((newItem) => {
          return (
            book[newItem].toString().toLowerCase().indexOf(q.toLowerCase()) > -1
          );
        });
      } else if (filterParam === "All") {
        return searchParam.some((newItem) => {
          return (
            book[newItem].toString().toLowerCase().indexOf(q.toLowerCase()) > -1
          );
        });
      }
      return null;
    });
  };

  useEffect(() => {
    let config = {
      method: "get",
      url: "/api/books",
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
  }, []);

  useEffect(() => {
    let config = {
      method: "get",
      url: "/api/categories",
      headers: {},
    };

    axios(config)
      .then(function (res) {
        setIsLoaded(true);
        setCategories(res.data);
      })
      .catch(function (err) {
        setIsLoaded(true);
        console.log(err);
      });
  }, []);

  useEffect(() => {
    document.title = `Bookly : ${q}`;
  }, [q]);

  return (
    <div className="search">
      {!isLoaded ? (
        <div className="book__loader">
          <CircularProgress />
        </div>
      ) : (
        <>
          <div className="search__filter">
            <p>Sort by Category: </p>
            <FormControl>
              <Select
                value={filterParam}
                onChange={(e) => setFilterParam(e.target.value)}
                inputProps={{ "aria-label": "Without label" }}
              >
                <MenuItem value="All">All</MenuItem>
                {categories.map((category, i) => (
                  <MenuItem key={i} value={category.name}>
                    {category.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>

          {search(books).map((book, i) => (
            <>
              <SearchBook key={i} book={book} />
              <hr />
            </>
          ))}
        </>
      )}
    </div>
  );
}

export default Search;
