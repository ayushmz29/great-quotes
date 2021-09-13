import React, { useEffect } from "react";
import QuoteForm from "../components/quotes/QuoteForm";
import { useHistory } from "react-router-dom";
import useHttp from "../hooks/use-http";
import { addQuote } from "../lib/api";

const NewQuote = () => {
  // using custom hook here
  const { sendRequest, status } = useHttp(addQuote);

  // useHistory returns an history object
  const history = useHistory();

  useEffect(() => {
    if (status === "completed") {
      history.push("/quotes");
    }
  }, [status, history]);

  const addQuoteHandler = (quoteData) => {
    // console.log(quoteData);

    // send this 'quoteData' to server
    sendRequest(quoteData);
  };

  return (
    <div>
      <h1>New Quotes Page</h1>
      <QuoteForm
        isLoading={status === "pending" ? true : false}
        onAddQuote={addQuoteHandler}
      />
    </div>
  );
};

export default NewQuote;
