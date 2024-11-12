"use client";
import styles from "./styles.module.scss";

import { ActionCreators } from "redux-undo";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { IconButton, TextField } from "@mui/material";

import iconUndo from "/public/images/icon-curved-undo.svg";
import iconRedo from "/public/images/icon-curved-redo.svg";
import iconView from "/public/images/icon-view.svg";
import iconAutoSave from "/public/images/icon-autosave.svg";
import iconEdit from "/public/images/icon-edit.svg";
import { ButtonPrimary, IconButtonPrimary } from "@/components/buttons/Buttons";
import Chips from "@/components/buttons/Chips";
import { useDispatch, useSelector } from "react-redux";
import {
  selectHasFuture,
  selectHasPast,
} from "@/redux/features/BlockData/blockDataSlice";

export default function Header() {
  const dispatch = useDispatch();
  const hasPast = useSelector(selectHasPast);
  const hasFuture = useSelector(selectHasFuture);
  const [contentTitle, setContentTitle] = useState<string>("");
  const [contentTitleEditMode, setContentTitleEditMode] = useState<boolean>();
  const contentTitleRef = useRef<HTMLInputElement>();

  useEffect(() => {
    if (contentTitleEditMode) {
      const element = contentTitleRef?.current;
      element?.focus();
    }
  },[contentTitleEditMode]);


  // TODO: fetch content title
  useEffect(() => {
    setContentTitle("콘텐츠 제목1");
  }, []);

  return (
    <header className={styles.header}>
      <div className={styles.left}>
        <IconButtonPrimary
          disabled={!hasPast}
          onClick={() => {
            dispatch(ActionCreators.undo());
          }}
        >
          <Image src={iconUndo} alt="undo" />
        </IconButtonPrimary>
        <IconButtonPrimary
          disabled={!hasFuture}
          onClick={() => {
            dispatch(ActionCreators.redo());
          }}
        >
          <Image src={iconRedo} alt="redo" />
        </IconButtonPrimary>
      </div>

      <div className={styles.center}>
        <TextField
          color="secondary"
          disabled={!contentTitleEditMode}
          value={contentTitle}
          onChange={(e) => setContentTitle(e.target.value)}
          size="small"
          InputProps={{
            startAdornment: <Chips variant="profile" />,
            endAdornment: (
              <IconButton
                onClick={() => {
                  setContentTitleEditMode(!contentTitleEditMode);
                }}
              >
                <Image src={iconEdit} alt="iconEdit" width={14} height={14} />
              </IconButton>
            ),
          }}
          inputProps={{
            size: contentTitle.length,
          }}
          inputRef={contentTitleRef}
          sx={{
            width: "max-content",
            height: 38,
            "& .MuiInputBase-root": {
              height: 38,
              backgroundColor: contentTitleEditMode
                ? "var(--color-white)"
                : "transparent",
              width: "max-content",
              padding: "0 8px 0 16px",
            },
            "& .MuiInputBase-root.Mui-disabled input": {
              color: "var(--color-black)",
              WebkitTextFillColor: "unset",
            },
            "& .MuiInputBase-input": {
              width: contentTitle.length + "ch",
              minWidth: "72px",
              padding: "0 8px",
              fontWeight: 500,
            },
            "& fieldset": {
              borderColor: "var(--color-grey-200)",
              transition: "border-color .2s",
            },
          }}
        />
      </div>

      <div className={styles.right}>
        <div className={styles.autoSave}>
          <Image src={iconAutoSave} alt="autos ave" />
          <span className="h5">자동저장 중</span>
        </div>
        <IconButtonPrimary>
          <Image src={iconView} alt="view" />
        </IconButtonPrimary>
        <ButtonPrimary style={{ maxHeight: 38 }}>URL 생성하기</ButtonPrimary>
      </div>
    </header>
  );
}
