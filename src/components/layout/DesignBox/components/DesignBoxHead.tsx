import styles from "../styles.module.scss";

import React from 'react';
import Image from "next/image";

import iconSwitchTheme from "/public/images/switch-theme.svg";
import { useAppDispatch } from "@/redux/hooks";
import { showAppTheme } from "@/redux/features/BlockData/blockDataSlice";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

export default function DesignBoxHead({title, icon}: {title: string, icon: React.ReactNode}) {
  const dispatch = useAppDispatch();
  const isShowAppTheme = useSelector((state: RootState) => state.blockData.present.showAppTheme);

  const handleAppTheme = () => {
    dispatch(showAppTheme(!isShowAppTheme));
  }

  return (
    <div className={styles.head}>
        <div>
          {icon}
          <span className={title === "페이지 테마" ? `${styles.title}` : `${styles.title} ${styles.primary}`}>{title}</span>
        </div>
        <button className={styles.switchTheme} onClick={handleAppTheme}>
          <Image src={iconSwitchTheme} alt="iconSwitchTheme" />
          <span>페이지 테마</span>
        </button>
      </div>
  )
}
