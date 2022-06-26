import apiService from "../../app/apiService";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  error: null,
};

const slice = createSlice({
  name: "friend",
  initialState,
  reducers: {},
});

export default slice.reducer;
