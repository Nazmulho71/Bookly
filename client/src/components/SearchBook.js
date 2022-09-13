import React from "react";
import moment from "moment";
import Rating from "@mui/material/Rating";
import ShortDescription from "./ShortDescription";
import "../assets/css/SearchBook.css";

function SearchBook({
  image,
  title,
  subtitle,
  edition,
  author,
  publishDate,
  discountPrice,
  price,
  description,
}) {
  return (
    <div className="searchBook">
      <img src={image} alt="" width={220} height={280} />

      <div className="searchBook__details">
        <div>
          <h3>{title}</h3>
          {subtitle && <h3>:&nbsp;{subtitle}</h3>}
          <p>{edition}</p>
        </div>

        <p style={{ fontSize: "16px" }}>{author}</p>
        <p style={{ fontSize: "16px" }}>
          {moment(publishDate).format("MMMM Do YYYY")}
        </p>

        <div>
          <Rating
            name="half-rating-read"
            defaultValue={2.5}
            precision={0.1}
            size="large"
            readOnly
          />
          <p style={{ margin: "0 0 0 10px" }}>2.5</p>
        </div>

        <div className="searchBook__details-price">
          <span
            style={{
              color: discountPrice && "#999",
              textDecorationLine: discountPrice && "line-through",
            }}
          >
            ${price}
          </span>
          {discountPrice && (
            <span style={{ color: discountPrice && "#c13207" }}>
              &nbsp;${discountPrice}
            </span>
          )}
        </div>

        <div className="bookDescription" style={{ margin: 0 }}>
          <ShortDescription content={description} limit={400} />
        </div>
      </div>
    </div>
  );
}

export default SearchBook;
