import React, { useState } from "react";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

function ShortDescription({ content, limit }) {
  const [showAll, setShowAll] = useState(false);

  if (content.length <= limit) {
    return <p>{content}</p>;
  }
  if (showAll) {
    return (
      <p>
        {content}&nbsp;
        <span onClick={() => setShowAll(false)}>
          <KeyboardArrowUpIcon /> Read less
        </span>
      </p>
    );
  }
  const toShow = content.substring(0, limit) + "...";
  return (
    <p>
      {toShow}&nbsp;
      <span onClick={() => setShowAll(true)}>
        <KeyboardArrowDownIcon /> Read more
      </span>
    </p>
  );
}

export default ShortDescription;
