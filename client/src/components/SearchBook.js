import React from "react";
import Rating from "@mui/material/Rating";
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
          <h3>{title}:&nbsp;</h3>
          <h3>{subtitle}</h3>
          <p>{edition}</p>
        </div>

        <p style={{ fontSize: "16px" }}>{author}</p>
        <p style={{ fontSize: "16px" }}>{publishDate}</p>

        <div>
          <Rating
            name="half-rating-read"
            defaultValue={2.5}
            precision={0.5}
            size="large"
            readOnly
          />
          <p style={{ margin: "0 0 0 10px" }}>2.5</p>
        </div>

        <div className="searchBook__details-price">
          <span>{discountPrice}</span>
          <span>{price}</span>
        </div>

        <p>{description}</p>
      </div>
    </div>
  );
}

export default SearchBook;
