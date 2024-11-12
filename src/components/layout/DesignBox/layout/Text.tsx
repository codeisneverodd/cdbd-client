import styles from "../styles.module.scss";

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
import iconText from "/public/images/block-icon-primary-Text.svg";
// import InfoText from "@/components/InfoText";
import BlockDesign from "../components/BlockDesign";
import SectionItemLink from "../components/SectionItemLink";
import SectionItemFont from "../components/SectionItemFont";
import SectionItemColor from "../components/SectionItemColor";
import SectionItemAlignment from "../components/SectionItemAlignment";
import DesignBoxHead from "../components/DesignBoxHead";
import SectionFontSize from "../components/SectionFontSize";
import { ButtonSecondary } from "@/components/buttons/Buttons";
import InfoText from "@/components/text/InfoText";
import SectionItemSpecialCharacter from "../components/SectionItemSpecialCharacter";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { changeStyle } from "@/redux/features/BlockData/blockDataSlice";
// import { useCurrentEditor } from "@tiptap/react";

export default function Text({title = "텍스트", icon = iconText} : {title?: string, icon?: string}) {
  const dispatch = useAppDispatch();
  const selectedBlockId = useAppSelector((state) => state.blockData.present.selectedBlockId);
  const selectedBlockStyle = useAppSelector((state) =>
    state.blockData.present.blocks.find(
      (block) => block.id === state.blockData.present.selectedBlockId
    )
  )?.style;

  // const { editor } = useCurrentEditor()

  // const [select, setSelect] = React.useState("10");

  const handleSelectChange = (event: SelectChangeEvent) => {
    // setSelect(event.target.value as string);
    dispatch(changeStyle({id: selectedBlockId, style:{ ...selectedBlockStyle, lineHeight: event.target.value??0 }}))
  };

  const handleIncreaseLineHeight = () => {
    const newLineHeight = selectedBlockStyle?.lineHeight + 0.5;
    if (newLineHeight > 10) return;
    dispatch(changeStyle({id: selectedBlockId, style:{ ...selectedBlockStyle, lineHeight: newLineHeight }}))
  }

  const handleDecreaseLineHeight = () => {
    const newLineHeight = selectedBlockStyle?.lineHeight - 0.5;
    if (newLineHeight < 0) return;
    dispatch(changeStyle({id: selectedBlockId, style:{ ...selectedBlockStyle, lineHeight: newLineHeight }}))
  }

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
                value={selectedBlockStyle?.lineHeight}
                onChange={handleSelectChange}
                IconComponent={KeyboardArrowDownIcon}
                className="indivisible"
              >
                <MenuItem value={1} className="indivisible">1</MenuItem>
                <MenuItem value={1.5} className="indivisible">1.5</MenuItem>
                <MenuItem value={2} className="indivisible">2</MenuItem>
                <MenuItem value={2.5} className="indivisible">2.5</MenuItem>
                <MenuItem value={3} className="indivisible">3</MenuItem>

                <MenuItem value={selectedBlockStyle?.lineHeight} sx={{height: 0, padding: 0, overflow: 'clip'}}>{selectedBlockStyle?.lineHeight}</MenuItem>
              </Select>
              <ButtonGroup aria-label="Basic button group">
                <ButtonSecondary onClick={handleDecreaseLineHeight}>
                  <Image src={iconMinus} alt="iconMinus" />
                </ButtonSecondary>
                <ButtonSecondary onClick={handleIncreaseLineHeight}>
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
