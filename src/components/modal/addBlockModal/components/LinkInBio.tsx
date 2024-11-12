import { Stack } from "@mui/material";
import React, { useEffect, useState } from "react";
import styles from "../index.module.scss";

import iconProfile from "/public/images/icon-block-profile.svg";
import iconText from "/public/images/icon-block-text.svg";
import iconImage from "/public/images/icon-block-image.svg";
import iconVideo from "/public/images/icon-block-video.svg";
import iconLink from "/public/images/icon-block-link.svg";
import iconLocation from "/public/images/icon-block-location.svg";
import iconInquiry from "/public/images/icon-block-inquiry.svg";
import iconSns from "/public/images/icon-block-sns.svg";
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
        title: "프로필",
        tooltipText: "브랜드 로고 또는 프로필 이미지와 소개 텍스트",
        icon: <Image src={iconProfile} alt="iconProfile" />,
        toggleLayout: <ToggleLayout />,
        active: false,
      },
    ],
  },
  {
    groupTitle: "상세 내용을 구성할 때",
    list: [
      {
        title: "링크",
        tooltipText: "외부 링크로 연결하는 버튼",
        icon: <Image src={iconLink} alt="iconLink" />,
        toggleLayout: <ToggleLayout />,
        active: false,
      },
      {
        title: "텍스트",
        tooltipText: "자유롭게 작성하는 텍스트",
        icon: <Image src={iconText} alt="iconText" />,
        toggleLayout: <ToggleLayout />,
        active: false,
      },
      {
        title: "이미지",
        tooltipText: "이미지 또는 GIF",
        icon: <Image src={iconImage} alt="iconImage" />,
        toggleLayout: <ToggleLayout />,
        active: false,
      },
      {
        title: "동영상",
        tooltipText: "유튜브 또는 비메오 영상 불러오기",
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
        title: "위치 안내",
        tooltipText: "지도 썸네일과 주소 안내",
        icon: <Image src={iconLocation} alt="iconLocation" />,
        toggleLayout: <ToggleLayout />,
        active: false,
      },
      {
        title: "문의하기",
        tooltipText: "전화하기 또는 이메일 보내기 버튼",
        icon: <Image src={iconInquiry} alt="iconInquiry" />,
        toggleLayout: <ToggleLayout />,
        active: false,
      },
      {
        title: "SNS",
        tooltipText: "홈페이지와 각종 SNS 채널 연결 버튼",
        icon: <Image src={iconSns} alt="iconSns" />,
        toggleLayout: null,
        active: false,
      },
    ],
  },
];

export default function LinkInBio() {
  // const [toggleButton, setToggleButton] = React.useState(false);

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
