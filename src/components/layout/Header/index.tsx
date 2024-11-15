"use client";
import styles from "./styles.module.scss";

import { ActionCreators } from "redux-undo";

import { IconButton, TextField } from "@mui/material";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

import { ButtonPrimary, IconButtonPrimary } from "@/components/buttons/Buttons";
import Chips from "@/components/buttons/Chips";
import {
  selectHasFuture,
  selectHasPast,
} from "@/redux/features/BlockData/blockDataSlice";
import { User } from "@supabase/supabase-js";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import iconAutoSave from "/public/images/icon-autosave.svg";
import iconRedo from "/public/images/icon-curved-redo.svg";
import iconUndo from "/public/images/icon-curved-undo.svg";
import iconEdit from "/public/images/icon-edit.svg";
import iconView from "/public/images/icon-view.svg";

export default function Header({ user }: { user: User | null }) {
  const dispatch = useDispatch();
  const router = useRouter();
  const hasPast = useSelector(selectHasPast);
  const hasFuture = useSelector(selectHasFuture);
  const [contentTitle, setContentTitle] = useState<string>("콘텐츠 제목1");

  const [contentTitleEditMode, setContentTitleEditMode] =
    useState<boolean>(false);
  const contentTitleRef = useRef<HTMLInputElement>();

  useEffect(() => {
    if (contentTitleEditMode) {
      const element = contentTitleRef?.current;
      element?.focus();
    }
  }, [contentTitleEditMode]);

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
          onBlur={() => {
            setContentTitleEditMode(false);
          }}
          onKeyUp={(e) => {
            if (e.key === "Enter") {
              setContentTitleEditMode(false);
            }
          }}
          size="small"
          InputProps={{
            startAdornment: <Chips variant="profile" />,
            endAdornment: (
              <IconButton
                onClick={() => {
                  setContentTitleEditMode(!contentTitleEditMode);
                }}
              >
                {!contentTitleEditMode && (
                  <Image src={iconEdit} alt="iconEdit" width={14} height={14} />
                )}
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
        <Link href="/preview" target="_blank">
          <IconButtonPrimary>
            <Image src={iconView} alt="view" />
          </IconButtonPrimary>
        </Link>
        <ButtonPrimary
          style={{ maxHeight: 38 }}
          onClick={() => {
            if (!user) {
              alert(
                "로그인 모달 기획 대기중입니다. 로그인 페이지로 이동합니다."
              );
              return router.push("/sign-in");
            }
            alert("url 생성 모달 기획 대기중 입니다.");
          }}
        >
          URL 생성하기
        </ButtonPrimary>
      </div>
    </header>
  );
}
