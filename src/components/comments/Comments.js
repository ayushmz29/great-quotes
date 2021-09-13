import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useHttp from "../../hooks/use-http";
import { getAllComments } from "../../lib/api";
import LoadingSpinner from "../UI/LoadingSpinner";
import classes from "./Comments.module.css";
import CommentsList from "./CommentsList";
import NewCommentForm from "./NewCommentForm";

const Comments = () => {
  const [isAddingComment, setIsAddingComment] = useState(false);

  const params = useParams();

  // using object destructuring so we dont have to include the whole
  // params object into the dependency list of useEffect
  const { quoteId } = params;

  // using custom hook
  const { sendRequest, status, data: loadedComments } = useHttp(getAllComments);

  useEffect(() => {
    // function 'getAllComments'(sendRequest) needs to know the id for which all comments are loaded
    sendRequest(quoteId);
  }, [sendRequest, quoteId]);

  const startAddCommentHandler = () => {
    setIsAddingComment(true);
  };

  // run this function when comment is successfully added to the db
  /* USECALLBACK usage reason :-
    useCallback will return a memoized version of the callback that 
    only changes if one of the dependencies changes. 
    So it returns us the memoized version of the addCommentHandler only 
    and it will only get recreated if either of the two (sendRequest or the quoteId) or both changes.
  */
  const addedCommentHandler = useCallback(() => {
    sendRequest(quoteId)
  }, [sendRequest, quoteId]);

  let comments;
  if (status === "pending") {
    comments = (
      <div className="centered">
        <LoadingSpinner />
      </div>
    );
  }

  // request is completed and we do have comments then
  if (status === "completed" && loadedComments && loadedComments.length > 0) {
    comments = <CommentsList comments={loadedComments} />;
  }

  if (
    status === "completed" &&
    (!loadedComments || loadedComments.length === 0)
  ) {
    comments = <p className="centered">No Comments were added yet !</p>;
  }

  return (
    <section className={classes.comments}>
      <h2>User Comments</h2>
      {!isAddingComment && (
        <button className="btn" onClick={startAddCommentHandler}>
          Add a Comment
        </button>
      )}
      {isAddingComment && (
        <NewCommentForm
          quoteId={params.quoteId}
          onAddedComment={addedCommentHandler}
        />
      )}

      {comments}

    </section>
  );
};

export default Comments;
