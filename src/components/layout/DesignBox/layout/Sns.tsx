import styles from "../styles.module.scss";

import React from "react";
import Image from "next/image";
import BlockDesign from "../components/BlockDesign";
import DesignBoxHead from "../components/DesignBoxHead";
import SectionItemColor from "../components/SectionItemColor";
import SectionItemSize from "../components/SectionItemSize";

import iconSns from "/public/images/block-icon-primary-SNS.svg";
import SnsDnd from "./SnsDnd";

export default function Sns({
  title = "SNS",
  additional = false,
  contact = false,
}: {
  title?: string;
  additional?: boolean;
  contact?: boolean;
}) {
  return (
    <div className={styles.designBox}>
      <DesignBoxHead
        title={title}
        icon={<Image src={iconSns} alt="iconSns" />}
      />

      <ul className={styles.body}>
        <li className={styles.sectionItem}>
          <div className={`${styles.sectionItemTitle} ${styles.column}`}>
            {contact ? "연락처 목록" : "채널 목록"}
          </div>
          <SnsDnd additional={additional} />
        </li>

        <li className={styles.sectionItem}>
          <SectionItemSize disableUnit />
          <hr className="hr" />

          <SectionItemColor />
        </li>

        <BlockDesign />
      </ul>
    </div>
  );
}
