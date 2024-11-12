"use client";

import styles from './styles.module.scss';
import { Grid } from "@mui/material";
import React, { useCallback } from "react";
import Modal from "./Modal";
import AddBlockModal from "./addBlockModal";
import { RootState } from "@/redux/store";
import { useAppSelector } from "@/redux/hooks";
import AddImageModal from "./addImageModal";
import PageThemeColorModal from "./pageThemeColorModal";
import PageThemeFontModal from "./pageThemeFontModal";

type Props = {};

export default function ModalWrapper({}: Props) {
  const showModal = useAppSelector((state: RootState) => state.modal.showModal);
  const modalType = useAppSelector((state: RootState) => state.modal.modalType);

  const RenderModal = useCallback(() => {
    switch (modalType) {
      case "addBlock":
        return (
          <Modal title="카드 추가하기">
            <AddBlockModal />
          </Modal>
        );
      case "addImage":
        return (
          <Modal title="이미지 추가하기" addImageModal={true}>
            <AddImageModal />
          </Modal>
        );
      case "selectFont":
        return (
            <PageThemeFontModal />
        );
      case "selectColor":
        return (
          <Modal title="페이지 색상 선택하기" closeButton={false}>
            <PageThemeColorModal />
          </Modal>
        );
      default:
        return null;
    }
  }, [modalType]);

  return showModal ? (
    <div style={{ position: "relative" }}>
      <Grid
        container
        spacing={4}
        sx={{ position: "absolute", paddingBottom: "32px" }}
      >
        <Grid item xs={4}></Grid>
        <Grid item xs={8} sx={{ width: "calc(86.666667%) !important" }}>
          <RenderModal />
          <div className={styles.modalBg}></div>
        </Grid>
      </Grid>
    </div>
  ) : null;
}
