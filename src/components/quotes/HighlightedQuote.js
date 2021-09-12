import classes from "./HighlightedQuote.module.css";

const HighlightedQuote = ({ author, text }) => {
  return (
    <figure className={classes.quote}>
      <p>{text}</p>
      <figcaption>{author}</figcaption>
    </figure>
  );
};

export default HighlightedQuote;
