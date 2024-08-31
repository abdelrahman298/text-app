import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";

interface MiscellaneousState {
  toggleDeletePopUp: boolean;
  DeletedItem: number | null;
  toggleEditPopUp: boolean;
  EditedItem: number | null;
  showVideoPopUp: boolean;
  toggleLogOutPopUp: boolean;
  VideoSrc: string;
  lang: string;
  currentUserMenuTab: string;
}
const initialState: MiscellaneousState = {
  toggleDeletePopUp: false,
  DeletedItem: null,
  toggleEditPopUp: false,
  EditedItem: null,
  showVideoPopUp: false,
  toggleLogOutPopUp: false,
  VideoSrc: "",
  lang: "en",
  currentUserMenuTab: "",
};

export const MiscellaneousSlice = createSlice({
  name: "Miscellaneous",
  initialState,
  reducers: {
    setToggleDeletePopUp: (state, action: PayloadAction<boolean>) => {
      state.toggleDeletePopUp = action.payload;
    },
    setDeletedItem: (state, action: PayloadAction<number | null>) => {
      state.DeletedItem = action.payload;
    },
    setToggleEditPopUp: (state, action: PayloadAction<boolean>) => {
      state.toggleEditPopUp = action.payload;
    },
    setEditedItem: (state, action: PayloadAction<number>) => {
      state.EditedItem = action.payload;
    },
    setShowVideoPopUp: (state, action: PayloadAction<boolean>) => {
      state.showVideoPopUp = action.payload;
    },
    setToggleLogOutPopUp: (state, action: PayloadAction<boolean>) => {
      state.toggleLogOutPopUp = action.payload;
    },
    setVideoSrc: (state, action: PayloadAction<string>) => {
      state.VideoSrc = action.payload;
    },
    setLang: (state, action: PayloadAction<string>) => {
      state.lang = action.payload;
    },
    setCurrentUserMenuTab: (state, action: PayloadAction<string>) => {
      state.currentUserMenuTab = action.payload;
    },
  },
});

export default MiscellaneousSlice.reducer;
export const {
  setToggleDeletePopUp,
  setDeletedItem,
  setToggleEditPopUp,
  setEditedItem,
  setShowVideoPopUp,
  setToggleLogOutPopUp,
  setVideoSrc,
  setLang,
  setCurrentUserMenuTab,
} = MiscellaneousSlice.actions;
export const toggleDeletePopUp = (state: RootState) =>
  state.Miscellaneous.toggleDeletePopUp;
export const DeletedItem = (state: RootState) =>
  state.Miscellaneous.DeletedItem;
export const toggleEditPopUp = (state: RootState) =>
  state.Miscellaneous.toggleEditPopUp;
export const EditedItem = (state: RootState) => state.Miscellaneous.EditedItem;
export const showVideoPopUp = (state: RootState) =>
  state.Miscellaneous.showVideoPopUp;
export const toggleLogOutPopUp = (state: RootState) =>
  state.Miscellaneous.toggleLogOutPopUp;
export const VideoSrc = (state: RootState) => state.Miscellaneous.VideoSrc;
export const lang = (state: RootState) => state.Miscellaneous.lang;
export const currentUserMenuTab = (state: RootState) =>
  state.Miscellaneous.currentUserMenuTab;
