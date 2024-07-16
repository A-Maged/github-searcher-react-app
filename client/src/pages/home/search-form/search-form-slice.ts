import { createSlice } from "@reduxjs/toolkit";

export enum SearchFormSelectVal {
  Users = "users",
  Repos = "repos",
}

type SearchFormState = {
  inputVal: string;
  selectVal: SearchFormSelectVal;
};

const initialState: SearchFormState = {
  inputVal: "",
  selectVal: SearchFormSelectVal.Users,
};

export const searchFormSlice = createSlice({
  name: "searchForm",
  initialState,
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
