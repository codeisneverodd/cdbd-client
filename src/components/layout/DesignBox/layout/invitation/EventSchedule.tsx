import styles from "../../styles.module.scss";

import React from "react";
// import { ButtonSecondary } from "@/components/Buttons";
import {
  ButtonGroup,
  Divider,
  MenuItem,
  Select,
  SelectChangeEvent,
  Slider,
  Stack,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import Image from "next/image";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import iconNone from "/public/images/icon-none.svg";
import iconMinus from "/public/images/icon-minus.svg";
import iconPlus from "/public/images/icon-plus.svg";
import iconDate from "/public/images/block-icon-primary-Date.svg";
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
import { changeStyle } from "@/redux/features/BlockData/blockDataSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import SectionItemSpecialCharacter from "../../components/SectionItemSpecialCharacter";
import SectionItemSpace from "../../components/SectionItemSpace";


export default function EventSchedule() {

  const dispatch = useDispatch();
  const selectedBlockId = useSelector((state: RootState) => state.blockData.present.selectedBlockId);
  const selectedBlockStyle = useSelector((state: RootState) =>
    state.blockData.present.blocks.find(
      (block) => block.id === state.blockData.present.selectedBlockId
    )
  )?.style;


  return (
    <div className={styles.designBox}>
      <DesignBoxHead title="행사 일정" icon={<Image src={iconDate} alt="icon" />}/>

      <ul className={styles.body}>
        {/*  sectionItem: 기능정의서에서는 section이라고 함 */}
        <li className={styles.sectionItem}>
          <SectionItemFont disableOption/>
          <hr className="hr" />

          <SectionFontSize type="date"/>
          <hr className="hr" />

          <SectionItemColor />
        </li>

        <li className={styles.sectionItem}>
          <SectionItemAlignment type="default"/>
          <hr className="hr" />

          <SectionItemSpace />

          <hr className="hr" />

          <Stack direction="row">
            <div className={styles.sectionItemTitle}>구분선</div>
            <Stack direction="row" gap="8px" width="100%">
              <ToggleButtonGroup
                // value={selectedBlockStyle.showLine? "showLine" : "hideLine"}
                value={"showLine"}
                exclusive
                onChange={(e, value)=>{
                  if(value === null) return;
                  dispatch(changeStyle({id: selectedBlockId, style:{ ...selectedBlockStyle, showLine: value === "showLine"}}))}
                }
                aria-label="text alignment"
              >
                <ToggleButton value="hideLine" aria-label="iconNone" sx={{width: "34px"}}>
                  <Image src={iconNone} alt="iconNone" />
                </ToggleButton>
                <ToggleButton value="showLine" aria-label="color-1" sx={{width: "34px"}}>
                  <div
                    className={styles.innerColorBox}
                    style={{ background: "var(--color-black)" }}
                  ></div>
                </ToggleButton>
              </ToggleButtonGroup>

              <Divider orientation="vertical" sx={{ height: "34px" }} />

              <Select
                className="indivisible"
                color="secondary"
                fullWidth
                size="small"
                // value={selectedBlockStyle.lineHeight}
                value={5}
                onChange={(e) => dispatch(changeStyle({id: selectedBlockId, style:{ ...selectedBlockStyle, lineHeight: Number(e.target.value) }}))}
                IconComponent={KeyboardArrowDownIcon}
              >
                <MenuItem value={0.5} className="indivisible">0.5</MenuItem>
                <MenuItem value={1} className="indivisible">1</MenuItem>
                <MenuItem value={1.5} className="indivisible">1.5</MenuItem>
                <MenuItem value={2} className="indivisible">2</MenuItem>
                <MenuItem value={5} className="indivisible">5</MenuItem>
              </Select>
            </Stack>
          </Stack>

        </li>
        

        <li className={styles.sectionItem}>
          <SectionItemSpecialCharacter />
        </li>

        <BlockDesign />
      </ul>
    </div>
  );
}
