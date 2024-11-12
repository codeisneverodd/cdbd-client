import { RootState } from "@/redux/store";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type BlockTypes =
  | "text"
  | "textLeft"
  | "textRight"
  | "textTopLeft"
  | "textTopRight"
  | "textBottomLeft"
  | "textBottomRight"
  | "title"
  | "subtitle"
  | "copy"
  | "image"
  | "youtube"
  | "ratingStar"
  | "playingCard"
  | "imageLeft"
  | "imageRight"
  | "imageTopLeft"
  | "imageTopRight"
  | "imageBottomLeft"
  | "imageBottomRight"
  | "logo"
  | "button"
  | "buttonLeft"
  | "buttonRight"
  | "divider"
  | "dividerLeft"
  | "dividerRight"
  | "social"
  | "socialLeft"
  | "socialRight"
  | "menu"
  | "form-complete"
  | "form-title"
  | "form-description"
  | "form-image"
  | "form-fields"
  | "form-privacy"
  | "form-button"
  /* BELOW ARE OLD TYPES */
  | "header-logo-title"
  | "header-row-from-logo"
  | "header-row-from-title"
  | "main-one-column"
  | "main-row-from-image"
  | "main-row-from-text"
  | "footer-info-social"
  | "footer-row-from-info"
  | "footer-row-from-social"
  /* ABOVE ARE OLD TYPES */
  | "lt-logo-title"
  | "lt-row-from-logo"
  | "lt-row-from-title"
  | "ct-contents-title"
  | "ca-contents-action"
  | "sc-sample-contents"
  | "bt-banner-title"
  | "1it-image-text"
  | "1it-row-from-image"
  | "1it-row-from-text"
  | "1c-one-column"
  | "1c-row-from-image"
  | "1c-row-from-text"
  | "2i-two-images"
  | "2t-two-texts"
  | "2b-two-buttons"
  | "2d-two-dividers"
  | "2it-image-text"
  | "2it-rows-from-image"
  | "2it-rows-from-text"
  | "2c-two-columns"
  | "2c-rows-from-image"
  | "2c-rows-from-text"
  | "2ct-two-columns-title"
  | "4it-four-image-text"
  | "4itt-four-image-text-title"
  | "bi-info-social"
  | "bi-row-from-info"
  | "bi-row-from-social"
  | "bl-row-from-logo"
  | "bl-row-from-social"
  | "bc-brand-copy-info"
  /* 2023 new block set 👇*/
  | "header-logo-title2"
  | "header-title-logo"
  | "header-logo-title-center"
  | "header-logo-title-desc-center"
  | "header-button-title"
  | "header-title-button"
  | "body-logo-title-img-desc-center"
  | "body-logo-title-img-desc-left"
  | "body-logo-title-img-desc-right"
  | "body-1-1-desc-desc"
  | "body-1-1-img-img"
  | "body-1-1-button-button"
  | "body-1-1-line-line"
  | "body-1-1-desc-button"
  | "body-1-1-button-desc"
  | "body-1-1-desc-img"
  | "body-1-1-button-img"
  | "body-1-1-desc-button-img"
  | "body-1-1-img-desc"
  | "body-1-1-img-button"
  | "body-1-1-img-desc-button"
  | "body-2-1-desc-desc"
  | "body-2-1-img-img"
  | "body-2-1-line-line"
  | "body-2-1-desc-button"
  | "body-2-1-img-desc"
  | "body-2-1-img-button"
  | "body-2-1-img-desc-button"
  | "body-1-2-desc-desc"
  | "body-1-2-img-img"
  | "body-1-2-line-line"
  | "body-1-2-desc-img"
  | "body-1-2-button-desc"
  | "body-1-2-button-img"
  | "body-1-2-desc-button-img"
  | "footer-1-2-logo-footerInfo"
  | "footer-2-1-footerInfo-logo"
  | "footer-logo-footerInfo-left"
  | "footer-logo-footerInfo-center"
  | "footer-logo-footerInfo-right";

export type SocialIconSize = "small" | "medium" | "large";

interface ContainerStyle {
  width?: string;
  backgroundColor?: string;
  backgroundSize?: string;
  backgroundPosition?: string;
  backgroundRepeat?: string;
  backgroundImage?: string;
  padding?: string;
  margin?: string;
  borderWidth?: string;
  borderStyle?: string;
  borderColor?: string;
  borderRadius?: string;
  align?: "center" | "left" | "right";
  size?: SocialIconSize;
}

export interface BlockState {
  id: string;
  type: BlockTypes;
  containerStyle: ContainerStyle;
  style: React.CSSProperties;
  value?: any;
  layout?: Record<string, any>;
  name?: string;
}

export interface PageState {
  id: string;
  type: string;
  style: React.CSSProperties;
  children: BlockState[];
}

// Define a type for the slice state
export interface DataState {
  isSaving: boolean;
  type: string;
  title: string;
  style: React.CSSProperties;
  children: PageState[];
}

// Define the initial state using that type
export const initialDataState: DataState = {
  isSaving: false,
  type: "project",
  title: "새로운 이메일 콘텐츠",
  style: {
    backgroundColor: "rgba(74, 144, 226, .08)",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundImage: "none",
  },
  children: [
    {
      id: "1",
      type: "page",
      style: {
        backgroundColor: "white",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundImage: "none",
        padding: "10px 10px 10px 10px",
      },
      children: [],
    },
  ],
};

export const dataSlice = createSlice({
  name: "data",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState: initialDataState,
  reducers: {
    move: (state, action) => {
      const { dragBlock, dragIndex, hoverIndex } = action.payload;

      const newPage = state.children[0];
      const currentBlocks = newPage.children;
      currentBlocks.splice(dragIndex, 1);

      return {
        ...state,
        isSaving: true,
        children: [
          {
            ...newPage,
            children: [
              ...currentBlocks.slice(0, hoverIndex),
              dragBlock,
              ...currentBlocks.slice(hoverIndex, currentBlocks.length),
            ],
          },
        ],
      };
    },
    // increment: state => {
    //   state.value += 1
    // },
    // decrement: state => {
    //   state.value -= 1
    // },
    // // Use the PayloadAction type to declare the contents of `action.payload`
    // incrementByAmount: (state, action: PayloadAction<number>) => {
    //   state.value += action.payload
    // }
  },
});

export const { move } = dataSlice.actions;

// Other code such as selectors can use the imported `RootState` type
// export const selectChildren = (state: RootState) => state.data.children;

export default dataSlice.reducer;
