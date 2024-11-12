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

export default function ProductDesign() {
  
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
        <div className="h5" style={{ marginBottom: "20px" }}>
          레이아웃
        </div>

        <SectionItemGrid />

        <hr className="hr" />
        <Stack direction="row">
          <div className={styles.sectionItemTitle}>구성</div>
          <Stack>
            <Stack
              direction="row"
              sx={{
                alignItems: "center",
                height: "34px",
                gap: "16px",
                marginBottom: "4px",
              }}
            >
              <FormControlLabel
                sx={{ marginLeft: 0 }}
                control={<SwitchSecondary checked />}
                label={
                  <span className="subtitle2" style={{ marginLeft: "8px" }}>
                    이미지
                  </span>
                }
              />
              <FormControlLabel
                sx={{ marginLeft: 0 }}
                control={<SwitchSecondary checked />}
                label={
                  <span className="subtitle2" style={{ marginLeft: "8px" }}>
                    상품명
                  </span>
                }
              />
              <FormControlLabel
                sx={{ marginLeft: 0 }}
                control={<SwitchSecondary checked />}
                label={
                  <span className="subtitle2" style={{ marginLeft: "8px" }}>
                    버튼
                  </span>
                }
              />
            </Stack>
            <Stack
              sx={{
                gap: "8px",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "var(--color-information-pale)",
                borderRadius: "8px",
                padding: "16px",
              }}
            >
              {/* NOTE: toggle thumbnail */}
              {true && (
                <div className={styles.previewThumbnail}>
                  <Image
                    src={iconImage}
                    alt="thumbnail"
                    width={32}
                    height={32}
                  />
                </div>
              )}
              {/* NOTE: toggle title */}
              {true && <div className={styles.previewTitle}>[상품명]</div>}
              {/* NOTE: toggle button */}
              {true && (
                <div className={styles.previewButton}>
                  <ButtonPrimaryBlack>버튼</ButtonPrimaryBlack>
                </div>
              )}
            </Stack>
          </Stack>
        </Stack>
      </li>

      <li className={styles.sectionItem}>
        <div className="h5" style={{ marginBottom: "20px" }}>
          상품명
        </div>
        <SectionItemFont />
        <hr className="hr" />
        <SectionFontSize />
        <hr className="hr" />
        <SectionItemColor />
      </li>

      <li className={styles.sectionItem}>
        <div className="h5" style={{ marginBottom: "20px" }}>
          버튼
        </div>
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
              color="secondary"
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
                aria-label="hide"
                sx={{ width: "34px", minWidth: "34px" }}
              >
                <Image src={iconNone} alt="iconNone" />
              </ToggleButton>
              <ToggleButton
                value="show"
                aria-label="show"
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
            >
              <MenuItem value={1}>1</MenuItem>
              <MenuItem value={1.5}>1.5</MenuItem>
              <MenuItem value={2}>2</MenuItem>
              <MenuItem value={3}>3</MenuItem>
            </Select>
          </Stack>
        </Stack>
        <hr className="hr" />
        <SectionItemCorner />
      </li>
      <BlockDesign />
    </ul>
  );
}
