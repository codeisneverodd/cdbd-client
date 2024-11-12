import { Stack } from "@mui/material";
import React, { useEffect, useState } from "react";
import styles from "../index.module.scss";


import iconTextStar from "/public/images/icon-block-text-star.svg";
import iconImageStar from "/public/images/icon-block-image-star.svg";
import iconLayout from "/public/images/icon-block-layout.svg";
import iconText from "/public/images/icon-block-text.svg";
import iconInquiry from "/public/images/icon-block-inquiry.svg";
import iconQna from "/public/images/icon-block-qna.svg";
import iconSns from "/public/images/icon-block-sns.svg";
import iconGallery from "/public/images/icon-block-gallery.svg";
import iconVideo from "/public/images/icon-block-video.svg";
import Image from "next/image";
import BlockSelectButton from "./BlockSelectButton";

function ToggleLayout() {
  return (
    <div className={styles.toggleLayout}>
      <p className="h5">레이아웃 타입 선택하기</p>
      <ul>
        <li>sample1</li>
        <li>sample2</li>
        <li>sample3</li>
        <li>sample4</li>
      </ul>
    </div>
  );
}

type BlockButtonList = {
  groupTitle: string;
  list: {
    title: string;
    tooltipText: string;
    icon: React.JSX.Element;
    toggleLayout?: React.JSX.Element | null;
    active: boolean;
  }[];
}[];

const blockButtonList: BlockButtonList = [
  {
    groupTitle: "시작할 때",
    list: [
      {
        title: "메인 커버",
        tooltipText: "행사를 대표하는 이미지",
        icon: <Image src={iconImageStar} alt="iconImageStar" />,
        toggleLayout: <ToggleLayout />,
        active: false,
      },
      {
        title: "카탈로그 타이틀",
        tooltipText: "페이지 메인 타이틀 텍스트",
        icon: <Image src={iconTextStar} alt="iconTextStar" />,
        toggleLayout: <ToggleLayout />,
        active: false,
      },
    ],
  },
  {
    groupTitle: "상세 내용을 구성할 때",
    list: [
      {
        title: "상품 상세",
        tooltipText: "상세 페이지 연결이 가능한 상품 상세 안내",
        icon: <Image src={iconLayout} alt="iconLayout" />,
        toggleLayout: <ToggleLayout />,
        active: false,
      },
    ],
  },
  {
    groupTitle: "더 다양한 내용을 위해",
    list: [
      {
        title: "상품 소개",
        tooltipText: "텍스트로 상품 안내",
        icon: <Image src={iconText} alt="iconText" />,
        toggleLayout: <ToggleLayout />,
        active: false,
      },
      {
        title: "상품 이미지",
        tooltipText: "여러 장의 이미지로 상품 안내",
        icon: <Image src={iconGallery} alt="iconGallery" />,

        toggleLayout: <ToggleLayout />,
        active: false,
      },
      {
        title: "상품 영상",
        tooltipText: "동영상으로 상품 안내",
        icon: <Image src={iconVideo} alt="iconVideo" />,
        toggleLayout: <ToggleLayout />,
        active: false,
      },
    ],
  },
  {
    groupTitle: "마무리할 때",
    list: [
      {
        title: "상품 문의 받기",
        tooltipText: "상품에 대한 의견 받기",
        icon: <Image src={iconQna} alt="iconQna" />,
        toggleLayout: null,
        active: false,
      },
      {
        title: "행사 안내 연락처",
        tooltipText: "구입 문의를 위한 연락처 안내",
        icon: <Image src={iconInquiry} alt="iconInquiry" />,
        toggleLayout: null,
        active: false,
      },
      {
        title: "추가 채널 안내",
        tooltipText: "홈페이지와 각종 SNS 채널 연결 버튼",
        icon: <Image src={iconSns} alt="iconSns" />,
        toggleLayout: null,
        active: false,
      },
    ],
  },
];

export default function Catalog() {

  const handleToggleChange = (index: number, itemIndex: number) => {
    if (listData) {
      const copyData = [...listData];
      copyData.forEach((item) =>
        item.list.forEach((listItem) => (listItem.active = false))
      );
      copyData[index].list[itemIndex].active =
        !listData[index].list[itemIndex].active;

      setListData(copyData);
    }
  };

  const [listData, setListData] = useState<BlockButtonList>();

  useEffect(() => {
    setListData(blockButtonList);
  }, []);

  return (
    <Stack className={styles.blockSelectListWrap}>
      {listData?.map((item, index) => (
        <div key={item.groupTitle} className={styles.group}>
          <p className="subtitle2">{item.groupTitle}</p>
          <div className={styles.blockSelectList}>
            {item.list.map((listItem, itemIndex) => (
              <div
                key={listItem.title}
                className={listItem.toggleLayout && listItem.active ? styles.active : ""}
              >
                <BlockSelectButton
                  title={listItem.title}
                  tooltipText={listItem.tooltipText}
                  icon={listItem.icon}
                  value={listItem.title}
                  selected={listItem.active}
                  handleChange={() => handleToggleChange(index, itemIndex)}
                />
                {listItem.toggleLayout && <i>{listItem.toggleLayout}</i>}
              </div>
            ))}
          </div>
        </div>
      ))}
    </Stack>
  );
}
