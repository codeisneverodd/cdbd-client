"use client";
import React, { useCallback, useMemo } from "react";
import styles from "./styles.module.scss";
import Gallery from "./layout/Gallery";
import LayoutImage from "./layout/LayoutImage";
import Video from "./layout/Video";
import Contact from "./layout/Contact";
import Margin from "./layout/Margin";
import Code from "./layout/Code";
import LayoutLink from "./layout/LayoutLink";
import Location from "./layout/Location";
import Qna from "./layout/Qna";
import Profile from "./layout/Profile";
import Sns from "./layout/Sns";
import Text from "./layout/Text";
import { useAppSelector } from "@/redux/hooks";
import {
  selectBlocks,
  selectSelectedBlock,
} from "@/redux/features/BlockData/blockDataSlice";
import PageTheme from "./layout/PageTheme";
import Logo from "./layout/invitation/Logo";
import MainImage from "./layout/invitation/MainImage";

import iconTextStar from "/public/images/block-icon-primary-Title Text.svg";
import iconText from "/public/images/block-icon-primary-Text.svg";
import EventSchedule from "./layout/invitation/EventSchedule";
import MainCover from "./layout/catalog/MainCover";
import ProductDetail from "./layout/catalog/ProductDetail";
import Cover from "./layout/newsletter/Cover";
import NewsletterText from "./layout/newsletter/NewsletterText";
import NewsletterImage from "./layout/newsletter/NewsletterImage";
import NewsletterVideo from "./layout/newsletter/NewsletterVideo";
import NewsletterButton from "./layout/newsletter/NewsletterButton";
import Index from "./layout/newsletter/Index";

export default function DesignBox() {
  const blocks = useAppSelector(selectBlocks);
  const selectedBlockId = useAppSelector(selectSelectedBlock);
  const showAppTheme = useAppSelector(
    (state) => state.blockData.present.showAppTheme
  );

  const selectedBlockType = useMemo(
    () => blocks.find((block) => block.id === selectedBlockId)?.type,
    [blocks, selectedBlockId]
  );

  const Layout = useCallback(() => {
    if (showAppTheme) {
      return <PageTheme />;
    }
    switch (selectedBlockType) {
      case "gallery":
        return <Gallery />;
      case "text":
        return <Text />;
      case "image":
        return <LayoutImage />;
      case "video":
        return <Video />;
      case "contact":
        return <Contact />;
      case "margin":
        return <Margin />;
      case "code":
        return <Code />;
      case "link":
        return <LayoutLink />;
      case "location":
        return <Location />;
      case "qna":
        return <Qna />;
      case "profile":
        return <Profile />;
      case "sns":
        return <Sns />;

      // NOTE: added new card(block) list
      case "logo":
        return <Logo />;
      case "mainImage":
        return <MainImage />;
      case "eventTitle":
        return <Text title="행사 이름" icon={iconTextStar} />;
      case "eventText":
        return <Text title="행사 소개" icon={iconText} />;
      case "eventDate":
        return <EventSchedule />;
      case "eventLocation":
        return <Location title="행사장 위치" />;
      case "subImage":
        return <LayoutImage title="서브 이미지" />;
      case "subVideo":
        return <Video title="서브 동영상" />;
      case "eventQna":
        return <Qna title="참석 응답 받기" />;
      case "eventContact":
        return <Contact title="행사 안내 연락처" />;
      case "eventSns":
        return <Sns title="추가 채널 안내" additional/>;

      case "mainCover":
        return <MainCover />;
      case "catalogTitle":
        return <Text title="카탈로그 타이틀" icon={iconTextStar} />;
      case "productDetail":
        return <ProductDetail />;
      case "productDescription":
        return <Text title="상품 소개" icon={iconText} />;
      case "productImage":
        return <Gallery title="상품 이미지" />;
      case "productVideo":
        return <Video title="상품 영상" />;
      case "productInquiry":
        return <Qna title="상품 문의 받기" />;
      case "catalogContact":
        return <Contact title="연락처 안내" />;

      case "cover":
        return <Cover />;
      case "index":
        return <Index />;
      case "newsletterText":
        return <NewsletterText />;
      case "newsletterImage":
        return <NewsletterImage />;
      case "newsletterVideo":
        return <NewsletterVideo />;
      case "newsletterButton":
        return <NewsletterButton />;
      case "newsletterQna":
        return <Qna title="의견 받기" />;
      case "newsletterContact":
        return <Contact title="발행인 연락처" />;

      case "businessCardContact":
        return <Sns title="직통 연락처" additional contact/>;
      default:
        return null;
    }
  }, [selectedBlockType, showAppTheme]);

  if (!selectedBlockType) {
    return null;
  }

  return (
    <>
      <section className={styles.designBoxWrap}>
        <Layout />
        {/* <PageTheme/> */}
        {/* <Text /> */}
        {/* <Gallery /> */}
        {/* <LayoutImage /> */}
        {/* <LayoutLink /> */}
        {/* <Video /> */}
        {/* <Code /> */}
        {/* <Location /> */}
        {/* <Margin /> */}
        {/* <Contact /> */}
        {/* <Qna /> */}
        {/* <Profile /> */}
        {/* <Sns /> */}
      </section>
    </>
  );
}
