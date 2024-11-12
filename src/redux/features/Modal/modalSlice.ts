import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export const modalSlice = createSlice({
  name: "modal",
  initialState: {
    showModal: false,
    modalType: "",
    fieldToSet: "" as string|undefined,
    forBlockId: undefined as string|undefined,
    isWrapper: false,
  },
  reducers: {
    showModal: (
      state,
      action: PayloadAction<{
        modalType: "addImage" | "addBlock" | "selectFont" | "selectColor";
        fieldToSet?: string,
        forBlockId?: string,
        isWrapper?: boolean,
      }>
    ) => {
      const { modalType, fieldToSet, forBlockId, isWrapper } = action.payload;
      state.showModal = true;
      state.modalType = modalType;
      state.fieldToSet = fieldToSet;
      state.forBlockId = forBlockId
      state.isWrapper = isWrapper??false;
    },
    hideModal: (state) => {
      state.showModal = false;
      state.modalType = "";
      state.fieldToSet = "";
      state.forBlockId = undefined;
    },
  },
});

export const { hideModal, showModal } = modalSlice.actions;

export default modalSlice.reducer;
