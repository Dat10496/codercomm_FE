import React from "react";

function CommentCard({ comment }) {
  //   console.log(comment);
  return <div>{comment.map((comment) => comment.content)}</div>;
}

export default CommentCard;
