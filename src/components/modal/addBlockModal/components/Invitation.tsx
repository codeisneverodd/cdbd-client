import { Stack } from "@mui/material";
import React, { useEffect, useState } from "react";
import styles from "../index.module.scss";

import iconText from "/public/images/icon-block-text.svg";
import iconTextStar from "/public/images/icon-block-text-star.svg";
import iconStar from "/public/images/icon-block-star.svg";
import iconImage from "/public/images/icon-block-image.svg";
import iconImageStar from "/public/images/icon-block-image-star.svg";
import iconVideo from "/public/images/icon-block-video.svg";
import iconLocation from "/public/images/icon-block-location.svg";
import iconInquiry from "/public/images/icon-block-inquiry.svg";
import iconSns from "/public/images/icon-block-sns.svg";
import iconQna from "/public/images/icon-block-qna.svg";
import iconCalendar from "/public/images/icon-block-calendar.svg";

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
        title: "로고",
        tooltipText: "우리 브랜드 로고",
        icon: <Image src={iconStar} alt="iconStar" />,
        toggleLayout: <ToggleLayout />,
        active: false,
      },
      {
        title: "메인 이미지",
        tooltipText: "행사를 대표하는 이미지",
        icon: <Image src={iconImageStar} alt="iconImageStar" />,
        toggleLayout: <ToggleLayout />,
        active: false,
      },
    ],
  },
  {
    groupTitle: "상세 내용을 구성할 때",
    list: [
      {
        title: "행사 이름",
        tooltipText: "행사를 대표하는 타이틀",
        icon: <Image src={iconTextStar} alt="iconTextStar" />,
        toggleLayout: <ToggleLayout />,
        active: false,
      },
      {
        title: "행사 소개",
        tooltipText: "행사에 대한 상세 안내",
        icon: <Image src={iconText} alt="iconText" />,
        toggleLayout: <ToggleLayout />,
        active: false,
      },
      {
        title: "행사 일정",
        tooltipText: "행사에 대한 상세 안내",
        icon: <Image src={iconCalendar} alt="iconCalendar" />,
        toggleLayout: <ToggleLayout />,
        active: false,
      },
      {
        title: "행사장 위치",
        tooltipText: "찾아오는 길 안내",
        icon: <Image src={iconLocation} alt="iconLocation" />,
        toggleLayout: <ToggleLayout />,
        active: false,
      },
    ],
  },
  {
    groupTitle: "더 다양한 내용을 위해",
    list: [
      {
        title: "서브 이미지",
        tooltipText: "행사를 설명하는 이미지",
        icon: <Image src={iconImage} alt="iconImage" />,
        toggleLayout: <ToggleLayout />,
        active: false,
      },
      {
        title: "서브 동영상",
        tooltipText: "행사를 설명하는 동영상",
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
        title: "참석 응답 받기",
        tooltipText: "참석 여부 응답 요청하기",
        icon: <Image src={iconQna} alt="iconQna" />,
        toggleLayout: <ToggleLayout />,
        active: false,
      },
      {
        title: "행사 안내 연락처",
        tooltipText: "문의를 위한 연락처 안내",
        icon: <Image src={iconInquiry} alt="iconInquiry" />,
        toggleLayout: <ToggleLayout />,
        active: false,
      },
      {
        title: "추가 채널 안내",
        tooltipText: "홈페이지와 각종 SNS 채널 연결 버튼",
        icon: <Image src={iconSns} alt="iconSns" />,
        toggleLayout: <ToggleLayout />,
        active: false,
      },
    ],
  },
];

export default function Invitation() {
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
                className={
                  listItem.toggleLayout && listItem.active ? styles.active : ""
                }
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
