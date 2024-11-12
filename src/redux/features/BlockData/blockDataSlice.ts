import React from "react";

import { RootState } from "@/redux/store";
import { DropResult } from "@hello-pangea/dnd";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import iconProfile from "/public/images/block-icon-profile.svg";
// import iconMore from "/public/images/icon-more.svg";
// import iconEdit from "/public/images/icon-edit.svg";
// import iconPlus from "/public/images/icon-plus-white.svg";
import iconGallery from "/public/images/block-icon-gallery.svg";
import iconText from "/public/images/block-icon-text.svg";
import iconDate from "/public/images/block-icon-date.svg";
import iconImage from "/public/images/block-icon-image.svg";
import iconVideo from "/public/images/block-icon-video.svg";
import iconLink from "/public/images/block-icon-link.svg";
import iconMargin from "/public/images/block-icon-margin.svg";
import iconQna from "/public/images/block-icon-qna.svg";
import iconSns from "/public/images/block-icon-sns.svg";
import iconMap from "/public/images/block-icon-map.svg";
import iconContact from "/public/images/block-icon-contact.svg";
import iconCode from "/public/images/block-icon-code.svg";
import iconIndex from "/public/images/block-icon-index.svg";

import iconMark from "/public/images/block-icon-mark.svg";
import iconImageStar from "/public/images/block-icon-image-star.svg";
import iconTextStar from "/public/images/block-icon-text-star.svg";
import iconGroup from "/public/images/block-icon-group.svg";

import {
  CodePreview,
  ContactPreview,
  GalleryPreview,
  ImagePreview,
  IndexPreview,
  LinkPreview,
  MapPreview,
  ProfilePreview,
  QnaPreview,
  SNSPreview,
  TextPreview,
  VideoPreview,
  WhiteSpacePreview,
} from "@/components/layout/PreviewFrame";
import { DragEndEvent } from "@dnd-kit/core";

export interface IData {
  question?: {
    title: string;
    type: string;
    options: {
      title: string;
      checked: boolean;
    }[];
  }[];
}

export interface blockDataState {
  showAppTheme: boolean;
  selectedBlockId?: string;
  style: any;
  blocks: {
    index: number;
    id: string;
    title: string;
    type: string;
    icon: string; //React.ReactElement<any, any>;
    active: boolean;
    disabled: boolean;
    previewText: string | null;
    wrapperStyle?: any;
    data?: IData;
    style?: any;
    value?: any;
  }[];
}

