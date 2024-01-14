import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserInterface } from "../../../../src/interfaces/userInterface";



export interface UserState {
    currentUser: UserInterface | null;
    loading: boolean;
  }
  

  const initialState: UserState = {
    currentUser: null,
    loading: false,
  };
  
  const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
      setCurrentUser(state, action: PayloadAction<UserInterface | null>) {
        state.currentUser = action.payload;
        console.log("Current user from userslice:", state.currentUser);
      },
      setLoading(state, action: PayloadAction<boolean>) {
        state.loading = action.payload;
      },
      signOut(state) {
        state.currentUser = null;
        
      }
    },
  });
  
  export const { setCurrentUser, setLoading , signOut } = userSlice.actions;
  export default userSlice.reducer;

  