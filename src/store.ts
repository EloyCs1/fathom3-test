import { configureStore } from "@reduxjs/toolkit";
import userReducer from "features/user/userSlice";
import { garageApi } from "services/garageApi";

export const store = configureStore({
  reducer: {
    user: userReducer,
    [garageApi.reducerPath]: garageApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(garageApi.middleware),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
