import styles from "../styles.module.scss";

import React from "react";

import {
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

import iconMargin from "/public/images/block-icon-primary-Margin.svg";
import BlockDesign from "../components/BlockDesign";
import DesignBoxHead from "../components/DesignBoxHead";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { changeStyle } from "@/redux/features/BlockData/blockDataSlice";

export default function Margin() {
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
        title="여백"
        icon={<Image src={iconMargin} alt="iconMargin" />}
      />

      <ul className={styles.body}>
        <li className={styles.sectionItem}>
          <Stack direction="row">
            <div className={styles.sectionItemTitle}>높이</div>

            <Stack direction="row" alignItems="center" gap="20px" width="100%">
              <Slider
                color="secondary"
                aria-label="padding"
                // defaultValue={selectedBlockStyle.height}
                value={selectedBlockStyle.height}
                onChange={(e, value) => dispatch(changeStyle({id: selectedBlockId, style:{ ...selectedBlockStyle, height: value }}))}
                shiftStep={10}
                step={10}
                marks
                min={10}
                max={110}
              />
              <TextField
                className="indivisible"
                color="secondary"
                placeholder="0"
                onChange={(e) => dispatch(changeStyle({id: selectedBlockId, style:{ ...selectedBlockStyle, height: Number(e.target.value) }}))}
                value={selectedBlockStyle.height}
                sx={{
                  width: "60px",
                  minWidth: "60px",
                  "& .MuiInputBase-root": {
                    padding: 0,
                  },
                }}
                InputProps={{
                  endAdornment: (
                    <span
                      className="unit-eng"
                      style={{
                        marginRight: "8px",
                        color: "var(--color-grey-400)",
                      }}
                    >
                      px
                    </span>
                  ),
                }}
              />
            </Stack>
          </Stack>
          <hr className="hr" />

          <Stack direction="row">
            <div className={styles.sectionItemTitle}>구분선</div>
            <Stack direction="row" gap="8px" width="100%">
              <ToggleButtonGroup
                value={selectedBlockStyle.showLine? "showLine" : "hideLine"}
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
                value={selectedBlockStyle.lineHeight}
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
        </li>

        <BlockDesign />
      </ul>
    </div>
  );
}
