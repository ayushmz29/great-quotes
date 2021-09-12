import React from "react";
import { useHistory, useLocation } from "react-router-dom";
import QuoteItem from "./QuoteItem";
import classes from "./QuoteList.module.css";

// sorting by Quote ID
/* COMPARE FUNCTION USAGE:
  function(a, b){return a - b}
When the sort() function compares two values, it sends the values to the compare function, 
and sorts the values according to the returned (negative, zero, positive) value.

If the result is negative a is sorted before b.

If the result is positive b is sorted before a.

If the result is 0 no changes are done with the sort order of the two values.

Example:

The compare function compares all the values in the array, two values at a time (a, b).

When comparing 40 and 100, the sort() method calls the compare function(40, 100).

The function calculates 40 - 100 (a - b), and since the result is negative (-60),  the sort function will sort 40 as a value lower than 100.
*/

const sortQuotes = (quotes, ascending) => {
  return quotes.sort((quoteA, quoteB) => {
    if (ascending) {
      return quoteA.id > quoteB.id ? 1 : -1;
    } else {
      return quoteA.id < quoteB.id ? 1 : -1;
    }
  });
};

const QuoteList = ({ quotes }) => {
  // useHistory returns an object which allows us to
  // change and manage URL
  const history = useHistory();

  // The useLocation hook is a function that returns the location object
  // that contains information about the current URL.
  // Inside this object we have 'search' property which holds the query parameter
  // Here, search: "?sort=asc" etc
  const location = useLocation();

  // Now to work with the query parameters easily(convert it into an object)
  // we need to use 'URLSearchParams' class which is built-in API in browsers
  // It returns an object from which we can extract our query parameters by keys
  const queryParams = new URLSearchParams(location.search);

  // URLSearchParams.get() :-
  // Returns the first value associated with the given search parameter.
  // here it will return the value of 'sort' (asc / desc)
  const isSortingAscending = queryParams.get("sort") === "asc" ? true : false;

  const changeSortingHandler = () => {
    // Using query paramaters in URL by using '?'
    // while we are in ASC mode show DESC mode in URL and vice versa
    history.push("/quotes/?sort=" + (isSortingAscending ? "desc" : "asc"));
  };

  const sortedQuotes = sortQuotes(quotes, isSortingAscending);

  return (
    <>
      <div className={classes["sorting"]}>
        <button onClick={changeSortingHandler}>
          Sort in {isSortingAscending ? "Descending" : "Ascending"} Order
        </button>
      </div>
      <ul className={classes.list}>
        {sortedQuotes.map((quote) => (
          <QuoteItem
            key={quote.id}
            id={quote.id}
            author={quote.author}
            text={quote.text}
          />
        ))}
      </ul>
    </>
  );
};

export default QuoteList;
