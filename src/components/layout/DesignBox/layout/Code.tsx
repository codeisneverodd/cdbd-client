import styles from "../styles.module.scss";

import React, { useState } from "react";
import { Stack, TextField } from "@mui/material";
import Image from "next/image";

import iconFullScreen from "/public/images/icon-full-screen.svg";
import iconFullScreenEnd from "/public/images/icon-full-screen-end.svg";
import iconCode from "/public/images/block-icon-primary-Code.svg";

import BlockDesign from "../components/BlockDesign";
import DesignBoxHead from "../components/DesignBoxHead";
import { ButtonSecondary } from "@/components/buttons/Buttons";
// import { ButtonSecondary } from "@/components/Buttons";

import Editor from "react-simple-code-editor";

import { highlight, languages } from 'prismjs';
// import 'prismjs/components/prism-clike';
// import 'prismjs/components/prism-cshtml';
import 'prismjs/themes/prism.css';
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { RootState } from "@/redux/store";
import { changeStyle } from "@/redux/features/BlockData/blockDataSlice";

export default function Code() {
  const dispatch = useAppDispatch();
  const selectedBlockId = useAppSelector((state: RootState) => state.blockData.present.selectedBlockId);
  const selectedBlockStyle = useAppSelector((state: RootState) =>
    state.blockData.present.blocks.find(
      (block) => block.id === state.blockData.present.selectedBlockId
    )
  )?.style;

  const code = selectedBlockStyle?.code ?? "";

  const [toggleModal, setToggleModal] = useState<boolean>(false);

  const handleModalClose = () => {
    setToggleModal(false);
  };
  const handleModalOpen = () => {
    setToggleModal(true);
  };
  
  return (
    <div className={styles.designBox}>
      <DesignBoxHead
        title="코드"
        icon={<Image src={iconCode} alt="iconCode" />}
      />

      <ul className={styles.body}>
        <li className={styles.sectionItem}>
          <Stack direction="row" alignItems="center" width="100%">
            <Editor
              value={code}
              onValueChange={(code) =>
                dispatch(changeStyle({ id: selectedBlockId, style: { code } }))
              }
              highlight={(code) => highlight(code, languages.html, "html")}
              padding={10}
              style={{
                fontFamily: '"Fira code", "Fira Mono", monospace',
                fontSize: 12,
                width: "100%",
                height: "100%",
                // borderRadius: 8,
              }}
            />
          </Stack>
          <ButtonSecondary
            style={{
              position: "absolute",
              right: 24,
              bottom: 24,
              minWidth: 34,
              maxWidth: 34,
              minHeight: 34,
              maxHeight: 34,
              backgroundColor: "var(--color-white)",
            }}
            onClick={handleModalOpen}
          >
            <Image src={iconFullScreen} alt="iconFullScreen" />
          </ButtonSecondary>
        </li>

        <BlockDesign />
      </ul>

      <div
        style={{
          display: toggleModal ? "block" : "none",
          position: "absolute",
          // zIndex: 50,
          top: "calc(62px + 32px)",
          right: "32px",
          left: "calc(64px + 32px)",
          height: "calc(100vh - 62px - 64px)",
          zIndex: 100,
        }}
      >
        <li
          className={styles.sectionItem}
          style={{ height: "100%", listStyle: "none" }}
        >
          <Stack
            direction="row"
            alignItems="center"
            gap="20px"
            width="100%"
            height="100%"
          >
            <Editor
              value={code}
              onValueChange={(code) =>
                dispatch(changeStyle({ id: selectedBlockId, style: { code } }))
              }
              highlight={(code) => highlight(code, languages.html, "html")}
              padding={10}
              style={{
                fontFamily: '"Fira code", "Fira Mono", monospace',
                fontSize: 12,
                width: "100%",
                height: "100%",
                overflow: "auto",
                // borderRadius: 8,
              }}
            />
          </Stack>
          <ButtonSecondary
            style={{
              position: "absolute",
              right: 24,
              bottom: 24,
              minWidth: 34,
              maxWidth: 34,
              minHeight: 34,
              maxHeight: 34,
              backgroundColor: "var(--color-white)",
            }}
            onClick={handleModalClose}
          >
            <Image src={iconFullScreenEnd} alt="iconFullScreenEnd" />
          </ButtonSecondary>
        </li>
      </div>
    </div>
  );
}
