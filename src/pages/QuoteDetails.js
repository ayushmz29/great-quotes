import React, { useEffect } from "react";
import { useParams, Route, Link, useRouteMatch } from "react-router-dom";
import Comments from "../components/comments/Comments";
import HighlightedQuote from "../components/quotes/HighlightedQuote";
import LoadingSpinner from "../components/UI/LoadingSpinner";
import useHttp from "../hooks/use-http";
import { getSingleQuote } from "../lib/api";

/* const DUMMY_QUOTES = [
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
]; */

const QuoteDetails = () => {
  const params = useParams();

  /* WHAT IS 'useRouteMatch()' :-
    -> One potential downside of nesting your routes this way is that changes to 
    your route structure in one file might break the routes in other files.  
    -> useRouteMatch() returns an object with a 'url' and a 'path' property.
    This object is sometimes referred to as the match object:

    -> The 'path' property contains the dynamic path pattern with URL parameters 
    (eg. /bands/:band/songs/:song) and should be used for creating relative path props for Route components.
    -> The 'url' property has the values of URL parameters filled in 
    (eg. /bands/queen/songs/bohemian_rhapsody) and should be used for creating relative to props for Link components.
  */
  const match = useRouteMatch();

  // console.log(params)
  // console.log(match)

  // we are using object destructuring so that we dont have to
  // put the whole params object into the dependecy list of useEffect
  const { quoteId } = params;

  // using custom hook
  const {
    sendRequest,
    status,
    data: loadedQuote,
    error,
  } = useHttp(getSingleQuote, true);

  // sideffect handling
  useEffect(() => {
    // passing the id of the quote whose details needs to be fetched
    sendRequest(quoteId);
  }, [sendRequest, quoteId]);

  // const quote = loadedQuote.find((quote) => quote.id === params.quoteId);

  if (status === "pending") {
    return (
      <div className="centered">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return <p className="centered">{error}</p>;
  }

  // when you dont have a quote
  if (!loadedQuote.text) {
    return <p>No Quote Found</p>;
  }

  return (
    <>
      <h1>Quote Details Page</h1>

      <HighlightedQuote author={loadedQuote.author} text={loadedQuote.text} />

      {/* <Route exact path={`/quotes/${params.quoteId}`}> */}
      {/* Dynamic Route Matching using useRouteMatch */}
      <Route exact path={match.path}>
        <div className="centered">
          {/* <Link to={`/quotes/${params.quoteId}/comments`} className="btn--flat"> */}
          {/* Dynamic Route matching */}
          <Link to={`${match.url}/comments`} className="btn--flat">
            Show Comments
          </Link>
        </div>
      </Route>

      {/* <Route path={`/quotes/${params.quoteId}/comments`}> */}
      {/* Dynamic matching of paths using 'useRouteMatch' Hook */}
      <Route path={`${match.path}/comments`}>
        <Comments />
      </Route>

      {/* <Comments /> */}
    </>
  );
};

export default QuoteDetails;
