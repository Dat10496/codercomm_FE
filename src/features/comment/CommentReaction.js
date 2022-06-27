import { IconButton, Stack, Typography } from "@mui/material";
import React from "react";
import ThumbUpRoundedIcon from "@mui/icons-material/ThumbUpAltRounded";
import ThumbDownRoundedIcon from "@mui/icons-material/ThumbDownAltRounded";
import { sendCommentReaction } from "./commentSlice";
import { useDispatch } from "react-redux";

function CommentReaction({ comment }) {
  const dispatch = useDispatch();
  const handleClick = (emoji) => {
    dispatch(sendCommentReaction({ commentId: comment._id, emoji }));
  };
  return (
    <Stack direction="row" alignItems="center">
      <IconButton onClick={() => handleClick("like")}>
        <ThumbUpRoundedIcon sx={{ frontSize: 20, color: "primary.main" }} />
      </IconButton>
      <Typography>{comment.reactions.like}</Typography>
      <IconButton onClick={() => handleClick("dislike")}>
        <ThumbDownRoundedIcon sx={{ frontSize: 20, color: "error.main" }} />
      </IconButton>
      <Typography>{comment.reactions.dislike}</Typography>
    </Stack>
  );
}

export default CommentReaction;
