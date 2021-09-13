import React, { useEffect } from "react";
import NoQuotesFound from "../components/quotes/NoQuotesFound";
import QuoteList from "../components/quotes/QuoteList";
import LoadingSpinner from "../components/UI/LoadingSpinner";
import useHttp from "../hooks/use-http";
import { getAllQuotes } from "../lib/api";

// dummy quotes
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

const AllQuotes = () => {
  // using custom hook
  // object destructuring and giving alias to 'data'
  const {
    sendRequest,
    status,
    data: loadedQuotes,
    error,
  } = useHttp(getAllQuotes, true);

  useEffect(() => {
    sendRequest();
  }, [sendRequest]);

  if (status === "pending") {
    return (
      <div className="centered">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return <p className="centered focused">{error}</p>;
  }

  // request has been sent successfully but we dont have a quote
  if (status === "completed" && (!loadedQuotes || loadedQuotes.length === 0)) {
    return <NoQuotesFound />;
  }

  return (
    <div>
      <h1>All Quotes Page</h1>
      <QuoteList quotes={loadedQuotes} />
    </div>
  );
};

export default AllQuotes;
