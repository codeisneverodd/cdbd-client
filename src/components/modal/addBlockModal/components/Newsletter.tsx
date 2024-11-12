import { Stack } from "@mui/material";
import React, { useEffect, useState } from "react";
import styles from "../index.module.scss";

import iconStar from "/public/images/icon-block-star.svg";
import iconLayout from "/public/images/icon-block-layout.svg";
import iconInquiry from "/public/images/icon-block-inquiry.svg";
import iconQna from "/public/images/icon-block-qna.svg";
import iconSns from "/public/images/icon-block-sns.svg";
import iconList from "/public/images/icon-block-list.svg";
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
        title: "표지",
        tooltipText: "페이지의 메인 이미지",
        icon: <Image src={iconStar} alt="iconStar" />,
        toggleLayout: <ToggleLayout />,
        active: false,
      },
      {
        title: "목차",
        tooltipText: "콘텐츠 순서와 제목",
        icon: <Image src={iconList} alt="iconList" />,
        toggleLayout: <ToggleLayout />,
        active: false,
      },
    ],
  },
  {
    groupTitle: "상세 내용을 구성할 때",
    list: [
      {
        title: "텍스트형",
        tooltipText: "텍스트로 구성된 기본 콘텐츠",
        icon: <Image src={iconLayout} alt="iconLayout" />,
        toggleLayout: <ToggleLayout />,
        active: false,
      },
      {
        title: "이미지형",
        tooltipText: "이미지가 강조된 콘텐츠",
        icon: <Image src={iconLayout} alt="iconLayout" />,
        toggleLayout: <ToggleLayout />,
        active: false,
      },
      {
        title: "동영상형",
        tooltipText: "동영상이 강조된 콘텐츠",
        icon: <Image src={iconLayout} alt="iconLayout" />,
        toggleLayout: <ToggleLayout />,
        active: false,
      },
      {
        title: "버튼형",
        tooltipText: "랜딩 링크 버튼이 포함된 콘텐츠",
        icon: <Image src={iconLayout} alt="iconLayout" />,
        toggleLayout: <ToggleLayout />,
        active: false,
      },
    ],
  },
  {
    groupTitle: "마무리할 때",
    list: [
      {
        title: "의견 받기",
        tooltipText: "소식지 페이지를 방문한 독자 의견 수집",
        icon: <Image src={iconQna} alt="iconQna" />,
        toggleLayout: <ToggleLayout />,
        active: false,
      },
      {
        title: "발행인 연락처",
        tooltipText: "브랜드 연락처 안내",
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

export default function Newsletter() {
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
