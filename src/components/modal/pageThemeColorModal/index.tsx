import React from "react";
import styles from "./index.module.scss";

import { Backdrop, Divider, MenuItem, Select, SelectChangeEvent, Stack, TextField, ToggleButton, ToggleButtonGroup } from "@mui/material";

import iconNone from "/public/images/icon-none.svg";
import iconImage from "/public/images/icon-image.svg";
import iconRotate from "/public/images/icon-rotate.svg";
import iconConvert from "/public/images/icon-convert.svg";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import Image from "next/image";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { RootState } from "@/redux/store";
import { changePageStyle } from "@/redux/features/BlockData/blockDataSlice";
import { SketchPicker } from 'react-color';

export default function PageThemeColorModal() {
  const selectedPageStyle = useAppSelector((state: RootState) =>
    state.blockData.present.style
  );
  const dispatch = useAppDispatch();

  const [select, setSelect] = React.useState("pretendard");

  const handleSelect = (
    event: React.MouseEvent<HTMLElement>,
    newValue: string
  ) => {
    if (newValue !== null) {

      setSelect(newValue);
    }
  };

  const toggleButtonStyle = {
    borderWidth: "2px",
    borderLeftWidth: "2px !important",
    "&.Mui-selected span": {
      filter: "none",
    },
    "&:hover span": {
      filter: "none",
    },
    "&.Mui-selected:hover span": {
      filter: "none",
    },
  }

  return (
    <Stack
      direction="column"
      gap="32px"
      sx={{ paddingBottom: "32px", flex: 1 }}
    >
      <hr
        className="hr"
        style={{
          height: "1px",
          width: "calc(100% + 64px)",
          borderColor: "var(--color-grey-100)",
          margin: "0 -32px",
        }}
      />
      <Stack direction="row" gap="32px">
        <div className={styles.left}>
          <div
            className={styles.previewBox}
            style={{
              backgroundColor: "#fafafa", // option
            }}
          >
            <div
              className={styles.text}
              style={{
                color: "#000", // option
              }}
            >
              텍스트
            </div>
            <button
              className={styles.button}
              style={{
                color: "#fff", // option
                backgroundColor: "#000", // option
              }}
            >
              버튼
            </button>
          </div>
          <Divider sx={{ borderColor: "var(--color-grey-100)" }} />
          <Stack gap="12px">
            <Stack direction="row" alignItems="flex-start" gap="12px">
              <span
                className="subtitle2"
                style={{ minWidth: 52, lineHeight:"34px" }}
              >
                배경
              </span>
              <Background />
            </Stack>
            <Stack direction="row" alignItems="center" gap="12px">
              <span
                className="subtitle2"
                style={{ minWidth: 52 }}
              >
                텍스트
              </span>

              <Stack direction="row" gap="8px" width="100%">
                <TextField
                  color="secondary"
                  value={selectedPageStyle?.color}
                  fullWidth
                  // InputProps={{
                  //   startAdornment: (
                  //     <span
                  //       className="unit-eng"
                  //       style={{
                  //         marginRight: "8px",
                  //         color: "var(--color-grey-400)",
                  //         marginTop: "2px",
                  //       }}
                  //     >
                  //       #
                  //     </span>
                  //   ),
                  // }}
                  inputProps={{ className: "p1-eng" }}
                  onChange={(e) => {
                    dispatch(changePageStyle({ ...selectedPageStyle, color: e.target.value }));
                  }}
                />
              </Stack>
            </Stack>
            <Stack direction="row" alignItems="center" gap="12px">
              <span
                className="subtitle2"
                style={{ minWidth: 52 }}
              >
                버튼
              </span>

              <Stack direction="row" gap="8px" width="100%">
                <TextField
                  color="secondary"
                  value={selectedPageStyle?.buttonColor}
                  fullWidth
                  // InputProps={{
                  //   startAdornment: (
                  //     <span
                  //       className="unit-eng"
                  //       style={{
                  //         marginRight: "8px",
                  //         color: "var(--color-grey-400)",
                  //         marginTop: "2px",
                  //       }}
                  //     >
                  //       #
                  //     </span>
                  //   ),
                  // }}
                  inputProps={{ className: "p1-eng" }}
                  onChange={(e) => {
                    dispatch(changePageStyle({ ...selectedPageStyle, buttonColor: e.target.value }));
                  }}
                />
              </Stack>
            </Stack>
          </Stack>
        </div>
        <Divider orientation="vertical" flexItem />

        <div className={styles.right}>
          <ToggleButtonGroup
            value={select}
            exclusive
            onChange={handleSelect}
            aria-label="text alignment"
            className={styles.list}
          >
            <ToggleButton
              value="color-1"
              aria-label="color-1"
              className={
                select === "color-1" ? `${styles.selected} color-1` : "color-1"
              }
              style={{ backgroundColor: "#F4EEED" }}
              sx={toggleButtonStyle}
            >
              <span style={{ color: "#6E705B" }}>Text</span>
              <i style={{ backgroundColor: "#F19A7E" }}></i>
              <i style={{ backgroundColor: "#F19A7E" }}></i>
            </ToggleButton>
            <ToggleButton
              value="color-2"
              aria-label="color-2"
              className={
                select === "color-2" ? `${styles.selected} color-2` : "color-2"
              }
              style={{ backgroundColor: "#FAEEE7" }}
              sx={toggleButtonStyle}
            >
              <span style={{ color: "#594A4E" }}>Text</span>
              <i style={{ backgroundColor: "#FF8BA7" }}></i>
              <i style={{ backgroundColor: "#FF8BA7" }}></i>
            </ToggleButton>
            <ToggleButton
              value="color-3"
              aria-label="color-3"
              className={
                select === "color-3" ? `${styles.selected} color-3` : "color-3"
              }
              style={{ backgroundColor: "#FEF6E4" }}
              sx={toggleButtonStyle}
            >
              <span style={{ color: "#001858" }}>Text</span>
              <i style={{ backgroundColor: "#F582AE" }}></i>
              <i style={{ backgroundColor: "#F582AE" }}></i>
            </ToggleButton>
            <ToggleButton
              value="color-4"
              aria-label="color-4"
              className={
                select === "color-4" ? `${styles.selected} color-4` : "color-4"
              }
              style={{ backgroundColor: "#F8F5F2" }}
              sx={toggleButtonStyle}
            >
              <span style={{ color: "#222525" }}>Text</span>
              <i style={{ backgroundColor: "#078080" }}></i>
              <i style={{ backgroundColor: "#078080" }}></i>
            </ToggleButton>

            <ToggleButton
              value="color-5"
              aria-label="color-5"
              className={
                select === "color-5" ? `${styles.selected} color-5` : "color-5"
              }
              style={{ backgroundColor: "#EBECF3" }}
              sx={toggleButtonStyle}
            >
              <span style={{ color: "#201E2A" }}>Text</span>
              <i style={{ backgroundColor: "#87965F" }}></i>
              <i style={{ backgroundColor: "#87965F" }}></i>
            </ToggleButton>
            <ToggleButton
              value="color-6"
              aria-label="color-6"
              className={
                select === "color-6" ? `${styles.selected} color-6` : "color-6"
              }
              style={{ backgroundColor: "#F2F4F6" }}
              sx={toggleButtonStyle}
            >
              <span style={{ color: "#00214D" }}>Text</span>
              <i style={{ backgroundColor: "#00214D" }}></i>
              <i style={{ backgroundColor: "#00214D" }}></i>
            </ToggleButton>
            <ToggleButton
              value="color-7"
              aria-label="color-7"
              className={
                select === "color-7" ? `${styles.selected} color-7` : "color-7"
              }
              style={{ backgroundColor: "#EFF0F3" }}
              sx={toggleButtonStyle}
            >
              <span style={{ color: "#2A2A2A" }}>Text</span>
              <i style={{ backgroundColor: "#FF8E3C" }}></i>
              <i style={{ backgroundColor: "#FF8E3C" }}></i>
            </ToggleButton>
            <ToggleButton
              value="color-8"
              aria-label="color-8"
              className={
                select === "color-8" ? `${styles.selected} color-8` : "color-8"
              }
              style={{ backgroundColor: "#EAD7D9" }}
              sx={toggleButtonStyle}
            >
              <span style={{ color: "#192543" }}>Text</span>
              <i style={{ backgroundColor: "#D97752" }}></i>
              <i style={{ backgroundColor: "#D97752" }}></i>
            </ToggleButton>

            <ToggleButton
              value="color-9"
              aria-label="color-9"
              className={
                select === "color-9" ? `${styles.selected} color-9` : "color-9"
              }
              style={{ backgroundColor: "#FFD8E3" }}
              sx={toggleButtonStyle}
            >
              <span style={{ color: "#0E172C" }}>Text</span>
              <i style={{ backgroundColor: "#AA87E6" }}></i>
              <i style={{ backgroundColor: "#AA87E6" }}></i>
            </ToggleButton>
            <ToggleButton
              value="color-10"
              aria-label="color-10"
              className={
                select === "color-10"
                  ? `${styles.selected} color-10`
                  : "color-10"
              }
              style={{ backgroundColor: "#F3B478" }}
              sx={toggleButtonStyle}
            >
              <span style={{ color: "#453E39" }}>Text</span>
              <i style={{ backgroundColor: "#C76F2F" }}></i>
              <i style={{ backgroundColor: "#C76F2F" }}></i>
            </ToggleButton>
            <ToggleButton
              value="color-11"
              aria-label="color-11"
              className={
                select === "color-11"
                  ? `${styles.selected} color-11`
                  : "color-11"
              }
              style={{ backgroundColor: "#FFC0AD" }}
              sx={toggleButtonStyle}
            >
              <span style={{ color: "#55423D" }}>Text</span>
              <i style={{ backgroundColor: "#271C19" }}></i>
              <i style={{ backgroundColor: "#271C19" }}></i>
            </ToggleButton>
            <ToggleButton
              value="color-12"
              aria-label="color-12"
              className={
                select === "color-12"
                  ? `${styles.selected} color-12`
                  : "color-12"
              }
              style={{ backgroundColor: "#ABD1C6" }}
              sx={toggleButtonStyle}
            >
              <span style={{ color: "#004643" }}>Text</span>
              <i style={{ backgroundColor: "#0F3433" }}></i>
              <i style={{ backgroundColor: "#0F3433" }}></i>
            </ToggleButton>

            <ToggleButton
              value="color-13"
              aria-label="color-13"
              className={
                select === "color-13"
                  ? `${styles.selected} color-13`
                  : "color-13"
              }
              style={{ backgroundColor: "#D1D1E9" }}
              sx={toggleButtonStyle}
            >
              <span style={{ color: "#2B2C34" }}>Text</span>
              <i style={{ backgroundColor: "#6246EA" }}></i>
              <i style={{ backgroundColor: "#6246EA" }}></i>
            </ToggleButton>
            <ToggleButton
              value="color-14"
              aria-label="color-14"
              className={
                select === "color-14"
                  ? `${styles.selected} color-14`
                  : "color-14"
              }
              style={{ backgroundColor: "#00473E" }}
              sx={toggleButtonStyle}
            >
              <span style={{ color: "#FFC157" }}>Text</span>
              <i style={{ backgroundColor: "#FFC157" }}></i>
              <i style={{ backgroundColor: "#FFC157" }}></i>
            </ToggleButton>
            <ToggleButton
              value="color-15"
              aria-label="color-15"
              className={
                select === "color-15"
                  ? `${styles.selected} color-15`
                  : "color-15"
              }
              style={{ backgroundColor: "#1C334D" }}
              sx={toggleButtonStyle}
            >
              <span style={{ color: "#C3DB97" }}>Text</span>
              <i style={{ backgroundColor: "#79B55C" }}></i>
              <i style={{ backgroundColor: "#79B55C" }}></i>
            </ToggleButton>
            <ToggleButton
              value="color-16"
              aria-label="color-16"
              className={
                select === "color-16"
                  ? `${styles.selected} color-16`
                  : "color-16"
              }
              style={{ backgroundColor: "#232946" }}
              sx={toggleButtonStyle}
            >
              <span style={{ color: "#B8C1EC" }}>Text</span>
              <i style={{ backgroundColor: "#EEBBC3" }}></i>
              <i style={{ backgroundColor: "#EEBBC3" }}></i>
            </ToggleButton>

            <ToggleButton
              value="color-17"
              aria-label="color-17"
              className={
                select === "color-17"
                  ? `${styles.selected} color-17`
                  : "color-17"
              }
              style={{ backgroundColor: "#16161A" }}
              sx={toggleButtonStyle}
            >
              <span style={{ color: "#FFFFFE" }}>Text</span>
              <i style={{ backgroundColor: "#FFC157" }}></i>
              <i style={{ backgroundColor: "#FFC157" }}></i>
            </ToggleButton>
            <ToggleButton
              value="color-18"
              aria-label="color-18"
              className={
                select === "color-18"
                  ? `${styles.selected} color-18`
                  : "color-18"
              }
              style={{ backgroundColor: "#16161A" }}
              sx={toggleButtonStyle}
            >
              <span style={{ color: "#A4B1DF" }}>Text</span>
              <i style={{ backgroundColor: "#7F5AF0" }}></i>
              <i style={{ backgroundColor: "#7F5AF0" }}></i>
            </ToggleButton>
          </ToggleButtonGroup>
        </div>
      </Stack>
    </Stack>
  );
}


