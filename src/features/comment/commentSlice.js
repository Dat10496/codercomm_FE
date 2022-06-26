import apiService from "../../app/apiService";
import { createSlice } from "@reduxjs/toolkit";
import { COMMENT_PER_POST } from "../../app/config";

const initialState = {
  isLoading: false,
  error: null,
  commentsById: {},
  commentsByPost: {},
  currentPageByPost: {},
  totalCommentsByPost: {},
};

const slice = createSlice({
  name: "comment",
  initialState,
  reducers: {
    startLoading(state) {
      state.isLoading = true;
    },
    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
    createCommentSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
    },
    getCommentSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      const { page, postId, count, comments } = action.payload;

      comments.forEach(
        (comment) => (state.commentsById[comment._id] = comments)
      );
      state.commentsByPost[postId] = comments
        .map((comment) => comment._id)
        .reverse();
      state.totalCommentsByPost[postId] = count;
      state.currentPageByPost[postId] = page;
    },
  },
});

export const createComment =
  ({ postId, content }) =>
  async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await apiService.post("/comments", { postId, content });
      dispatch(slice.actions.createCommentSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error.message));
    }
  };

export const getComments =
  ({ postId, page = 1, limit = COMMENT_PER_POST }) =>
  async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const params = { page: page, limit: limit };
      const response = await apiService.get(`/posts/${postId}/comments`, {
        params,
      });
      dispatch(
        slice.actions.getCommentSuccess({ ...response.data.data, postId, page })
      );
    } catch (error) {
      dispatch(slice.actions.hasError(error.message));
    }
  };

export default slice.reducer;
