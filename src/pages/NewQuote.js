import React from "react";
import QuoteForm from "../components/quotes/QuoteForm";
import { useHistory } from "react-router-dom";

const NewQuote = () => {
  // useHistory returns an history object
  const history = useHistory();

  const addQuoteHandler = (quoteData) => {
    // send this 'quoteData' to server

    console.log(quoteData);
    history.push("/quotes");
  };

  return (
    <div>
      <h1>New Quotes Page</h1>
      <QuoteForm onAddQuote={addQuoteHandler} />
    </div>
  );
};

export default NewQuote;
