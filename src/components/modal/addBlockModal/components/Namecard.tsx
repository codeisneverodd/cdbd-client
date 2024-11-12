import { Stack } from "@mui/material";
import React, { useEffect, useState } from "react";
import styles from "../index.module.scss";

import iconProfile from "/public/images/icon-block-profile.svg";
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
        title: "추가 채널 안내",
        tooltipText: "홈페이지와 각종 SNS 채널 연결 버튼",
        icon: <Image src={iconSns} alt="iconSns" />,
        toggleLayout: <ToggleLayout />,
        active: false,
      },
      {
        title: "직통 연락처",
        tooltipText: "전화번호 또는 이메일 주소 안내",
        icon: <Image src={iconInquiry} alt="iconInquiry" />,
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
        tooltipText: "회사 주소 안내",
        icon: <Image src={iconLocation} alt="iconLocation" />,
        toggleLayout: <ToggleLayout />,
        active: false,
      },
    ],
  },
];

export default function Namecard() {
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
