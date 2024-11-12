import styles from "../styles.module.scss";

import React from "react";
import {
  Stack,
  MenuItem,
  Select,
  SelectChangeEvent,
  ButtonGroup,
} from "@mui/material";
import Image from "next/image";

import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import iconMinus from "/public/images/icon-minus.svg";
import iconPlus from "/public/images/icon-plus.svg";
import BlockDesign from "../components/BlockDesign";
import SectionItemAlignment from "../components/SectionItemAlignment";
import SectionItemFont from "../components/SectionItemFont";
import SectionItemColor from "../components/SectionItemColor";
import { ButtonSecondary } from "@/components/buttons/Buttons";
import SectionItemGap from "../components/SectionItemGap";

export default function QnaDesign() {

    const [select, setSelect] = React.useState("10");

    const handleSelectChange = (event: SelectChangeEvent) => {
      setSelect(event.target.value as string);
    };
  return (
    <ul className={styles.body}>
    <li className={styles.sectionItem}>
      <SectionItemAlignment />
      <hr className="hr" />
      <SectionItemGap />
    </li>

    <li className={styles.sectionItem}>
      <SectionItemFont />
      <hr className="hr" />
      <Stack direction="row">
        <div className={styles.sectionItemTitle}>크기</div>
        <Stack direction="column" gap="12px" width="100%">
          <Stack direction="row" alignItems="center" width="100%">
            <span
              className="subtitle2 text-grey-300"
              style={{ minWidth: 52 }}
            >
              질문
            </span>
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
                <MenuItem value={"10"} className="indivisible">
                  10
                </MenuItem>
                <MenuItem value={"20"} className="indivisible">
                  20
                </MenuItem>
                <MenuItem value={"30"} className="indivisible">
                  30
                </MenuItem>
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
          <Stack direction="row" alignItems="center" width="100%">
            <span
              className="subtitle2 text-grey-300"
              style={{ minWidth: 52 }}
            >
              답변
            </span>
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
                <MenuItem value={"10"} className="indivisible">
                  10
                </MenuItem>
                <MenuItem value={"20"} className="indivisible">
                  20
                </MenuItem>
                <MenuItem value={"30"} className="indivisible">
                  30
                </MenuItem>
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
        </Stack>
      </Stack>
      <hr className="hr" />

      <SectionItemColor />
    </li>

    <BlockDesign />
  </ul>
  )
}