function Background() {
  const [showPicker, setShowPicker] = React.useState<"start"|"end">();
  const dispatch = useAppDispatch();
  const selectedPageStyle = useAppSelector((state: RootState) =>
    state.blockData.present.style
  );

  // const [backgroundOption, setBackgroundOption] = React.useState("none");

  const backgroundOption = selectedPageStyle.background;
  // example
  // "linear-gradient(180deg, red 0%, blue 100%)"
  // "radial-gradient( red 0%, blue 100%)"
  const [gradientStart, setGradientStart] = React.useState(
    backgroundOption.includes("gradient") ? backgroundOption.split(" ")[1] : "blue"
  );
  const [gradientEnd, setGradientEnd] = React.useState(
    backgroundOption.includes("gradient") ? backgroundOption.split(" ")[3] : "red"
  );

  const handleBackgroundOption = (
    event: React.MouseEvent<HTMLElement>,
    newValue: string
  ) => {
    if (newValue !== null) {
      dispatch(changePageStyle({ ...selectedPageStyle, background: newValue }));
      // setBackgroundOption(newValue);
    }
  };
  const [imageOption, setImageOption] = React.useState("default");

  const handleImageOption = (
    event: React.MouseEvent<HTMLElement>,
    newValue: string
  ) => {
    if (newValue !== null) {
      setImageOption(newValue);
    }
  };

  const [gradientOption, setGradientOption] = React.useState("linear");

  const handleGradientChange = (event: SelectChangeEvent) => {
    setGradientOption(event.target.value as string);
  };

  const toggleButtonStyle = {
    width: "34px",
    minWidth: "34px",
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

  return (
    <Stack direction="column" gap="8px" width="100%">
      <Stack>
        {!backgroundOption?.includes("gradient") ||
        backgroundOption === "none" ? (
          <TextField
            color="secondary"
            onChange={(e) => {
              handleBackgroundOption(e as any, e.target.value);
            }}
            value={backgroundOption}
            fullWidth
            // InputProps={{
            //   startAdornment: (
            //     <span
            //       className="unit-eng"
            //       style={{
            //         marginRight: "8px",
            //         color: "var(--color-grey-400)",
            //         marginTop: "2px",
            //       }}
            //     >
            //       #
            //     </span>
            //   ),
            // }}
            inputProps={{
              className: "p1-eng",
              style: {
                color:
                  backgroundOption === "none"
                    ? "var(--color-grey-300)"
                    : "var(--color-grey-900)",
              },
            }}
          />
        ) : backgroundOption.includes("gradient") ? (
          <>
            <Stack direction="row" gap="8px">
              <Select
                color="secondary"
                fullWidth
                size="small"
                value={backgroundOption}
                onChange={(e) =>
                  handleBackgroundOption(e as any, e.target.value)
                }
                IconComponent={KeyboardArrowDownIcon}
              >
                <MenuItem value={`linear-gradient(180deg, ${gradientStart} 0%, ${gradientEnd} 100%)`}>
                  선형
                </MenuItem>
                <MenuItem value={`radial-gradient( ${gradientStart} 0%, ${gradientEnd} 100%)`}>
                  원형
                </MenuItem>
              </Select>
              <ToggleButton
                value="start"
                aria-label="start"
                onClick={() =>
                  setShowPicker((v) => (v === "start" ? undefined : "start"))
                }
              >
                <div
                  className={styles.innerColorBox}
                  style={{ background: gradientStart }}
                ></div>
              </ToggleButton>

              <ToggleButton
                value="end"
                aria-label="end"
                onClick={() =>
                  setShowPicker((v) => (v === "end" ? undefined : "end"))
                }
              >
                <div
                  className={styles.innerColorBox}
                  style={{ background: gradientEnd }}
                ></div>
              </ToggleButton>
              <ToggleButton
                value="none"
                aria-label="none"
                sx={{ minWidth: "34px" }}
              >
                <Image
                  src={gradientOption === "linear" ? iconRotate : iconConvert}
                  alt="switch"
                  width={16}
                  height={16}
                />
              </ToggleButton>
            </Stack>
            <div
              style={{
                position: "relative",
                display: showPicker ? "block" : "none",
              }}
            >
              <div style={{ position: "absolute", zIndex: 100000, top: "8px" }}>
                <Backdrop open={true} sx={{background: "transparent"}} onClick={()=>setShowPicker(undefined)} />
                <SketchPicker
                  disableAlpha={false}
                  color={showPicker === "end" ? gradientEnd : gradientStart}
                  onChange={(v, e) => {
                      e.stopPropagation();
                      showPicker === "end"
                        ? setGradientEnd(v.hex)
                        : setGradientStart(v.hex);
                      
                      if (backgroundOption.includes("linear")) {
                        showPicker === "end"
                          ? handleBackgroundOption(e as any, `linear-gradient(180deg, ${gradientStart} 0%, ${v.hex} 100%)`)
                          : handleBackgroundOption(e as any, `linear-gradient(180deg, ${v.hex} 0%, ${gradientEnd} 100%)`)
                      } else if (backgroundOption.includes("radial")) {
                        showPicker === "end"
                          ? handleBackgroundOption(e as any, `radial-gradient( ${gradientStart} 0%, ${v.hex} 100%)`) //radial-gradient( ${gradientStart} 0%,  ${gradientEnd} 100%)
                          : handleBackgroundOption(e as any, `radial-gradient( ${v.hex} 0%, ${gradientEnd} 100%)`)
                      }
                    }
                  }
                />
              </div>
            </div>
          </>
        ) : backgroundOption === "image" ? (
          <ToggleButtonGroup
            value={imageOption}
            onChange={handleImageOption}
            exclusive
            fullWidth
          >
            <ToggleButton value="default" aria-label="default">
              기본
            </ToggleButton>
            <ToggleButton value="dark" aria-label="dark">
              어둡게
            </ToggleButton>
            <ToggleButton value="light" aria-label="light">
              밝게
            </ToggleButton>
            <ToggleButton value="blur" aria-label="image">
              블러
            </ToggleButton>
          </ToggleButtonGroup>
        ) : (
          <></>
        )}
      </Stack>
      <ToggleButtonGroup
        value={backgroundOption}
        exclusive
        onChange={handleBackgroundOption}
        aria-label="text alignment"
      >
        <ToggleButton value="none" aria-label="none" sx={{ width: "34px", minWidth: "34px" }}>
          <Image src={iconNone} alt="iconNone" width={16} height={16}/>
        </ToggleButton>
        <ToggleButton
          value="#FAFAFA"
          aria-label="solid"
          sx={{
            marginRight: "8px",
            borderRadius: "0 8px 8px 0 !important",
          }}
        >
          <div
            className={styles.innerColorBox}
            style={{ background: "var(--color-black)" }}
          ></div>
        </ToggleButton>
        <ToggleButton
          value={`linear-gradient(180deg, ${gradientStart} 0%, ${gradientEnd} 100%)`}
          aria-label="gradient"
          sx={{
            ...toggleButtonStyle,
            marginRight: "8px",
          }}
        >
          <div
            className={styles.innerColorBox}
            style={{
              background:
                "linear-gradient(180deg, rgba(0,0,0,1) 0%, rgba(255,255,255,1) 100%)",
            }}
          ></div>
        </ToggleButton>
        <ToggleButton value="image" aria-label="image" sx={toggleButtonStyle}>
          <Image src={iconImage} alt="iconImage" width={16} height={16} />
        </ToggleButton>
      </ToggleButtonGroup>
    </Stack>
  );
}
