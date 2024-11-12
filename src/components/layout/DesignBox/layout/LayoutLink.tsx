import styles from "../styles.module.scss";

import React from "react";

import {
  Divider,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import Image from "next/image";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import iconSpoid from "/public/images/icon-spoid.svg";
import iconNone from "/public/images/icon-none.svg";

import iconLink from "/public/images/block-icon-primary-Link.svg";
import BlockDesign from "../components/BlockDesign";
import SectionItemFont from "../components/SectionItemFont";
import DesignBoxHead from "../components/DesignBoxHead";
import SectionItemCorner from "../components/SectionItemCorner";
import SectionFontSize from "../components/SectionFontSize";
import SectionItemLink from "../components/SectionItemLink";
import InsertImage from "../components/InsertImage";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { RootState } from "@/redux/store";
import { changeStyle } from "@/redux/features/BlockData/blockDataSlice";

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

export default function LayoutLink() {
  const dispatch = useAppDispatch();
  const selectedBlockId = useAppSelector(
    (state: RootState) => state.blockData.present.selectedBlockId
  );
  const selectedBlockStyle = useAppSelector((state: RootState) =>
    state.blockData.present.blocks.find(
      (block) => block.id === state.blockData.present.selectedBlockId
    )
  )?.style;

  const [alignment, setAlignment] = React.useState("color-1");

  const handleAlignment = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string
  ) => {
    if (newAlignment !== null) {
      setAlignment(newAlignment);
    }
  };

  const [toggleButton, setToggleButton] = React.useState(false);

  const [select, setSelect] = React.useState("10");

  const handleSelectChange = (event: SelectChangeEvent) => {
    setSelect(event.target.value as string);
  };

  return (
    <div className={styles.designBox}>
      <DesignBoxHead
        title="링크"
        icon={<Image src={iconLink} alt="iconLink" />}
      />

      <ul className={styles.body}>
        <li className={styles.sectionItem}>
          <SectionItemLink underline={false} />
        </li>

        <li className={styles.sectionItem}>
          <Stack direction="row">
            <div className={styles.sectionItemTitle}>색상</div>

            <Stack direction="column" gap="8px" width="100%">
              <Stack direction="row" alignItems="center" gap="12px">
                <span
                  className="subtitle2 text-grey-300"
                  style={{ minWidth: 52 }}
                >
                  버튼
                </span>
                <Stack direction="row" gap="8px" width="100%">
                  <ToggleButton value="color-1" sx={toggleButtonStyle} style={{width: "50%"}}>
                    <div style={{ backgroundColor: "#292929" }}></div>
                  </ToggleButton>
                  <TextField
                    className="indivisible"
                    color="secondary"
                    value={"FAFAFA"}
                    sx={{
                      width: "50%",
                    }}
                    InputProps={{
                      startAdornment: (
                        <span
                          className="unit-eng"
                          style={{
                            marginRight: "8px",
                            color: "var(--color-grey-400)",
                            marginTop: "2px",
                          }}
                        >
                          #
                        </span>
                      ),
                    }}
                    inputProps={{ className: "p1-eng" }}
                  />
                </Stack>
              </Stack>
              <Stack direction="row" alignItems="center" gap="12px">
                <span
                  className="subtitle2 text-grey-300"
                  style={{ minWidth: 52 }}
                >
                  텍스트
                </span>

                <Stack direction="row" gap="8px" width="100%">
                <ToggleButton value="color-1" sx={toggleButtonStyle} style={{width: "50%"}}>
                    <div style={{ backgroundColor: "#292929" }}></div>
                  </ToggleButton>
                  <TextField
                    className="indivisible"
                    color="secondary"
                    value={"FAFAFA"}
                    sx={{
                      width: "50%",
                    }}
                    InputProps={{
                      startAdornment: (
                        <span
                          className="unit-eng"
                          style={{
                            marginRight: "8px",
                            color: "var(--color-grey-400)",
                            marginTop: "2px",
                          }}
                        >
                          #
                        </span>
                      ),
                    }}
                    inputProps={{ className: "p1-eng" }}
                  />
                </Stack>
              </Stack>
            </Stack>
          </Stack>

          <hr className="hr" />

          <Stack direction="row">
            <div className={styles.sectionItemTitle}>테두리</div>
            <Stack direction="row" gap="8px" width="100%">
              <ToggleButtonGroup
                value={selectedBlockStyle?.showBorder ? "show" : "hide"}
                exclusive
                onChange={(e, value) => {
                  if (value === null) return;
                  dispatch(
                    changeStyle({
                      id: selectedBlockId,
                      style: {
                        ...selectedBlockStyle,
                        showBorder: value === "show",
                      },
                    })
                  );
                }}
                aria-label="text alignment"
              >
                <ToggleButton
                  value="hide"
                  aria-label="iconNone"
                  sx={{ width: "34px", minWidth: "34px" }}
                >
                  <Image src={iconNone} alt="iconNone" />
                </ToggleButton>
                <ToggleButton
                  value="show"
                  aria-label="color-1"
                  sx={{ width: "34px", minWidth: "34px" }}
                >
                  <div
                    className={styles.innerColorBox}
                    style={{ background: "var(--color-black)" }}
                  ></div>
                </ToggleButton>
              </ToggleButtonGroup>

              <Divider orientation="vertical" sx={{ height: "34px" }} />

              <Select
                color="secondary"
                fullWidth
                size="small"
                value={selectedBlockStyle?.borderWidth}
                onChange={(e) =>
                  dispatch(
                    changeStyle({
                      id: selectedBlockId,
                      style: {
                        ...selectedBlockStyle,
                        borderWidth: Number(e.target.value),
                      },
                    })
                  )
                }
                IconComponent={KeyboardArrowDownIcon}
                className="indivisible"
              >
                <MenuItem value={1} className="indivisible">
                  1
                </MenuItem>
                <MenuItem value={1.5} className="indivisible">
                  1.5
                </MenuItem>
                <MenuItem value={2} className="indivisible">
                  2
                </MenuItem>
                <MenuItem value={3} className="indivisible">
                  3
                </MenuItem>
              </Select>
            </Stack>
          </Stack>
          <hr className="hr" />
          <SectionItemCorner />
        </li>

        <li className={styles.sectionItem}>
          <SectionItemFont />
          <hr className="hr" />

          <SectionFontSize />
        </li>

        <InsertImage />

        <BlockDesign />
      </ul>
    </div>
  );
}
