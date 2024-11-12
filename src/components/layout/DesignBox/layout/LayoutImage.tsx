import styles from "../styles.module.scss";

import React from "react";
import Image from "next/image";

import iconImage from "/public/images/block-icon-primary-Image.svg";
import BlockDesign from "../components/BlockDesign";
import DesignBoxHead from "../components/DesignBoxHead";
import SectionItemRatio from "../components/SectionItemRatio";
import SectionItemCorner from "../components/SectionItemCorner";
import SectionItemAlignment from "../components/SectionItemAlignment";
import SectionItemLink from "../components/SectionItemLink";
import SectionItemSize from "../components/SectionItemSize";


export default function LayoutImage({title = "이미지"}: {title?: string}) {

  return (
    <div className={styles.designBox}>
      <DesignBoxHead
        title={title}
        icon={<Image src={iconImage} alt="iconImage" />}
      />

      <ul className={styles.body}>
        <li className={styles.sectionItem}>
          <SectionItemRatio />
          <hr className="hr" />

          <SectionItemSize />
          <hr className="hr" />

          <SectionItemCorner type="image"/>
          <hr className="hr" />

          <SectionItemAlignment />
        </li>

        <li className={styles.sectionItem}>
          <SectionItemLink underline={false} />
        </li>

        <BlockDesign />
      </ul>
    </div>
  );
}
