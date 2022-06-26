import { IconButton, Stack, Typography } from "@mui/material";
import React from "react";
import ThumbUpRoundedIcon from "@mui/icons-material/ThumbUpAltRounded";
import ThumbDownRoundedIcon from "@mui/icons-material/ThumbDownAltRounded";

function PostReaction({ post }) {
  const handleClick = (emoji) => {
    console.log(emoji);
  };
  return (
    <Stack direction="row" alignItems="center">
      <IconButton onClick={() => handleClick("like")}>
        <ThumbUpRoundedIcon sx={{ frontSize: 20, color: "primary.main" }} />
      </IconButton>
      <Typography>{post.reactions.like}</Typography>
      <IconButton onClick={() => handleClick("dislike")}>
        <ThumbDownRoundedIcon sx={{ frontSize: 20, color: "error.main" }} />
      </IconButton>
      <Typography>{post.reactions.dislike}</Typography>
    </Stack>
  );
}

export default PostReaction;