// Define the initial state using that type
export const initialBlockDataState: blockDataState = {
  showAppTheme: false,
  selectedBlockId: "0",
  style: {
    background: "#FAFAFA",
    color: "#000000",
    buttonColor: "#FFFFFF",
    fontFamily: "unset",
  },
  blocks: [
    {
      index: 0,
      id: "0",
      title: "프로필",
      type: "profile",
      icon: iconProfile,
      active: true,
      disabled: false,
      previewText: null,
      wrapperStyle: {
        backgroundImage: "",
        background: undefined,
        border: false,
        borderWidth: 1,
        borderColor: "#000000",
        margin: 0,
        padding: 0,
        BorderRight: 0,
      },
      style: {
        // background: undefined,
        border: false,
        borderWidth: 1,
        borderColor: "#000000",
        margin: 0,
        padding: 0,
        name: "이름",
        description: "간단한 소개글을 <br/>입력해 보세요",
        image: "",
        textAlign: "center",
        structure:[
          "profile",
          "poster",
        ],
        nameFontSize: 24,
        descriptionFontSize: 16,
        color: "#000000",
        aspectRatio: "1/1",
      },
      value: (style?: any, id?: string) => React.createElement(ProfilePreview, { style, id }),
    },
    {
      index: 1,
      id: "1",
      title: "갤러리",
      type: "gallery",
      icon: iconGallery,
      active: false,
      disabled: false,
      previewText: null,
      style: {
        column: 2
      },
      value: (style?: any, id?: string) => React.createElement(GalleryPreview, { style, id }),
    },
    {
      index: 2,
      id: "2",
      title: "텍스트",
      type: "text",
      icon: iconText,
      active: false,
      disabled: false,
      previewText: "이곳에서 텍스트를 입력하세요...",
      style: {
        text: "이곳에서 텍스트를 입력하세요...",
        fontSize: 16,
        fontWeight: "normal",
        lineHeight: 1.5,
        fontFamily: "inherit",
        color:"#000000",
        borderWidth: 1,
        // fontStyle: "normal",
        textDecoration: "none",
      },
      value: (style?: any, id?: string) => React.createElement(TextPreview, { style, id }),
    },
    {
      index: 3,
      id: "3",
      title: "이미지",
      type: "image",
      icon: iconImage,
      active: false,
      disabled: false,
      previewText: null,
      wrapperStyle: {
        backgroundImage: "",
        background: undefined,
        border: false,
        borderWidth: 1,
        borderColor: "#000000",
        margin: 0,
        padding: 10,
        BorderRight: 0,
      },
      style: {
        url: "/images/sample-image.jpg",
        alt: "",
        padding: 0,
        margin: 0,
      },
      value: (style?:any, id?: string) => React.createElement(ImagePreview, { style, id }),
    },
    {
      index: 4,
      id: "4",
      title: "동영상",
      type: "video",
      icon: iconVideo,
      active: false,
      disabled: false,
      previewText: null,
      wrapperStyle: {
        backgroundImage: "",
        background: undefined,
        border: false,
        borderWidth: 1,
        borderColor: "#000000",
        margin: 0,
        padding: 10,
        BorderRight: 0,
      },
      style: {
        url: "",
        mute: false,
        autoPlay: false,
        borderRadius: 10,
        background: "",
        border: false,
        borderWidth: 1,
        borderColor: "#000000",
        margin: 0,
        padding: 0,
      },
      value: (style: any, id?: string) => React.createElement(VideoPreview, { style, id }),
    },
    {
      index: 5,
      id: "5",
      title: "링크",
      type: "link",
      icon: iconLink,
      active: false,
      disabled: false,
      previewText: "이곳에서 텍스트를 입력하세요...",
      wrapperStyle: {
        backgroundImage: "",
        background: undefined,
        border: false,
        borderWidth: 1,
        borderColor: "#000000",
        margin: 0,
        padding: 10,
        BorderRight: 0,
      },
      style: {
        url: "",
        openNewTab: false,
        textColor: "#000000",
        buttonColor: "#ffffff",
        showBorder: false,
        borderRadius: 60,
        fontSize: 16,
        fontWeight: "normal",
        fontStyle: "normal",
        textDecoration: "none",
        background: "",
        border: false,
        borderWidth: 1,
        borderColor: "#000000",
        margin: 0,
        padding: 0,
      },
      value: (style?: any, id?: string) => React.createElement(LinkPreview, { style, id }),
    },
    {
      index: 6,
      id: "6",
      title: "여백",
      type: "margin",
      icon: iconMargin,
      active: false,
      disabled: false,
      previewText: null,
      style: {
        height: 30,
        lineHeight: 1,
        showLine: false,
        background: "",
        border: false,
        borderWidth: 1,
        borderColor: "#000000",
        margin: 0,
        padding: 0,
      },
      value: (style?: any, id?: string) => React.createElement(WhiteSpacePreview, { style, id }),
    },
    {
      index: 7,
      id: "7",
      title: "질문과 답변",
      type: "qna",
      icon: iconQna,
      active: false,
      disabled: false,
      previewText: null,
      data: {
        question: [{
          title: "Example: Choose from 1 below",
          type: "",
          options: [
            {
              title: "option 1",
              checked: false,
            },
            {
              title: "option 2",
              checked: true,
            },
            {
              title: "option 3",
              checked: false,
            }
          ],
        },
        {
          title: "Example: Choose from 2 below",
          type: "",
          options: [
            {
              title: "option 1",
              checked: false,
            },
            {
              title: "option 2",
              checked: true,
            },
            {
              title: "option 3",
              checked: false,
            }
          ],
        }],
      },
      style: {
        type: "Radio",
        question: [],
        textAlign: "left",
        multiple: false,
        background: "",
        border: false,
        borderWidth: 1,
        borderColor: "#000000",
        margin: 16,
        padding: 0,
      },
      value: (style?: any, id?: string) => React.createElement(QnaPreview, { style, id }),
    },
    {
      index: 8,
      id: "8",
      title: "SNS",
      type: "sns",
      icon: iconSns,
      active: false,
      disabled: false,
      previewText: null,
      style: {
        size: 24,
        color: "#000000",
        home: { show: true, value: "" },
        kakao: { show: false, value: "" },
        instagram: { show: true, value: "" },
        youtube: { show: true, value: "" },
        x: { show: true, value: "" },
        background: "",
        border: false,
        borderWidth: 1,
        borderColor: "#000000",
        margin: 0,
        padding: 0,
      },
      value: (style?: any, id?: string) => React.createElement(SNSPreview, { style, id }),
    },
    {
      index: 9,
      id: "9",
      title: "위치 안내",
      type: "location",
      icon: iconMap,
      active: false,
      disabled: false,
      previewText: null,
      style: {
        type: "google",
        zoom: 12,
        aspectRatio: "3/2",
        lat:'37.550263',
        lng:'126.9970831'
      },
      value: (style?: any, id?: string) => React.createElement(MapPreview, { style, id }),
    },
    {
      index: 10,
      id: "10",
      title: "문의하기",
      type: "contact",
      icon: iconContact,
      active: false,
      disabled: false,
      previewText: null,
      style: {
        contact: "",
        contactType: "email",
        openNewTab: false,
        textColor: "#000000",
        buttonColor: "#ffffff",
        showBorder: false,
        borderRadius: 60,
        fontSize: 16,
        fontWeight: "normal",
        fontStyle: "normal",
        textDecoration: "none",
        background: "",
        border: false,
        borderWidth: 1,
        borderColor: "#000000",
        margin: 0,
        padding: 0,
      },
      value: (style?: any, id?: string) => React.createElement(ContactPreview, { style, id }),
    },
    {
      index: 11,
      id: "11",
      title: "코드",
      type: "code",
      icon: iconCode,
      active: false,
      disabled: false,
      previewText: null,
      style: {
        code: `<h1> Hello World </h1>\n<p> This is a paragraph </p>`,
        background: "",
        border: false,
        borderWidth: 1,
        borderColor: "#000000",
        margin: 0,
        padding: 0,
      },
      value: (style?: any, id?: string) => React.createElement(CodePreview, { style, id }),
    },
    
    // NOTE: added new card(block) list
    {
      index: 12,
      id: "12",
      title: "로고",
      type: "logo",
      icon: iconMark,
      active: false,
      disabled: false,
      previewText: null,
      style: {
        url: "/images/sample-image.jpg",
        alt: "",
        padding: 0,
        margin: 0,
      },
      value: (style?:any, id?: string) => React.createElement(ImagePreview, { style, id }),
    },
    {
      index: 13,
      id: "13",
      title: "메인 이미지",
      type: "mainImage",
      icon: iconImageStar,
      active: false,
      disabled: false,
      previewText: null,

    },
    {
      index: 14,
      id: "14",
      title: "행사 이름",
      type: "eventTitle",
      icon: iconTextStar,
      active: false,
      disabled: false,
      previewText: null,
      style: {
        text: "행사 이름",
        fontSize: 16,
        fontWeight: "normal",
        lineHeight: 1.5,
        // fontStyle: "normal",
        textDecoration: "none",
      },
      value: (style?: any, id?: string) => React.createElement(TextPreview, { style, id }),
    },
    {
      index: 15,
      id: "15",
      title: "행사 소개",
      type: "eventText",
      icon: iconText,
      active: false,
      disabled: false,
      previewText: null,
      style: {
        text: "행사 소개",
        fontSize: 16,
        fontWeight: "normal",
        lineHeight: 1.5,
        // fontStyle: "normal",
        textDecoration: "none",
      },
      value: (style?: any, id?: string) => React.createElement(TextPreview, { style, id }),
    },
    {
      index: 16,
      id: "16",
      title: "행사 일정",
      type: "eventDate",
      icon: iconDate,
      active: false,
      disabled: false,
      previewText: null,
      style: {
        text: "행사 일정",
        fontSize: 16,
        fontWeight: "normal",
        lineHeight: 1.5,
        // fontStyle: "normal",
        textDecoration: "none",
      },
      value: (style?: any, id?: string) => React.createElement(TextPreview, { style, id }),
    },
    {
      index: 17,
      id: "17",
      title: "행사장 위치",
      type: "eventLocation",
      icon: iconMap,
      active: false,
      disabled: false,
      previewText: null,
      style: {
        type: "google",
      },
      value: (style?: any, id?: string) => React.createElement(MapPreview, { style, id }),
    },
    {
      index: 18,
      id: "18",
      title: "서브 이미지",
      type: "subImage",
      icon: iconImage,
      active: false,
      disabled: false,
      previewText: null,
      style: {
        url: "/images/sample-image.jpg",
        alt: "",
        padding: 0,
        margin: 0,
      },
      value: (style?:any, id?: string) => React.createElement(ImagePreview, { style, id }),
    },
    {
      index: 19,
      id: "19",
      title: "서브 동영상",
      type: "subVideo",
      icon: iconVideo,
      active: false,
      disabled: false,
      previewText: null,
      style: {
        url: "",
        mute: false,
        autoPlay: false,
        borderRadius: 10,
        background: "",
        border: false,
        borderWidth: 1,
        borderColor: "#000000",
        margin: 0,
        padding: 0,
      },
      value: (style: any, id?: string) => React.createElement(VideoPreview, { style, id }),
    },
    {
      index: 20,
      id: "20",
      title: "참석 응답 받기",
      type: "eventQna",
      icon: iconQna,
      active: false,
      disabled: false,
      previewText: null,
      style: {
        type: "Radio",
        question: [],
        textAlign: "left",
        multiple: false,
      },
      value: (style?: any) => React.createElement(QnaPreview, { style }),
    },
    {
      index: 21,
      id: "21",
      title: "행사 안내 연락처",
      type: "eventContact",
      icon: iconContact,
      active: false,
      disabled: false,
      previewText: null,
      style: {
        contact: "",
        contactType: "email",
        openNewTab: false,
        textColor: "#000000",
        buttonColor: "#ffffff",
        showBorder: false,
        borderWidth: 1,
        borderRadius: 60,
        fontSize: 16,
        fontWeight: "normal",
        fontStyle: "normal",
        textDecoration: "none",
      },
      value: (style?:any)=>React.createElement(ContactPreview, {style}),
    },
    {
      index: 22,
      id: "22",
      title: "추가 채널 안내",
      type: "eventSns",
      icon: iconSns,
      active: false,
      disabled: false,
      previewText: null,
      style: {
        size: 24,
        color: "#000000",
        home: { show: true, value: "" },
        mobile: { show: true, value: "" },
        email: { show: true, value: "" },
        kakao: { show: true, value: "" },
        instagram: { show: false, value: "" },
        youtube: { show: false, value: "" },
        x: { show: false, value: "" },
      },
      value: (style?: any) => React.createElement(SNSPreview, { style }),
    },

    {
      index: 23,
      id: "23",
      title: "메인 커버",
      type: "mainCover",
      icon: iconMark,
      active: false,
      disabled: false,
      previewText: null,
      style: {
        url: "/images/sample-image.jpg",
        alt: "",
        padding: 0,
        margin: 0,
      },
      value: (style?:any, id?: string) => React.createElement(ImagePreview, { style, id }),
    },
    {
      index: 24,
      id: "24",
      title: "카탈로그 타이틀",
      type: "catalogTitle",
      icon: iconTextStar,
      active: false,
      disabled: false,
      previewText: null,
      style: {
        text: "카탈로그 타이틀",
        fontSize: 16,
        fontWeight: "normal",
        lineHeight: 1.5,
        // fontStyle: "normal",
        textDecoration: "none",
      },
      value: (style?: any, id?: string) => React.createElement(TextPreview, { style, id }),
    },
    {
      index: 25,
      id: "25",
      title: "상품 상세",
      type: "productDetail",
      icon: iconGroup,
      active: false,
      disabled: false,
      previewText: null,
      value: React.createElement(GalleryPreview),
    },
    {
      index: 26,
      id: "26",
      title: "상품 소개",
      type: "productDescription",
      icon: iconText,
      active: false,
      disabled: false,
      previewText: null,
      style: {
        text: "상품 소개",
        fontSize: 16,
        fontWeight: "normal",
        lineHeight: 1.5,
        // fontStyle: "normal",
        textDecoration: "none",
      },
      value: (style?: any, id?: string) => React.createElement(TextPreview, { style, id }),
    },
    {
      index: 27,
      id: "27",
      title: "상품 이미지",
      type: "productImage",
      icon: iconImage,
      active: false,
      disabled: false,
      previewText: null,
      style: {
        url: "/images/sample-image.jpg",
        alt: "",
        padding: 0,
        margin: 0,
      },
      value: (style?:any, id?: string) => React.createElement(ImagePreview, { style, id }),
    },
    {
      index: 28,
      id: "28",
      title: "상품 영상",
      type: "productVideo",
      icon: iconVideo,
      active: false,
      disabled: false,
      previewText: null,
      style: {
        url: "",
        mute: false,
        autoPlay: false,
        borderRadius: 10,
        background: "",
        border: false,
        borderWidth: 1,
        borderColor: "#000000",
        margin: 0,
        padding: 0,
      },
      value: (style: any, id?: string) => React.createElement(VideoPreview, { style, id }),
    },
    {
      index: 29,
      id: "29",
      title: "상품 문의 받기",
      type: "productInquiry",
      icon: iconQna,
      active: false,
      disabled: false,
      previewText: null,
      style: {
        type: "Radio",
        question: [],
        textAlign: "left",
        multiple: false,
      },
      value: (style?: any) => React.createElement(QnaPreview, { style }),
    },
    {
      index: 30,
      id: "30",
      title: "행사 안내 연락처",
      type: "catalogContact",
      icon: iconContact,
      active: false,
      disabled: false,
      previewText: null,
      style: {
        contact: "",
        contactType: "email",
        openNewTab: false,
        textColor: "#000000",
        buttonColor: "#ffffff",
        showBorder: false,
        borderWidth: 1,
        borderRadius: 60,
        fontSize: 16,
        fontWeight: "normal",
        fontStyle: "normal",
        textDecoration: "none",
      },
      value: (style?:any)=>React.createElement(ContactPreview, {style}),
    },

    {
      index: 31,
      id: "31",
      title: "표지",
      type: "cover",
      icon: iconMark,
      active: false,
      disabled: false,
      previewText: null,
      style: {
        url: "/images/sample-image.jpg",
        alt: "",
        padding: 0,
        margin: 0,
      },
      value: (style?:any, id?: string) => React.createElement(ImagePreview, { style, id }),
    },
    {
      index: 32,
      id: "32",
      title: "목차",
      type: "index",
      icon: iconIndex,
      active: false,
      disabled: false,
      previewText: null,
      value: React.createElement(IndexPreview),
    },
    {
      index: 33,
      id: "33",
      title: "텍스트형",
      type: "newsletterText",
      icon: iconGroup,
      active: false,
      disabled: false,
      previewText: null,
      style: {
        text: "이곳에서 텍스트를 입력하세요...",
        fontSize: 16,
        fontWeight: "normal",
        lineHeight: 1.5,
        // fontStyle: "normal",
        textDecoration: "none",
      },
      value: (style?: any, id?: string) => React.createElement(TextPreview, { style, id }),
    },
    {
      index: 34,
      id: "34",
      title: "이미지형",
      type: "newsletterImage",
      icon: iconGroup,
      active: false,
      disabled: false,
      previewText: null,
      style: {
        url: "/images/sample-image.jpg",
        alt: "",
        padding: 0,
        margin: 0,
      },
      value: (style?:any, id?: string) => React.createElement(ImagePreview, { style, id }),
    },
    {
      index: 35,
      id: "35",
      title: "동영상형",
      type: "newsletterVideo",
      icon: iconGroup,
      active: false,
      disabled: false,
      previewText: null,
      style: {
        url: "",
        mute: false,
        autoPlay: false,
        borderRadius: 10,
        background: "",
        border: false,
        borderWidth: 1,
        borderColor: "#000000",
        margin: 0,
        padding: 0,
      },
      value: (style: any, id?: string) => React.createElement(VideoPreview, { style, id }),
    },
    {
      index: 36,
      id: "36",
      title: "버튼형",
      type: "newsletterButton",
      icon: iconGroup,
      active: false,
      disabled: false,
      previewText: "이곳에서 텍스트를 입력하세요...",
      style: {
        url: "",
        openNewTab: false,
        textColor: "#000000",
        buttonColor: "#ffffff",
        showBorder: false,
        borderWidth: 1,
        borderRadius: 60,
        fontSize: 16,
        fontWeight: "normal",
        fontStyle: "normal",
        textDecoration: "none",
      },
      value: (style?: any)=>React.createElement(LinkPreview, {style}),
    },
    {
      index: 37,
      id: "37",
      title: "의견 받기",
      type: "newsletterQna",
      icon: iconQna,
      active: false,
      disabled: false,
      previewText: null,
      style: {
        type: "Radio",
        question: [],
        textAlign: "left",
        multiple: false,
      },
      value: (style?: any) => React.createElement(QnaPreview, { style }),
    },
    {
      index: 38,
      id: "38",
      title: "발행인 연락처",
      type: "newsletterContact",
      icon: iconContact,
      active: false,
      disabled: false,
      previewText: null,
      style: {
        contact: "",
        contactType: "email",
        openNewTab: false,
        textColor: "#000000",
        buttonColor: "#ffffff",
        showBorder: false,
        borderWidth: 1,
        borderRadius: 60,
        fontSize: 16,
        fontWeight: "normal",
        fontStyle: "normal",
        textDecoration: "none",
      },
      value: (style?:any)=>React.createElement(ContactPreview, {style}),
    },

    {
      index: 39,
      id: "39",
      title: "프로필",
      type: "profile",
      icon: iconProfile,
      active: false,
      disabled: false,
      previewText: null,
      style: {
        text: "프로필",
        fontSize: 16,
        fontWeight: "normal",
        lineHeight: 1.5,
        // fontStyle: "normal",
        textDecoration: "none",
      },
      value: (style?:any, id?: string)=>React.createElement(TextPreview, { style, id }),
    },
    {
      index: 40,
      id: "40",
      title: "직통 연락처",
      type: "businessCardContact",
      icon: iconContact,
      active: false,
      disabled: false,
      previewText: null,
      style: {
        size: 24,
        color: "#000000",
        home: { show: false, value: "" },
        mobile: { show: true, value: "" },
        email: { show: true, value: "" },
        kakao: { show: false, value: "" },
        instagram: { show: false, value: "" },
        youtube: { show: false, value: "" },
        x: { show: false, value: "" },
      },
      value: (style?: any) => React.createElement(SNSPreview, { style }),
    },
  ],
};

