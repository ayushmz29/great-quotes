import React from "react";
import QuoteList from "../components/quotes/QuoteList";

// dummy quotes
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

const AllQuotes = () => {
  return (
    <div>
      <h1>All Quotes Page</h1>
      <QuoteList quotes={DUMMY_QUOTES} />
    </div>
  );
};

export default AllQuotes;
