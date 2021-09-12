import { useState } from "react";
import { Prompt } from "react-router-dom";
import Card from "../UI/Card";
import LoadingSpinner from "../UI/LoadingSpinner";
import classes from "./QuoteForm.module.css";

const QuoteForm = ({ onAddQuote, isLoading }) => {
  const initialState = {
    author: "",
    text: "",
  };
  const [inputState, setInputState] = useState(initialState);

  const [formFocussed, setFormFocussed] = useState(false);

  const onInputHandler = (event) => {
    const { name, value } = event.target;

    setInputState({
      ...inputState,
      [name]: value,
    });
  };

  const finishEnteringHandler = () => {
    setFormFocussed(false);
  };

  const submitFormHandler = (event) => {
    event.preventDefault();
    // optional: Could validate here

    // console.log(inputState);

    onAddQuote(inputState);

    // clear inputs after form submission
    setInputState(initialState);
  };

  const formFocusedHandler = () => {
    setFormFocussed(true);
  };

  return (
    <>
      {/* Special Prompt Component 
          It needs two props :- 
          1. when(boolean value), defines whether to show the prompt or not
          2. message(function which returns the text need to be shown to the user),
              this function also takes 'location' argument which is an object which has the location of the page
              where user accidently clicked
      */}

      <Prompt
        when={formFocussed}
        message={(location) =>
          `Are you want you want to leave and go to ${location.pathname}? All your entered will be lost`
        }
      />

      <Card>
        <form
          className={classes.form}
          onSubmit={submitFormHandler}
          onFocus={formFocusedHandler}
        >
          {isLoading && (
            <div className={classes.loading}>
              <LoadingSpinner />
            </div>
          )}

          <div className={classes.control}>
            <label htmlFor="author">Author</label>
            <input
              type="text"
              id="author"
              name="author"
              value={inputState.author}
              onChange={onInputHandler}
            />
          </div>
          <div className={classes.control}>
            <label htmlFor="text">Text</label>
            <textarea
              id="text"
              rows="5"
              name="text"
              value={inputState.text}
              onChange={onInputHandler}
            ></textarea>
          </div>
          <div className={classes.actions}>
            <button className="btn" onClick={finishEnteringHandler}>
              Add Quote
            </button>
          </div>
        </form>
      </Card>
    </>
  );
};

export default QuoteForm;
