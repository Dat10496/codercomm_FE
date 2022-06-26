import { Avatar, IconButton, Stack, TextField } from "@mui/material";
import React, { useState } from "react";
import useAuth from "../../hooks/useAuth";
import SendIcon from "@mui/icons-material/Send";
import { useDispatch } from "react-redux";
import { createComment } from "./commentSlice";

function CommentForm({ postId }) {
  const { user } = useAuth();
  const [content, setContent] = useState("");
  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createComment({ postId, content }));
    setContent("");
  };
  return (
    <form onSubmit={handleSubmit}>
      <Stack direction="row" alignItems="center">
        <Avatar src={user.avatarUrl} alt={user.name} />
        <TextField
          fullWidth
          size="small"
          value={content}
          placeholder="Write a comment..."
          onChange={(e) => setContent(e.target.value)}
          sx={{
            ml: 2,
            mr: 1,
            "& fieldset": {
              borderWidth: `1px !important`,
              borderColor: (theme) =>
                `${theme.palette.grey[500_32]} !important}`,
            },
          }}
        />
        <IconButton type="submit">
          <SendIcon sx={{ frontSize: 30 }} />
        </IconButton>
      </Stack>
    </form>
  );
}

export default CommentForm;
