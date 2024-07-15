import { createSlice } from "@reduxjs/toolkit";

export const searchFormSlice = createSlice({
  name: "searchForm",
  initialState: {
    inputVal: "",
    selectVal: "users",
    page: 1,
  },
  reducers: {
    setInputVal: (state, action) => {
      state.inputVal = action.payload;

      /* reset page */
      state.page = 1;
    },
    setSelectVal: (state, action) => {
      state.selectVal = action.payload;

      /* reset page */
      state.page = 1;
    },
    setPage: (state, action) => {
      state.page = action.payload;
    },
  },
});

export const searchFormSliceActions = searchFormSlice.actions;
