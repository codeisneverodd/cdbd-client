"use client";

import { hideModal } from "@/redux/features/Modal/modalSlice";
import { Button, IconButton, Stack } from "@mui/material";
import Image from "next/image";
import React from "react";
import { useDispatch } from "react-redux";
import styles from "./styles.module.scss";
import iconClose from "/public/images/icon-close.svg";

type ModalProps = {
  children: React.ReactNode;
  title: string;
  closeButton?: boolean;
  addImageModal?: boolean;
  onClose?: () => void;
  onSubmit?: () => void;
};
export default function Modal({
  children,
  title,
  closeButton = true,
  addImageModal = false,
  onClose,
  onSubmit,
}: ModalProps) {
  const dispatch = useDispatch();

  const handleModalClose = () => {
    onClose && onClose();
    dispatch(hideModal());
  };

  const handleSubmit = () => {
    onSubmit && onSubmit();
    dispatch(hideModal());
  };

  return (
    <div
      className={
        addImageModal ? `${styles.wrap} ${styles.addImageModal}` : styles.wrap
      }
    >
      <div className={styles.head}>
        <span>{title}</span>
        <Stack direction="row" gap="8px" justifyContent="flex-end">
          {closeButton ? (
            <IconButton
              sx={{ width: "32px", height: "32px" }}
              onClick={handleModalClose}
            >
              <Image src={iconClose} alt="close" />
            </IconButton>
          ) : (
            <>
              <Button
                variant="outlined"
                color="info"
                sx={{ height: "38px" }}
                onClick={handleModalClose}
              >
                취소하기
              </Button>
              <Button
                variant="contained"
                disableElevation
                sx={{ height: "38px" }}
                onClick={handleSubmit}
              >
                변경사항 저장하기
              </Button>
            </>
          )}
        </Stack>
      </div>
      <div className={styles.body}>{children}</div>
    </div>
  );
}
