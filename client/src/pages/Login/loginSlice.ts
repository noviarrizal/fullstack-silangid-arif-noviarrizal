import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "@/store/store";

export interface ILoginState {
  isLoading: boolean;
  isDoubleSubmit: boolean;
  isSubmitting?: boolean;
  errorMessage?: string;
  dataUser: {
    id: number;
    name: string;
    email: string;
    created_at: string;
    updated_at: string;
  };
}

const initialState: ILoginState = {
  isLoading: false,
  isDoubleSubmit: false,
  isSubmitting: false,
  errorMessage: "",
  dataUser: {
    id: 0,
    name: "",
    email: "",
    created_at: "",
    updated_at: "",
  },
};

export const loginSlice = createSlice({
  name: "login",
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
    setDataUser: (state, action: PayloadAction<ILoginState["dataUser"]>) => {
      state.dataUser = action.payload;
    },
    setResetState: () => initialState,
  },
});

export const {
  // Action
  setLoading,
  setDoubleSubmit,
  setSubmitting,
  setErrorMessage,
  setDataUser,
  setResetState
} = loginSlice.actions;

export const selectLoginState = (state: RootState) => state.login;

export default loginSlice.reducer;
