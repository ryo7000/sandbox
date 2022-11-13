import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type User = {
  id: number;
  name: string;
  username: string;
  email: string;
};

export const usersSlice = createSlice({
  name: "user",
  initialState: {
    users: [] as User[],
  },
  reducers: {
    set: (state, action: PayloadAction<User[]>) => {
      state.users = action.payload;
    },
  },
});

export const { set } = usersSlice.actions;
export default usersSlice.reducer;
