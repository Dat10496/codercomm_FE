import {
  Avatar,
  Button,
  Card,
  CardHeader,
  IconButton,
  Link,
  Menu,
  MenuItem,
  Popover,
  Stack,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import { fDate } from "../../utils/formatTime";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Box } from "@mui/system";
import PostReaction from "./PostReaction";
import CommentList from "../comment/CommentList";
import CommentForm from "../comment/CommentForm";
import { useDispatch } from "react-redux";
import { deletePost } from "./postSlice";
import useAuth from "../../hooks/useAuth";
import PostFormEdit from "./PostFormEdit";

function PostCard({ post }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [isEditing, setIsEditing] = useState(null);
  const [isConfirm, setIsConfirm] = useState(null);
  const open = Boolean(anchorEl);
  const dispatch = useDispatch();
  const { user } = useAuth();

  const content = post.content;
  const image = post.image;

  const postId = post._id;
  const userPost = post.author._id === user._id;

  const handleConfirmClose = () => {
    setIsConfirm(null);
  };

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleDeletePost = (e) => {
    setIsConfirm(e.currentTarget);
    setAnchorEl(null);
  };

  const handleEditPost = (e) => {
    setAnchorEl(null);
    setIsEditing(e.currentTarget);
  };

  const handleFormEditClose = () => {
    setIsEditing(null);
  };

  const handleConfirmDelete = (e) => {
    if (e === "YES") {
      dispatch(deletePost({ postId }));
    } else if (e === "CANCEL") {
      setIsConfirm(null);
      return;
    }
  };

  const renderConfirmDelete = (
    <Popover
      id={post._id}
      open={Boolean(isConfirm)}
      anchorEl={isConfirm}
      onClose={handleConfirmClose}
      anchorOrigin={{
        vertical: "center",
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
          Are you sure to delete this post?
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
      <MenuItem sx={{ my: 1 }} onClick={handleDeletePost}>
        Delete Post
      </MenuItem>
      {renderConfirmDelete}
      <MenuItem sx={{ my: 1 }} onClick={handleEditPost}>
        Edit Post
      </MenuItem>
    </Menu>
  );

  return (
    <Card>
      <Popover
        id={post._id}
        open={Boolean(isEditing)}
        anchorEl={isEditing}
        onClose={handleFormEditClose}
        anchorOrigin={{
          vertical: "center",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "center",
          horizontal: "right",
        }}
      >
        <PostFormEdit handleFormEditClose={handleFormEditClose} post={post} />
      </Popover>
      <CardHeader
        disableTypography
        avatar={
          <Avatar src={post?.author?.avatarUrl} alt={post?.author?.avatarUrl} />
        }
        title={
          <Link
            variant="subtitle2"
            color="text.primary"
            component={RouterLink}
            to={`/user/${post.author._id}`}
          >
            {post?.author?.name}{" "}
          </Link>
        }
        subheader={
          <Typography
            variant="caption"
            sx={{ display: "block", color: "text.secondary" }}
          >
            {fDate(post?.createdAt)}
          </Typography>
        }
        action={
          userPost && (
            <IconButton onClick={handleProfileMenuOpen}>
              <MoreVertIcon sx={{ frontSize: 30 }} />
            </IconButton>
          )
        }
      />
      {renderMenu}

      <Stack spacing={2} sx={{ p: 3 }}>
        <Typography>{content}</Typography>
        {image && (
          <Box
            sx={{
              borderRadius: 2,
              overflow: "hidden",
              height: 300,
              "& img": { objectFit: "cover", width: 1, height: 1 },
            }}
          >
            <img src={image} alt={content} />
          </Box>
        )}

        <PostReaction post={post} />
        <CommentList postId={post._id} />
        <CommentForm postId={post._id} />
      </Stack>
    </Card>
  );
}

export default PostCard;
