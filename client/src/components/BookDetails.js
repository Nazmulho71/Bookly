import React from "react";
import moment from "moment";
import "../assets/css/BookDetails.css";

function BookDetails({
  image,
  title,
  subtitle,
  edition,
  author,
  format,
  category,
  publisher,
  publishDate,
  discountPrice,
  price,
  page,
}) {
  return (
    <div className="bookDetails">
      <img src={image} alt="" width={280} height={340} />

      <div className="bookDetails__details">
        <div>
          <h3>{title}</h3>
          {subtitle && <h3>:&nbsp;{subtitle}</h3>}
          <p style={{ marginLeft: 5 }}>{edition}</p>
        </div>

        <hr />

        <div>
          <span>Author:&nbsp;</span>
          <p>{author}</p>
        </div>

        <div>
          <span>Format:&nbsp;</span>
          <p>{format}</p>
        </div>

        <div>
          <span>Category:&nbsp;</span>
          <p>{category.name}</p>
        </div>

        <div>
          <span>Publisher:&nbsp;</span>
          <p>{publisher}</p>
        </div>

        <div>
          <span>Published:&nbsp;</span>
          <p>{moment(publishDate).format("MMMM Do YYYY")}</p>
        </div>

        <div>
          <span>Price:&nbsp;</span>
          <p style={{ textDecorationLine: discountPrice && "line-through" }}>
            ${price}
          </p>
          {discountPrice && (
            <p style={{ color: discountPrice && "#c13207" }}>
              &nbsp;${discountPrice}
            </p>
          )}
        </div>

        <div>
          <span>Pages:&nbsp;</span>
          <p>{page}</p>
        </div>
      </div>
    </div>
  );
}

export default BookDetails;
