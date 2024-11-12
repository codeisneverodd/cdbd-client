import { configureStore } from "@reduxjs/toolkit";
import blockDataReducer from "./features/BlockData/blockDataSlice";
import modalSlice from "./features/Modal/modalSlice";
import reduxUndo from "redux-undo";

export const makeStore = () => {
  return configureStore({
    reducer: {
      blockData: reduxUndo(blockDataReducer),
      modal: modalSlice,
    },
    devTools: {
      name: "CdBd",
    },
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
