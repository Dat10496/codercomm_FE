import apiService from "../../app/apiService";
import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { cloudinaryUpload } from "../../utils/cloudinary";

const initialState = {
  isLoading: false,
  error: null,
  updatedProfile: null,
  selectedUser: null,
};

const slice = createSlice({
  name: "user",
  initialState,
  reducers: {
    startLoading(state) {
      state.isLoading = true;
    },
    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
    getUserSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      state.selectedUser = action.payload;
    },
    updateUserProfileSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      state.updatedProfile = action.payload;
      // console.log(action.payload);
    },
  },
});

export default slice.reducer;

export const getUser =
  ({ userId }) =>
  async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await apiService.get(`/users/${userId}`);
      dispatch(slice.actions.getUserSuccess(response.data.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error.message));
      toast.error(error.message);
    }
  };

export const updateUserProfile =
  ({
    userId,
    name,
    avatarUrl,
    coverUrl,
    aboutMe,
    city,
    country,
    company,
    jobTitle,
    facebookLink,
    instagramLink,
    linkedinLink,
    twitterLink,
  }) =>
  async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const data = {
        name,
        coverUrl,
        aboutMe,
        city,
        country,
        company,
        jobTitle,
        facebookLink,
        instagramLink,
        linkedinLink,
        twitterLink,
        avatarUrl,
      };
      if (avatarUrl instanceof File) {
        console.log(avatarUrl, "hihi");
        const imgUrl = await cloudinaryUpload(avatarUrl);
        data.avatarUrl = imgUrl;
      }
      const response = await apiService.put(`/users/${userId}`, data);
      dispatch(slice.actions.updateUserProfileSuccess(response.data.data));
      toast.success("Update Profile Successfully");
    } catch (error) {
      dispatch(slice.actions.hasError(error.message));
      toast.error(error.message);
    }
  };
