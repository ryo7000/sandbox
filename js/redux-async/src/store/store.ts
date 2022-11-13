import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "./user";

export const store = configureStore({
  reducer: {
    users: usersReducer,
  },
});
