import styles from "../../styles.module.scss";

import React from "react";
import Image from "next/image";

import iconMark from "/public/images/block-icon-primary-Mark.svg";
import BlockDesign from "../../components/BlockDesign";
import DesignBoxHead from "../../components/DesignBoxHead";
import SectionItemRatio, { SectionItemRatioCover } from "../../components/SectionItemRatio";
import SectionItemLink from "../../components/SectionItemLink";
import SectionItemSize from "../../components/SectionItemSize";
import SectionItemPosition from "../../components/SectionItemPosition";
import { Stack, ToggleButton, ToggleButtonGroup } from "@mui/material";
import SectionItemFilter from "../../components/SectionItemFilter";
import SectionItemFont from "../../components/SectionItemFont";
import SectionFontSize from "../../components/SectionFontSize";
import SectionItemColor from "../../components/SectionItemColor";


export default function MainCover() {

  return (
    <div className={styles.designBox}>
      <DesignBoxHead
        title="메인 커버"
        icon={<Image src={iconMark} alt="iconMark" />}
      />

      <ul className={styles.body}>
        <li className={styles.sectionItem}>
          <Stack sx={{ marginBottom: "20px" }}>
            <div className="h5">커버 이미지</div>
          </Stack>

          <SectionItemRatioCover />
          <hr className="hr" />

          <SectionItemFilter />
        </li>

        <li className={styles.sectionItem}>
        <Stack sx={{ marginBottom: "20px" }}>
            <div className="h5">타이틀</div>
          </Stack>
          <SectionItemPosition />
          <hr className="hr" />
          <SectionItemSize title="로고"/>
          <hr className="hr" />
          <SectionItemFont />
          <hr className="hr" />
          <SectionFontSize />
          <hr className="hr" />
          <SectionItemColor />
        </li>
        <li className={styles.sectionItem}>
          <SectionItemLink underline={false} />
        </li>

        <BlockDesign />
      </ul>
    </div>
  );
}
