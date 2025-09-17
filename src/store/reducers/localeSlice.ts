import { createSlice } from "@reduxjs/toolkit";

export interface LangState {
  dir: string;
  lang: string;
}

const initialState: LangState = {
  dir: "rtl",
  lang: "ar",
};

export const localeSlice = createSlice({
  name: "locale",
  initialState,
  reducers: {
    changeLang: (state, action) => {
      state.dir = action.payload.dir;
      state.lang = action.payload.lang;
    },
  },
});

export const { changeLang } = localeSlice.actions;

export default localeSlice.reducer;
