import styles from "../styles.module.scss";
import React from "react";
import Image from "next/image";

import { Stack } from "@mui/material";
import iconMap from "/public/images/block-icon-map.svg";

export const ContactDefault = () => (
  <div className={styles.defaultArea}>
    <Stack
      direction="column"
      justifyContent="center"
      alignItems="center"
      gap="12px"
      height="100%"
    >
      <Stack
        direction="row"
        gap="8px"
        alignItems="center"
        justifyContent="center"
      >
        <Image src={iconMap} alt="iconMap" width={20} />
        <span className="h3">위치 안내</span>
      </Stack>
      <span className="subtitle2 text-grey-400">주소를 입력해 주세요</span>
    </Stack>
  </div>
);

export const Contact = () => (
  <div
    style={{
      display: "flex",
      flexDirection: "column",
    }}
  >
    <div
      style={{
        width: "100%",
        height: "auto",
        aspectRatio: "1/1",
        backgroundColor: "grey",
        borderRadius: "8px", // option: corner
        marginBottom: "12px",
      }}
    >
      Map
    </div>
    <p
      style={{
        fontSize: "16px",
        textAlign: "center",
      }}
    >
      서울특별시 서초구 강남대로 373
    </p>
    <button
      style={{
        width: "100%",
        lineHeight: 1,
        padding: "14px",
        borderRadius: "60px",
        border: "1px solid var(--color-black)",
        color: "var(--color-black)",
        backgroundColor: "var(--color-white)",
        marginTop: "16px",
        fontSize: "16px",
      }}
    >
      지도 보러 가기
    </button>
  </div>
);
