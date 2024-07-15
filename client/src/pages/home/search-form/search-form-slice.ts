import { createSlice } from "@reduxjs/toolkit";

export const searchFormSlice = createSlice({
  name: "searchForm",
  initialState: {
    inputVal: "",
    selectVal: "users",
  },
  reducers: {
    setInputVal: (state, action) => {
      state.inputVal = action.payload;
    },
    setSelectVal: (state, action) => {
      state.selectVal = action.payload;
    },
  },
});

export const searchFormSliceActions = searchFormSlice.actions;
