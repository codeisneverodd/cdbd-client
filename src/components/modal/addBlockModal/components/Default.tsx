import { Stack, Divider, Button } from "@mui/material";
import React from "react";
import styles from "../index.module.scss";

import iconProfile from "/public/images/icon-block-profile.svg";
import iconText from "/public/images/icon-block-text.svg";
import iconGallery from "/public/images/icon-block-gallery.svg";
import iconImage from "/public/images/icon-block-image.svg";
import iconVideo from "/public/images/icon-block-video.svg";
import iconLink from "/public/images/icon-block-link.svg";
import iconLocation from "/public/images/icon-block-location.svg";
import iconQna from "/public/images/icon-block-qna.svg";
import iconInquiry from "/public/images/icon-block-inquiry.svg";
import iconSns from "/public/images/icon-block-sns.svg";
import iconMargin from "/public/images/icon-block-margin.svg";
import iconCode from "/public/images/icon-block-code.svg";
import Image from "next/image";
import BlockSelectButton from "./BlockSelectButton";

const blockButtonList = {
  groupTitle: "",
  list: [
    {
      title: "프로필",
      tooltipText: "브랜드 로고 또는 프로필 이미지와 소개 텍스트",
      icon: <Image src={iconProfile} alt="iconProfile" />,
    },
    {
      title: "텍스트",
      tooltipText: "자유롭게 작성하는 텍스트",
      icon: <Image src={iconText} alt="iconText" />,
    },
    {
      title: "갤러리",
      tooltipText: "여러 장의 이미지",
      icon: <Image src={iconGallery} alt="iconGallery" />,
    },
    {
      title: "이미지",
      tooltipText: "이미지 또는 GIF",
      icon: <Image src={iconImage} alt="iconImage" />,
    },
    {
      title: "동영상",
      tooltipText: "유튜브 또는 비메오 영상 불러오기",
      icon: <Image src={iconVideo} alt="iconVideo" />,
    },
    {
      title: "링크",
      tooltipText: "외부 링크로 연결하는 버튼",
      icon: <Image src={iconLink} alt="iconLink" />,
    },
    {
      title: "위치 안내",
      tooltipText: "지도 썸네일과 주소 안내",
      icon: <Image src={iconLocation} alt="iconLocation" />,
    },
    {
      title: "질문과 답변",
      tooltipText: "다양한 질문 유형으로 방문자의 답변 수집하기",
      icon: <Image src={iconQna} alt="iconQna" />,
    },
    {
      title: "문의하기",
      tooltipText: "전화하기 또는 이메일 보내기 버튼",
      icon: <Image src={iconInquiry} alt="iconInquiry" />,
    },
    {
      title: "SNS",
      tooltipText: "홈페이지와 각종 SNS 채널 연결 버튼",
      icon: <Image src={iconSns} alt="iconSns" />,
    },
    {
      title: "여백",
      tooltipText: "카드 사이의 여백 또는 구분선",
      icon: <Image src={iconMargin} alt="iconMargin" />,
    },
    {
      title: "코드",
      tooltipText: "자유롭게 추가하는 HTML 코드",
      icon: <Image src={iconCode} alt="iconCode" />,
    },
  ],
};

export default function Default() {

  const [toggleButton, setToggleButton] = React.useState(false);
  const handleToggleChange = () => {
    setToggleButton(!toggleButton);
  }

  return (
    <Stack className={styles.blockSelectListWrap}>
      <div className={styles.blockSelectList}>
        {blockButtonList.list.map((item) => (
          <div key={item.title}>
            <BlockSelectButton
              title={item.title}
              tooltipText={item.tooltipText}
              icon={item.icon}
              value={item.title}
              handleChange={handleToggleChange}
            />
          </div>
        ))}
      </div>
    </Stack>
  );
}
