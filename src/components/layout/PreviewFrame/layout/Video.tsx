import styles from "../styles.module.scss";
import React from "react";
import Image from "next/image";

import { Stack } from "@mui/material";
import iconVideo from "/public/images/block-icon-video.svg";


export const VideoDefault = ({style}:{style: any}) => (
    <div className={styles.defaultArea} style={{borderRadius: 10}}>
      <Stack
        direction="column"
        justifyContent="center"
        alignItems="center"
        gap="12px"
        height="100%"
      >
        <Stack direction="row" gap="8px" alignItems="center" justifyContent="center">
          <Image src={iconVideo} alt="iconVideo" width={20} />
          <span className="h3">동영상</span>
        </Stack>
        <span className="subtitle2 text-grey-400">동영상 URL을 입력해 주세요</span>
      </Stack>
    </div>
)
