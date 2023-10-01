import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: {},
  allUser: [],
};

const userReducer = createSlice({
  name: "user",
  initialState,
  reducers: {
    getData: (state, action) => {
      state.data = action.payload;
    },
    getAllUser: (state, action) => {
      state.allUser = action.payload;
    },
  },
});
export const { getData, getAllUser } = userReducer.actions;
export default userReducer.reducer;
