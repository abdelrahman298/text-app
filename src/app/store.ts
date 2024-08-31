import { configureStore } from "@reduxjs/toolkit";

import AuthenticationReducer from "./Features/AuthenticationSlice";
import MiscellaneousReducer from "./Features/MiscellaneousSlice";

export const store = configureStore({
  reducer: {
    Authentication: AuthenticationReducer,
    Miscellaneous: MiscellaneousReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
