import React from "react";
import { useParams, Route, Link } from "react-router-dom";
import Comments from "../components/comments/Comments";
import HighlightedQuote from "../components/quotes/HighlightedQuote";

const DUMMY_QUOTES = [
  {
    id: "q1",
    author: "Ayush",
    text: "Learning React is fun",
  },
  {
    id: "q2",
    author: "Ayushi",
    text: "Learning Python is fun",
  },
  {
    id: "q3",
    author: "Max",
    text: "Learning MongoDB is fun",
  },
];

const QuoteDetails = () => {
  const params = useParams();
  // console.log(params)
  const quote = DUMMY_QUOTES.find((quote) => quote.id === params.quoteId);

  // when you dont have a quote with id = params.quoteId
  if (!quote) {
    return <p>No Quote Found</p>;
  }

  return (
    <>
      <h1>Quote Details Page</h1>

      <HighlightedQuote author={quote.author} text={quote.text} />

      <Route exact path={`/quotes/${params.quoteId}`}>
        <div className="centered">
          <Link to={`/quotes/${params.quoteId}/comments`} className="btn--flat">
            Show Comments
          </Link>
        </div>
      </Route>

      <Route path={`/quotes/${params.quoteId}/comments`}>
        <Comments />
      </Route>

      {/* <Comments /> */}
    </>
  );
};

export default QuoteDetails;
