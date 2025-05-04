import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "@/store/store";
import { IUser, User } from "@/lib/api/homeService/homeServiceResponse";

export interface IUserState {
  isLoading: boolean;
  isDoubleSubmit: boolean;
  isSubmitting?: boolean;
  errorMessage?: string;
  userList: User[];
  userDetail: IUser
}

const initialState: IUserState = {
  isLoading: false,
  isDoubleSubmit: false,
  isSubmitting: false,
  errorMessage: "",
  userList: [],
  userDetail: {
    id: 0,
    name: '',
    email: '',
    email_verified_at: '',
    created_at: '',
    updated_at: ''
  },
};

export const userSlice = createSlice({
  name: "user",
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
    setDataUserDetail: (state, action: PayloadAction<IUser>) => {
      state.userDetail = action.payload;
    },
  },
});

export const {
  // Action
  setLoading,
  setDoubleSubmit,
  setSubmitting,
  setErrorMessage,
  setDataUser,
  setDataUserDetail,
} = userSlice.actions;

export const selectUserState = (state: RootState) => state.user;

export default userSlice.reducer;
