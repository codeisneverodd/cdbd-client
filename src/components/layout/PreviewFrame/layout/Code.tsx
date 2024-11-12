import styles from "../styles.module.scss";
import React from "react";
import Image from "next/image";

import { Stack } from "@mui/material";
import iconCode from "/public/images/block-icon-code.svg";

export const CodeDefault = ({style}:any) => (
  <div className={styles.defaultArea}>
    <Stack
      direction="column"
      justifyContent="center"
      alignItems="center"
      gap="12px"
      height="100%"
    >
      <div dangerouslySetInnerHTML={{ __html: style.code??'' }} />
      {/* <Stack
        direction="row"
        gap="8px"
        alignItems="center"
        justifyContent="center"
      >
        <Image src={iconCode} alt="iconCode" width={20} />
        <span className="h3">코드</span>
      </Stack>
      <span className="caption text-grey-400">html 코드를 입력해 주세요</span> */}
    </Stack>
  </div>
);
