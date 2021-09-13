import { useRef, useEffect } from "react";
import useHttp from "../../hooks/use-http";
import { addComment } from "../../lib/api";
import LoadingSpinner from "../UI/LoadingSpinner";

import classes from "./NewCommentForm.module.css";

const NewCommentForm = ({ onAddedComment, quoteId }) => {
  const commentTextRef = useRef();

  // using custom hook
  const { sendRequest, status, error } = useHttp(addComment);

  // using useEffect to let the 'Comments' component know that we
  // are done adding a comment (when status changes from "pending" to "completed",
  // call 'onAddComment' received as prop )
  useEffect(() => {
    // check if the status is completed and there is no error
    if (status === "completed" && !error) {
      onAddedComment();
    }
  }, [status, error, onAddedComment]);

  const submitFormHandler = (event) => {
    event.preventDefault();

    // optional: Could validate here

    // send comment to server
    // addComment function (sendRequest) needs comment data and quoteId 

    const enteredText = commentTextRef.current.value;

    sendRequest({
      commentData: {text: enteredText},
      quoteId: quoteId,
    });
  };

  return (
    <form className={classes.form} onSubmit={submitFormHandler}>
      {/* Show Loading Spinner when request is pending */}
      {status === "pending" && (
        <div className="centered">
          <LoadingSpinner />
        </div>
      )}

      <div className={classes.control} onSubmit={submitFormHandler}>
        <label htmlFor="comment">Your Comment</label>
        <textarea id="comment" rows="5" ref={commentTextRef}></textarea>
      </div>
      <div className={classes.actions}>
        <button className="btn">Add Comment</button>
      </div>
    </form>
  );
};

export default NewCommentForm;
