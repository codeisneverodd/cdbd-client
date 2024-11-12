import styles from "../../styles.module.scss";

import React from "react";
import {
  Divider,
  MenuItem,
  Select,
  Slider,
  Stack,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import Image from "next/image";
import iconGroup from "/public/images/block-icon-primary-Group.svg";
import iconSpoid from "/public/images/icon-spoid.svg";
import iconNone from "/public/images/icon-none.svg";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

import BlockDesign from "../../components/BlockDesign";
import SectionItemFont from "../../components/SectionItemFont";
import SectionItemColor from "../../components/SectionItemColor";
import SectionItemAlignment from "../../components/SectionItemAlignment";
import DesignBoxHead from "../../components/DesignBoxHead";
import SectionFontSize from "../../components/SectionFontSize";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import SectionItemCorner from "../../components/SectionItemCorner";
import { changeStyle } from "@/redux/features/BlockData/blockDataSlice";
import SectionItemLink from "../../components/SectionItemLink";
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


export default function NewsletterButton() {
  const dispatch = useDispatch();
  const selectedBlockId = useSelector(
    (state: RootState) => state.blockData.present.selectedBlockId
  );
  const selectedBlockStyle = useSelector((state: RootState) =>
    state.blockData.present.blocks.find(
      (block) => block.id === state.blockData.present.selectedBlockId
    )
  )?.style;

  const [link, setLink] = React.useState("");

  return (
    <div className={styles.designBox}>
      <DesignBoxHead
        title="버튼형"
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
            버튼
          </div>
          <SectionItemLink underline={false} />

          <hr className="hr" />


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

        <BlockDesign />
      </ul>
    </div>
  );
}
