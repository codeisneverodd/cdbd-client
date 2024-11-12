import styles from "../../styles.module.scss";

import React from "react";
import Image from "next/image";

import iconImageStar from "/public/images/block-icon-primary-Title Image.svg";
import BlockDesign from "../../components/BlockDesign";
import DesignBoxHead from "../../components/DesignBoxHead";
import SectionItemRatio from "../../components/SectionItemRatio";
import SectionItemCorner from "../../components/SectionItemCorner";
import SectionItemLink from "../../components/SectionItemLink";
import SectionItemSize from "../../components/SectionItemSize";


export default function LayoutImage() {

  return (
    <div className={styles.designBox}>
      <DesignBoxHead
        title="메인 이미지"
        icon={<Image src={iconImageStar} alt="iconImageStar" />}
      />

      <ul className={styles.body}>
        <li className={styles.sectionItem}>
          <SectionItemRatio />
          <hr className="hr" />

          <SectionItemSize />
          <hr className="hr" />

          <SectionItemCorner type="image"/>
        </li>

        <li className={styles.sectionItem}>
          <SectionItemLink underline={false} />
        </li>

        <BlockDesign />
      </ul>
    </div>
  );
}
