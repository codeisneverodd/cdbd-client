import styles from "../styles.module.scss";

import React, { useState } from "react";

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

import iconKorea from "/public/images/country-korea.png";
import iconContact from "/public/images/block-icon-primary-Contact.svg";
import BlockDesign from "../components/BlockDesign";
import SectionItemFont from "../components/SectionItemFont";
import DesignBoxHead from "../components/DesignBoxHead";
import SectionItemCorner from "../components/SectionItemCorner";
import SectionFontSize from "../components/SectionFontSize";
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

export default function Contact({ title = "문의하기" }: { title?: string }) {
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

  // const [sendType, setSendType] = React.useState("mobile");

  const handleSendType = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string
  ) => {
    if (newAlignment !== null) {
      // setSendType(newAlignment);
      dispatch(
        changeStyle({
          id: selectedBlockId,
          style: { ...selectedBlockStyle, contactType: newAlignment },
        })
      );
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
        title={title}
        icon={<Image src={iconContact} alt="iconContact" />}
      />

      <ul className={styles.body}>
        <li className={styles.sectionItem}>
          <Stack direction="row">
            <div className={styles.sectionItemTitle}>유형</div>
            <Stack direction="column" gap="12px" width="100%">
              <ToggleButtonGroup
                value={selectedBlockStyle?.contactType}
                exclusive
                onChange={handleSendType}
                aria-label="text alignment"
                fullWidth
              >
                <ToggleButton value="mobile" aria-label="mobile">
                  <span className="subtitle2">전화하기</span>
                </ToggleButton>
                <ToggleButton value="email" aria-label="email">
                  <span className="subtitle2">이메일 보내기</span>
                </ToggleButton>
              </ToggleButtonGroup>

              {selectedBlockStyle?.contactType === "mobile" ? (
                <MobileTextField
                  dispatch={dispatch}
                  selectedBlockId={selectedBlockId}
                  selectedBlockStyle={selectedBlockStyle}
                />
              ) : (
                <TextField
                  color="secondary"
                  placeholder="이메일 주소를 입력해주세요"
                  fullWidth
                  onChange={(e) => {
                    dispatch(
                      changeStyle({
                        id: selectedBlockId,
                        style: {
                          ...selectedBlockStyle,
                          contact: e.target.value,
                        },
                      })
                    );
                  }}
                />
              )}
            </Stack>
          </Stack>
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
                  <ToggleButton
                    value="color-1"
                    sx={toggleButtonStyle}
                    style={{ width: "50%" }}
                  >
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
                  <ToggleButton
                    value="color-1"
                    sx={toggleButtonStyle}
                    style={{ width: "50%" }}
                  >
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

        <li className={styles.sectionItem}>
          <SectionItemFont />
          <hr className="hr" />

          <SectionFontSize />
        </li>

        <BlockDesign />
      </ul>
    </div>
  );
}

function MobileTextField({
  dispatch,
  selectedBlockId,
  selectedBlockStyle,
}: any) {
  const [isAddressInputFocus, setIsAddressInputFocus] = useState(false);
  const handleAddressFocus = () => {
    setIsAddressInputFocus(true);
  };
  const handleAddressBlur = () => {
    setIsAddressInputFocus(false);
  };

  const [country, setCountry] = useState("google");
  const handleCountryChange = (event: SelectChangeEvent) => {
    setCountry(event.target.value as string);
  };

  return (
    <Stack direction="row" gap="8px" width="100%" mb="2px" position="relative">
      <TextField
        color="secondary"
        fullWidth
        placeholder="전화번호를 입력해주세요."
        onFocus={handleAddressFocus}
        onBlur={handleAddressBlur}
        onChange={(e) => {
          dispatch(
            changeStyle({
              id: selectedBlockId,
              style: {
                ...selectedBlockStyle,
                contact: e.target.value,
              },
            })
          );
        }}
        sx={{
          "& input": {
            paddingLeft: "92px",
          },
        }}
      />

      <Select
        className="indivisible"
        color="secondary"
        fullWidth
        size="small"
        value={country}
        onChange={handleCountryChange}
        IconComponent={KeyboardArrowDownIcon}
        MenuProps={{
          anchorOrigin: {
            vertical: "bottom",
            horizontal: "left",
          },
          transformOrigin: {
            vertical: "top",
            horizontal: "left",
          },
        }}
        renderValue={(selected) =>
          selected === "country-1" ? (
            <Image
              src={iconKorea}
              alt="iconKorea"
              width={14}
              height={10}
              style={{ transform: "translate(6px, 1px)" }}
            />
          ) : selected === "country-2" ? (
            <Image
              src={iconKorea}
              alt="iconKorea"
              width={14}
              height={10}
              style={{ transform: "translate(6px, 1px)" }}
            />
          ) : (
            <Image
              src={iconKorea}
              alt="iconKorea"
              width={14}
              height={10}
              style={{ transform: "translate(6px, 1px)" }}
            />
          )
        }
        sx={{
          backgroundColor: isAddressInputFocus
            ? "var(--color-grey-50)"
            : "white",
          ...countrySelectStyle,
        }}
      >
        <MenuItem value={"country-1"} style={listButtonStyle}>
          <Image src={iconKorea} alt="iconKorea" width={24} height={18} />
          <span className="p1">대한민국</span>
        </MenuItem>
        <MenuItem value={"country-2"} style={listButtonStyle}>
          <Image src={iconKorea} alt="iconKorea" width={24} height={18} />
          <span className="p1">대한민국2</span>
        </MenuItem>
        <MenuItem value={"country-3"} style={listButtonStyle}>
          <Image src={iconKorea} alt="iconKorea" width={24} height={18} />
          <span className="p1">대한민국3</span>
        </MenuItem>
      </Select>

      <div className={`${styles.countryCode} caption-eng`}>+{`82`}</div>
    </Stack>
  );
}

const listButtonStyle = {
  minWidth: "220px",
  padding: "8px 12px",
  color: "var(--color-grey-800)",
  gap: "8px",
  alignItems: "center",
  "&:hover": {
    backgroundColor: "var(--color-success-light)",
  },
  "& img": {
    width: 22,
    height: 22,
  },
};

const countrySelectStyle = {
  position: "absolute",
  left: "12px",
  top: "50%",
  transform: "translate(0, -50%)",
  width: "42px",
  height: "22px",
  padding: "0",
  borderRadius: "4px !important",
  "& .MuiSelect-select": {
    padding: 0,
    paddingRight: "16px !important",
    textOverflow: "unset !important",
  },
  "& filedset": {
    padding: 0,
  },
  "& .MuiSvgIcon-root": {
    marginRight: "-4px",
    marginTop: "1px",
    width: "16px",
    height: "16px",
  },
};
