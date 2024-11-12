import styles from "../../styles.module.scss";

import React from "react";
// import { ButtonSecondary } from "@/components/Buttons";
import {
  ButtonGroup,
  Divider,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
} from "@mui/material";
import Image from "next/image";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

import iconMinus from "/public/images/icon-minus.svg";
import iconPlus from "/public/images/icon-plus.svg";
import iconTextStar from "/public/images/block-icon-primary-Title Text.svg";
// import InfoText from "@/components/InfoText";
import BlockDesign from "../../components/BlockDesign";
import SectionItemLink from "../../components/SectionItemLink";
import SectionItemFont from "../../components/SectionItemFont";
import SectionItemColor from "../../components/SectionItemColor";
import SectionItemAlignment from "../../components/SectionItemAlignment";
import DesignBoxHead from "../../components/DesignBoxHead";
import SectionFontSize from "../../components/SectionFontSize";
import { ButtonSecondary } from "@/components/buttons/Buttons";
import InfoText from "@/components/text/InfoText";
import SectionItemSpecialCharacter from "../../components/SectionItemSpecialCharacter";


/**
 * NOTE: This is the same as the "Text" component.
 * Only the option value is different.
 * It is an explicitly created component.
 */

export default function EventText({title, icon} : {title: string, icon: string}) {

  const [select, setSelect] = React.useState("10");

  const handleSelectChange = (event: SelectChangeEvent) => {
    setSelect(event.target.value as string);
  };

  return (
    <div className={styles.designBox}>
      <DesignBoxHead title={title} icon={<Image src={icon} alt="iconText" />}/>

      <ul className={styles.body}>
        {/*  sectionItem: 기능정의서에서는 section이라고 함 */}
        <li className={styles.sectionItem}>
          <SectionItemFont />
          <hr className="hr" />

          <SectionFontSize/>
          <hr className="hr" />

          <SectionItemColor />
        </li>

        <li className={styles.sectionItem}>
          <SectionItemAlignment type="text"/>
          <hr className="hr" />

          <Stack direction="row">
            <div className={styles.sectionItemTitle}>줄간격</div>
            <Stack direction="row" gap="8px" width="100%">
              <Select
                color="secondary"
                fullWidth
                size="small"
                value={select}
                onChange={handleSelectChange}
                IconComponent={KeyboardArrowDownIcon}
                className="indivisible"
              >
                <MenuItem value={"10"} className="indivisible">10</MenuItem>
                <MenuItem value={"20"} className="indivisible">20</MenuItem>
                <MenuItem value={"30"} className="indivisible">30</MenuItem>
              </Select>
              <ButtonGroup aria-label="Basic button group">
                <ButtonSecondary>
                  <Image src={iconMinus} alt="iconMinus" />
                </ButtonSecondary>
                <ButtonSecondary>
                  <Image src={iconPlus} alt="iconPlus" />
                </ButtonSecondary>
              </ButtonGroup>
            </Stack>
          </Stack>
        </li>
        
        <li className={styles.sectionItem}>
          <SectionItemLink />
        </li>

        <li className={styles.sectionItem}>
          <SectionItemSpecialCharacter />
        </li>

        <BlockDesign />
      </ul>
    </div>
  );
}