export const blockDataSlice = createSlice({
  name: "blockData",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState: initialBlockDataState,
  reducers: {
    move: (state, action) => {
      const { active, over } = action.payload as DragEndEvent;

      const fromId = active.id;
      const toId = over?.id;

      const fromIndex = state.blocks.findIndex((block) => block.id === fromId);
      const toIndex = state.blocks.findIndex((block) => block.id === toId);

      if (fromIndex === -1 || toIndex === -1) {
        return state;
      }

      const dragBlock = state.blocks[fromIndex];
      const currentBlocks = state.blocks.filter(
        (block) => block.index !== fromIndex
      );

      state.blocks = [
        ...currentBlocks.slice(0, toIndex),
        dragBlock,
        ...currentBlocks.slice(toIndex, currentBlocks.length),
      ].map((block, index) => ({ ...block, index }));

      return state;
    },
    changePageStyle: (state, action) => {
      state.style = action.payload;
      return state;
    },
    changeStyle: (state, action) => {
      const { id, style, wrapperStyle } = action.payload;
      const targetBlock = state.blocks.find((block) => block.id === (id??state.selectedBlockId));
      if (targetBlock) {
        style ? (targetBlock.style = style):null;
        wrapperStyle ? (targetBlock.wrapperStyle = wrapperStyle):null;
      }

      return state;
    },
    changeText: (state, action) => { //add changeText to changeData
      const { id, text } = action.payload;
      const targetBlock = state.blocks.find((block) => block.id === id);

      if (targetBlock && targetBlock.type === "text") {
        targetBlock.previewText = text;
      }

      return state;
    },
    changeData: (state, action) => { //add changeText to changeData
      const { id, data } = action.payload;
      const targetBlock = state.blocks.find((block) => block.id === (id??state.selectedBlockId));

      if (targetBlock) {
        targetBlock.data = data;
      }

      return state;
    },
    changeBlockStatus: (state, action) => {
      const { id, disabled } = action.payload;
      const targetBlock = state.blocks.find((block) => block.id === id);

      if (targetBlock) {
        targetBlock.disabled = disabled;
      }

      return state;
    },
    selectBlock: (state, action: PayloadAction<string>) => {
      state.selectedBlockId = action.payload;
      state.showAppTheme = false;
      
      // make selected block active
      state.blocks = state.blocks.map((block) => ({
        ...block,
        active: block.id === action.payload,
      }));

      return state;
    },
    showAppTheme: (state, action: PayloadAction<boolean>) => {
      state.showAppTheme = action.payload;
      return state;
    },
  },
});

export const { move, selectBlock, changeStyle, showAppTheme, changePageStyle, changeText, changeBlockStatus, changeData } = blockDataSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectBlocks = (state: RootState) =>
  state.blockData.present.blocks;
export const selectSelectedBlock = (state: RootState) =>
  state.blockData.present.selectedBlockId;

export const selectHasPast = (state: RootState) =>
  state.blockData.past.length > 0;
export const selectHasFuture = (state: RootState) =>
  state.blockData.future.length > 0;

export default blockDataSlice.reducer;
