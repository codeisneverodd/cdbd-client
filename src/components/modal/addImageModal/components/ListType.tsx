import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import styles from "../index.module.scss";

import {
  Button,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";

import iconBookmark from "/public/images/icon-bookmark.svg";
import iconBookmarkActive from "/public/images/icon-bookmark-active.svg";
import sampleImage from "/public/images/sample-image-2.jpg";
import Image from "next/image";
import MoreIcon from "./MoreIcon";


const toggleButtonStyle = {
  borderWidth: "2px",
  borderLeftWidth: "2px !important",
  "&.Mui-selected img": {
    filter: "none",
  },
  "&:hover img": {
    filter: "none",
  },
  "&.Mui-selected:hover img": {
    filter: "none",
  },
  "&:hover": {
    borderColor: "transparent !important",
    color: "var(--color-grey-600) !important",
    backgroundColor: "var(--color-grey-50) !important",
  },
  "&.Mui-selected:hover": {
    borderColor: "transparent !important",
    color: "var(--color-grey-600) !important",
    backgroundColor: "var(--color-success-light)",
  },
  "&.Mui-selected": {
    borderColor: "transparent !important",
    color: "var(--color-grey-600) !important",
    backgroundColor: "var(--color-success-light) !important",
    zIndex: 2,
  },
};
  
export default function ListType({
  showInformation,
  setShowInformation,
  handleThumbnailMoreClick
}: {
  showInformation: boolean;
  setShowInformation: Dispatch<SetStateAction<boolean>>;
  handleThumbnailMoreClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
}) {
  const [select, setSelect] = useState("");

  useEffect(() => {
    if (select === "" || select === null) {
      setShowInformation(false);
    } else {
      setShowInformation(true);
    }
  }, [select]);

  const handleSelect = (
    event: React.MouseEvent<HTMLElement>,
    newValue: string
  ) => {
    console.log("newValue");
    console.log(newValue);
    setSelect(newValue);
  };
  return (
    <>
      <div className={styles.listHeader}>
        <i></i>
        <div className="subtitle2">이름</div>
        <div className={`subtitle2 ${styles.size}`}>크기</div>
        <div className={`subtitle2 ${styles.date}`}>추가된 날짜</div>
        <span></span>
      </div>
      <ToggleButtonGroup
        value={select}
        exclusive
        onChange={handleSelect}
        aria-label="text alignment"
        className={styles.list}
      >
        {/* TODO: for default(bookmark) item*/}
        <div className={styles.listItem}>
          <ToggleButton
            value="image-1"
            aria-label="image-1"
            className={
              select === "image-1"
                ? `${styles.selected} ${styles.listItemButton}`
                : `${styles.listItemButton}`
            }
            sx={toggleButtonStyle}
          >
            <Image
              className={styles.bookmark}
              src={iconBookmarkActive} // TODO: isBookmark ? iconBookmarkActive : iconBookmark
              alt="iconBookmarkActive"
              width={20}
              height={20}
            />
            <div
            className={styles.thumbnail}
            >

            <Image
              src={sampleImage}
              alt="sampleImage"
            />
            </div>

            <p className="subtitle2">
              bookmark-active.jpg
              <div className={styles.hoverWrap}>
                <Button variant="contained" sx={{ maxHeight: "34px" }}>
                  적용하기
                </Button>
              </div>
            </p>
            <div className={styles.size}>000KB</div>
            <div className={styles.date}>yyyy.mm.dd</div>
            <MoreIcon type="light" handleClick={handleThumbnailMoreClick} />
          </ToggleButton>
        </div>

        {/* TODO: for bin item*/}
        <div className={`${styles.listItem} ${styles.bin}`}>
          <ToggleButton
            value="image-2"
            aria-label="image-2"
            className={
              select === "image-2"
                ? `${styles.selected} ${styles.listItemButton}`
                : `${styles.listItemButton}`
            }
            sx={toggleButtonStyle}
          >
            <div
            className={styles.thumbnail}
            >

            <Image
              src={sampleImage}
              alt="sampleImage"
            />
            </div>
            <p className="subtitle2">
              bin.jpg
              <div className={styles.hoverWrap}>
                <Button variant="contained" color="error" sx={{ maxHeight: "34px" }}>
                  영구 삭제
                </Button>
              </div>
            </p>

            <div className={styles.size}>000KB</div>
            <div className={styles.date}>yyyy.mm.dd</div>
            <MoreIcon handleClick={handleThumbnailMoreClick} />
          </ToggleButton>
        </div>
      </ToggleButtonGroup>
    </>
  );
}
