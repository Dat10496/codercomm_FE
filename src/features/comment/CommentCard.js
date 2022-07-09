import {
  Avatar,
  Button,
  Card,
  IconButton,
  Menu,
  MenuItem,
  Paper,
  Popover,
  Stack,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import { fDate } from "../../utils/formatTime";
import CommentReaction from "./CommentReaction";
import { useDispatch } from "react-redux";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { deleteComment } from "./commentSlice";
import useAuth from "../../hooks/useAuth";

function CommentCard({ comment }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [isConfirm, setIsConfirm] = useState(null);
  const open = Boolean(anchorEl);
  const dispatch = useDispatch();
  const commentId = comment._id;
  const { user } = useAuth();
  const userComment = comment.author._id === user._id;

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleConfirmClose = () => {
    setIsConfirm(null);
  };

  const handleDeleteComment = (e) => {
    setIsConfirm(e.currentTarget);
    setAnchorEl(null);
  };

  const handleConfirmDelete = (e) => {
    if (e === "YES") {
      dispatch(deleteComment({ commentId }));
    } else if (e === "CANCEL") {
      setIsConfirm(null);
      return;
    }
  };

  const renderConfirmDelete = (
    <Popover
      id={comment._id}
      open={Boolean(isConfirm)}
      anchorEl={isConfirm}
      onClose={handleConfirmClose}
      anchorOrigin={{
        vertical: "top",
        horizontal: "left",
      }}
      transformOrigin={{
        vertical: "center",
        horizontal: "right",
      }}
      sx={{
        borderRadius: 8,
      }}
    >
      <Card
        sx={{
          width: 300,
          height: 100,
          p: 1,
          alignContent: "center",
          justifyContent: "center",
          display: "flex",
          flexDirection: "column",
          backgroundColor: "#f5f3f0",
          borderRadius: 0,
        }}
      >
        <Typography
          variant="subtitle2"
          mt={1}
          justifyContent="center"
          display="flex"
        >
          Are you sure to delete this comment?
        </Typography>
        <Box sx={{ display: "flex", justifyContent: "center", p: 1 }}>
          <Button onClick={() => handleConfirmDelete("YES")}>Yes</Button>
          <Button onClick={() => handleConfirmDelete("CANCEL")}>Cancel</Button>
        </Box>
      </Card>
    </Popover>
  );

  const renderMenu = (
    <Menu
      id="menu-appbar"
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={open}
      onClose={handleMenuClose}
    >
      <MenuItem sx={{ my: 1 }} onClick={handleDeleteComment}>
        Delete Comment
      </MenuItem>
      {renderConfirmDelete}
    </Menu>
  );
  return (
    <Stack direction="row" spacing={2}>
      <Avatar alt={comment.author?.name} src={comment.author?.avatarUrl} />
      <Paper sx={{ p: 1.5, flexGrow: 1, backgroundColor: "#fff3e0" }}>
        <Stack
          direction="row"
          alignItems={{ sm: "center" }}
          justifyContent="space-between"
          sx={{ mb: 0.5 }}
        >
          <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
            {comment.author?.name}
          </Typography>
          <Typography variant="caption" sx={{ color: "text.disabled" }}>
            {fDate(comment.createdAt)}
          </Typography>
        </Stack>
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          {" "}
          {comment.content}
        </Typography>
        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <CommentReaction comment={comment} />
          {userComment && (
            <IconButton onClick={handleProfileMenuOpen}>
              <MoreVertIcon sx={{ frontSize: 30 }} />
            </IconButton>
          )}
          {renderMenu}
        </Box>
      </Paper>
    </Stack>
  );
}

export default CommentCard;
