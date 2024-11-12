import styles from "../../styles.module.scss";

import React from "react";
import {
  Stack,
  MenuItem,
  Select,
  Divider,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  FormControlLabel,
  Button,
} from "@mui/material";
import Image from "next/image";

import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import iconSpoid from "/public/images/icon-spoid.svg";
import iconNone from "/public/images/icon-none.svg";
import iconImage from "/public/images/icon-image.svg";

import BlockDesign from "../../components/BlockDesign";
import SectionItemAlignment from "../../components/SectionItemAlignment";
import SectionItemFont from "../../components/SectionItemFont";
import SectionItemColor from "../../components/SectionItemColor";

import SectionItemGap from "../../components/SectionItemGap";
import SectionItemGrid from "../../components/SectionItemGrid";
import SectionFontSize from "../../components/SectionFontSize";
import { changeStyle } from "@/redux/features/BlockData/blockDataSlice";
import SectionItemCorner from "../../components/SectionItemCorner";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { RootState } from "@/redux/store";
import { SwitchSecondary } from "@/components/buttons/Switches";
import { ButtonPrimaryBlack, ButtonSecondary } from "@/components/buttons/Buttons";
import SectionItemSpecialCharacter from "../../components/SectionItemSpecialCharacter";
import SectionItemSpace from "../../components/SectionItemSpace";

const toggleButtonStyle = {
  "&.Mui-selected": {
    borderLeftColor: "var(--color-success) !important",
    borderRightColor: "var(--color-success) !important",
  },
  padding: "6px !important",
  backgroundColor: "var(--color-grey-50)",
  borderLeftColor: "var(--color-grey-200) !important",
  borderRightColor: "var(--color-grey-200) !important",
  borderRadius: "8px !important",

  "& > div": {
    width: "100%",
    minWidth: "20px",
    height: "100%",
    borderRadius: "4px",
  },
};

export default function IndexDesign() {
  
  const dispatch = useAppDispatch();
  const selectedBlockId = useAppSelector((state: RootState) => state.blockData.present.selectedBlockId);
  const selectedBlockStyle = useAppSelector((state: RootState) =>
    state.blockData.present.blocks.find(
      (block) => block.id === state.blockData.present.selectedBlockId
    )
  )?.style;

  return (
    <ul className={styles.body}>

      <li className={styles.sectionItem}>
        <SectionItemFont />
        <hr className="hr" />
        <SectionFontSize />
        <hr className="hr" />
        <SectionItemColor />
      </li>



      <li className={styles.sectionItem}>
        <SectionItemSpecialCharacter />
      </li>
      <li className={styles.sectionItem}>
        <SectionItemAlignment />
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
                onChange={(e) => dispatch(changeStyle({id: selectedBlockId, style:{ ...selectedBlockStyle, lineHeight: Number(e.target.value) }}))}
                IconComponent={KeyboardArrowDownIcon}
              >
                <MenuItem value={0.5} className="indivisible">0.5</MenuItem>
                <MenuItem value={1} className="indivisible">1</MenuItem>
                <MenuItem value={1.5} className="indivisible">1.5</MenuItem>
                <MenuItem value={2} className="indivisible">2</MenuItem>
                <MenuItem value={3} className="indivisible">3</MenuItem>
              </Select>
            </Stack>
          </Stack>
        <hr className="hr" />
        <Stack direction="row">
            <div className={styles.sectionItemTitle}>화살표</div>
            <Stack direction="row" gap="8px" width="100%">
              <ToggleButtonGroup
                value={"showArrow"}
                exclusive
                onChange={(e, value)=>{
                  if(value === null) return;
                  dispatch(changeStyle({id: selectedBlockId, style:{ ...selectedBlockStyle, showLine: value === "showLine"}}))}
                }
                aria-label="text alignment"
              >
                <ToggleButton value="hideArrow" aria-label="iconNone" sx={{width: "34px"}}>
                  <Image src={iconNone} alt="iconNone" />
                </ToggleButton>
                <ToggleButton value="showArrow" aria-label="color-1" sx={{width: "34px"}}>
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
                onChange={(e) => dispatch(changeStyle({id: selectedBlockId, style:{ ...selectedBlockStyle, lineHeight: Number(e.target.value) }}))}
                IconComponent={KeyboardArrowDownIcon}
                endAdornment={
                  <span
                    className="unit-eng text-grey-400"
                    style={{ paddingRight: "12px" }}
                  >
                    px
                  </span>
                }
              >
                <MenuItem value={0.5} className="indivisible">0.5</MenuItem>
                <MenuItem value={1} className="indivisible">1</MenuItem>
                <MenuItem value={1.5} className="indivisible">1.5</MenuItem>
                <MenuItem value={2} className="indivisible">2</MenuItem>
                <MenuItem value={3} className="indivisible">3</MenuItem>
              </Select>
            </Stack>
          </Stack>
      </li>
      <BlockDesign />
    </ul>
  );
}
