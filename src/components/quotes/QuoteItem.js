import React from "react";
import classes from "./QuoteItem.module.css";
import { Link } from "react-router-dom";

const QuoteItem = ({ id, author, text }) => {
  return (
    <li className={classes.item}>
      {/* The <figure> HTML element represents self-contained content, 
      potentially with an optional caption, 
      which is specified using the <figcaption> element. 
      The figure, its caption, and its contents are referenced as a single unit. */}

      <figure>
        <blockquote>
          <p>{text}</p>
        </blockquote>
        <figcaption>{author}</figcaption>
      </figure>
      
      <Link to={`/quotes/${id}`} className="btn">
        View Fullscreen
      </Link>
    </li>
  );
};

export default QuoteItem;
