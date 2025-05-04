import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "@/store/store";
import { User } from "@/lib/api/homeService/homeServiceResponse";

export interface IHomeState {
  isLoading: boolean;
  isDoubleSubmit: boolean;
  isSubmitting?: boolean;
  errorMessage?: string;
  userList: User[];
}

const initialState: IHomeState = {
  isLoading: false,
  isDoubleSubmit: false,
  isSubmitting: false,
  errorMessage: "",
  userList: [],
};

export const homeSlice = createSlice({
  name: "home",
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setDoubleSubmit: (state, action: PayloadAction<boolean>) => {
      state.isDoubleSubmit = action.payload;
    },
    setSubmitting: (state, action: PayloadAction<boolean>) => {
      state.isSubmitting = action.payload;
    },
    setErrorMessage: (state, action: PayloadAction<string>) => {
      state.errorMessage = action.payload;
    },
    setDataUser: (state, action: PayloadAction<User[]>) => {
      state.userList = action.payload;
    },
  },
});

export const {
  // Action
  setLoading,
  setDoubleSubmit,
  setSubmitting,
  setErrorMessage,
  setDataUser
} = homeSlice.actions;

export const selectHomeState = (state: RootState) => state.home;

export default homeSlice.reducer;
