import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import { IUserData } from "@/types";

interface AuthenticationState {
  Authorized: string | null;
  Token: string | null;
  Id: number | null | undefined;
  userData: IUserData | null;
  showLoginPopUp: boolean;
}
//let name1: string = person.name!;
const initialState: AuthenticationState = {
  Authorized: JSON.parse(localStorage.getItem("userData"))?.token || null,
  Token: JSON.parse(localStorage.getItem("Token") as string) || null,
  // ! id  to check profile
  Id: JSON.parse(localStorage.getItem("Id")) || null,
  userData: JSON.parse(localStorage.getItem("userData")) || null,
  showLoginPopUp: false,
};

export const AuthorizedSlice = createSlice({
  name: "Authorized",
  initialState,
  reducers: {
    /* setAuthorized: (state, action) => {
      state.Authorized = action.payload;
    }, */
    setToken: (state, action: PayloadAction<string | null>) => {
      state.Token = action.payload;
    },
    //! id to check in profile
    setId: (state, action: PayloadAction<number | null>) => {
      state.Id = action.payload;
    },
    setUserData: (state, action: PayloadAction<IUserData | null>) => {
      state.userData = action.payload;
    },
    setShowLoginPopUp: (state, action: PayloadAction<boolean>) => {
      state.showLoginPopUp = action.payload;
    },
  },
});

export default AuthorizedSlice.reducer;
export const { setUserData, setToken, setId, setShowLoginPopUp } =
  AuthorizedSlice.actions;
//export const Authorized = (state: RootState) => state.Authentication.Authorized;
export const Token = (state: RootState) => state.Authentication.Token;
export const Id = (state: RootState) => state.Authentication.Id;
export const userData = (state: RootState) => state.Authentication.userData;
export const showLoginPopUp = (state: RootState) =>
  state.Authentication.showLoginPopUp;
