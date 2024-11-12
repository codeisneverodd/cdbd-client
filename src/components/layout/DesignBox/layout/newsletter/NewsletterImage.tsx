import styles from "../../styles.module.scss";

import React from "react";
import {
  Slider,
  Stack,
  TextField,
} from "@mui/material";
import Image from "next/image";
import iconGroup from "/public/images/block-icon-primary-Group.svg";

import BlockDesign from "../../components/BlockDesign";
import SectionItemFont from "../../components/SectionItemFont";
import SectionItemColor from "../../components/SectionItemColor";
import SectionItemAlignment from "../../components/SectionItemAlignment";
import DesignBoxHead from "../../components/DesignBoxHead";
import SectionFontSize from "../../components/SectionFontSize";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import SectionItemCorner from "../../components/SectionItemCorner";
import SectionItemLink from "../../components/SectionItemLink";
import SectionItemRatio from "../../components/SectionItemRatio";
import SectionItemSize from "../../components/SectionItemSize";
import SectionItemSpace from "../../components/SectionItemSpace";


export default function NewsletterImage() {

  const dispatch = useDispatch();
  const selectedBlockId = useSelector((state: RootState) => state.blockData.present.selectedBlockId);
  const selectedBlockStyle = useSelector((state: RootState) =>
    state.blockData.present.blocks.find(
      (block) => block.id === state.blockData.present.selectedBlockId
    )
  )?.style;


  return (
    <div className={styles.designBox}>
      <DesignBoxHead
        title="이미지형"
        icon={<Image src={iconGroup} alt="icon" />}
      />

      <ul className={styles.body}>
        <li className={styles.sectionItem}>
          <SectionItemAlignment type="default" />
          <hr className="hr" />

          <SectionItemSpace />
        </li>

        <li className={styles.sectionItem}>
          <div className="h5" style={{ marginBottom: "20px" }}>
            텍스트
          </div>

          <SectionItemFont disableOption />
          <hr className="hr" />

          <SectionFontSize type="document" />
          <hr className="hr" />

          <SectionItemColor />
        </li>

        <li className={styles.sectionItem}>
          <div className="h5" style={{ marginBottom: "20px" }}>
            이미지
          </div>

          <SectionItemRatio />
          <hr className="hr" />

          <SectionItemSize />
          <hr className="hr" />

          <SectionItemCorner type="image"/>
          <hr className="hr" />

          <SectionItemAlignment />
          <hr className="hr" />
          
          <SectionItemLink underline={false} />
        </li>

        <BlockDesign />
      </ul>
    </div>
  );
}
