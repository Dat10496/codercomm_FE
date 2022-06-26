import {
  Avatar,
  Card,
  CardHeader,
  IconButton,
  Link,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { fDate } from "../../utils/formatTime";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Box } from "@mui/system";
import PostReaction from "./PostReaction";
import CommentList from "../comment/CommentList";
import CommentForm from "../comment/CommentForm";

function PostCard({ post }) {
  return (
    <Card>
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
            {fDate(post?.author?.createdAt)}
          </Typography>
        }
        action={
          <IconButton>
            <MoreVertIcon sx={{ frontSize: 30 }} />
          </IconButton>
        }
      />
      <Stack spacing={2} sx={{ p: 3 }}>
        <Typography>{post.content}</Typography>
        {post.image && (
          <Box
            sx={{
              borderRadius: 2,
              overflow: "hidden",
              height: 300,
              "& img": { objectFit: "cover", width: 1, height: 1 },
            }}
          >
            <img src={post.image} alt={post} />
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
