import styles from "../../styles.module.scss";

import React from "react";
import Image from "next/image";

import iconMark from "/public/images/block-icon-primary-Mark.svg";
import BlockDesign from "../../components/BlockDesign";
import DesignBoxHead from "../../components/DesignBoxHead";
import { SectionItemRatioLogo } from "../../components/SectionItemRatio";
import SectionItemLink from "../../components/SectionItemLink";
import SectionItemSize from "../../components/SectionItemSize";
import SectionItemPosition from "../../components/SectionItemPosition";


export default function Logo() {

  return (
    <div className={styles.designBox}>
      <DesignBoxHead
        title="로고"
        icon={<Image src={iconMark} alt="iconMark" />}
      />

      <ul className={styles.body}>
        <li className={styles.sectionItem}>
          <SectionItemRatioLogo />
          <hr className="hr" />

          <SectionItemSize />
          <hr className="hr" />

          <SectionItemPosition />
        </li>

        <li className={styles.sectionItem}>
          <SectionItemLink underline={false} />
        </li>

        <BlockDesign />
      </ul>
    </div>
  );
}
