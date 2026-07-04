import { createSlice } from "@reduxjs/toolkit";
const tweetSlice = createSlice({
  name: "tweet",
  initialState: {
    tweets: null,
    refresh: false,
    isActive: true,
  },
  reducers: {
    getAllTweets: (state, action) => {
      state.tweets = action.payload;
    },
    getRefresh: (state) => {
      state.refresh = !state.refresh;
    },
    getIsActive: (state, actions) => {
      state.isActive = actions.payload;
    },
  },
});
export const { getAllTweets, getRefresh, getIsActive } = tweetSlice.actions;
export default tweetSlice.reducer;
