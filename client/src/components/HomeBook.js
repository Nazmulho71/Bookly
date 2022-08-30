import React from "react";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Rating from "@mui/material/Rating";
import "../assets/css/HomeBook.css";

function Book({ image, title, edition, author, discountPrice, price }) {
  return (
    <div className="homeBook">
      <img src={image} alt="" width={180} />

      <div className="homeBook__details">
        <div>
          <h3>
            {title}&nbsp;<span>{edition}</span>
          </h3>
        </div>

        <p>{author}</p>
        <Rating
          name="half-rating-read"
          defaultValue={2.5}
          precision={0.5}
          size="small"
          readOnly
        />

        <div>
          <span className="homeBook__details-discount">{discountPrice}</span>
          <span>{price}</span>
        </div>

        <div>
          <ShoppingCartIcon />
          <FavoriteIcon />
        </div>
      </div>
    </div>
  );
}

export default Book;
