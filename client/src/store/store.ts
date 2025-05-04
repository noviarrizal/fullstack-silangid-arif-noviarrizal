import { configureStore } from '@reduxjs/toolkit';
import loginReducer from '@/pages/Login/loginSlice';
import homeReducer from '@/pages/Home/homeSlice';
import userReducer from '@/pages/User/userSlice';

export const store = configureStore({
    reducer: {
        login: loginReducer,
        home: homeReducer,
        user: userReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;