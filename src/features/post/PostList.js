import { LoadingButton } from "@mui/lab";
import { Typography, Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import PostCard from "./PostCard";
import { getPosts } from "./postSlice";

function PostList({ userId }) {
  const [page, setPage] = useState(1);
  const { currentPagePosts, postsById, isLoading, totalPost } = useSelector(
    (state) => state.post
  );

  const posts = currentPagePosts.map((postId) => postsById[postId]);

  const dispatch = useDispatch();

  useEffect(() => {
    if (userId) dispatch(getPosts({ userId, page }));
  }, [userId, page, dispatch]);

  return (
    <>
      {posts.map((post) => (
        <PostCard key={post._id} post={post} />
      ))}
      {totalPost ? (
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <LoadingButton
            variant="outlined"
            size="small"
            loading={isLoading}
            onClick={() => setPage((page) => page + 1)}
            disabled={Boolean(totalPost) && posts.length >= totalPost}
          >
            Load more
          </LoadingButton>
        </Box>
      ) : (
        <Typography variant="h6">No Post yet</Typography>
      )}
    </>
  );
}

export default PostList;
