import styles from "../styles.module.scss";

import React from "react";

import {
  Stack,
  Accordion,
  AccordionDetails,
  AccordionSummary,
  ToggleButton,
  MenuItem,
  Select,
  SelectChangeEvent,
  ToggleButtonGroup,
  Divider,
  TextField,
  Slider,
  Backdrop,
} from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

import Image from "next/image";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import iconNone from "/public/images/icon-none.svg";
import iconImage from "/public/images/icon-image.svg";
import iconRotate from "/public/images/icon-rotate.svg";
import iconConvert from "/public/images/icon-convert.svg";
import SectionItemCorner from "./SectionItemCorner";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { RootState } from "@/redux/store";
import { changeStyle } from "@/redux/features/BlockData/blockDataSlice";
import { SketchPicker } from "react-color";
import { showModal } from "@/redux/features/Modal/modalSlice";

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

export default function BlockDesign() {
  const dispatch = useAppDispatch();
  const selectedBlockId = useAppSelector(
    (state: RootState) => state.blockData.present.selectedBlockId
  );
  const selectedBlockStyle = useAppSelector((state: RootState) =>
    state.blockData.present.blocks.find(
      (block) => block.id === state.blockData.present.selectedBlockId
    )
  )?.wrapperStyle;

  const [alignment, setAlignment] = React.useState("web");

  // const handleAlignment = (
  //   event: React.MouseEvent<HTMLElement>,
  //   newAlignment: string
  // ) => {
  //   dispatch(
  //     changeStyle({
  //       id: selectedBlockId,
  //       style: { ...selectedBlockStyle, background: newAlignment },
  //     })
  //   );
  //   setAlignment(newAlignment);
  // };

  const handleWrapperBorderChange = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string
  ) => {
    dispatch(
      changeStyle({
        id: selectedBlockId,
        wrapperStyle: { ...selectedBlockStyle, border: newAlignment },
      })
    );
    // setAlignment(newAlignment);
  };

  const handleBorderWidthChange = (event: any, newAlignment: string) => {
    dispatch(
      changeStyle({
        id: selectedBlockId,
        wrapperStyle: {
          ...selectedBlockStyle,
          borderWidth: Number(newAlignment) ?? 0,
        },
      })
    );
    // setAlignment(newAlignment);
  };

  const [toggleButton, setToggleButton] = React.useState(false);

  const [select, setSelect] = React.useState("10");

  // const handleSelectChange = (event: SelectChangeEvent) => {
  //   setSelect(event.target.value as string);
  // };

  return (
    <li className={styles.sectionItem}>
      <Accordion
        disableGutters
        sx={{
          padding: 0,
          boxShadow: "none",
        }}
      >
        <AccordionSummary
          expandIcon={
            <ArrowDropDownIcon
              sx={{
                transform: "rotate(-90deg)",
                color: "var(--color-grey-800)",
              }}
            />
          }
          aria-controls="panel1-content"
          id="panel1-header"
          sx={{
            padding: 0,
            minHeight: 21,
            gap: "12px",
            flexDirection: "row-reverse",
            "& .MuiAccordionSummary-content": {
              margin: 0,
            },
            "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
              transform: "rotate(90deg)",
            },
          }}
        >
          <div className="h5">카드 디자인</div>
        </AccordionSummary>
        <AccordionDetails sx={{ padding: 0, marginTop: "20px" }}>
          <Stack direction="row">
            <div className={styles.sectionItemTitle}>배경</div>
            <Background bgFor={'wrapper'} />
          </Stack>
          <hr className="hr" />

          <Stack direction="row">
            <div className={styles.sectionItemTitle}>테두리</div>
            <Stack direction="row" gap="8px" width="100%">
              <ToggleButtonGroup
                value={selectedBlockStyle?.border}
                exclusive
                onChange={handleWrapperBorderChange}
                aria-label="text alignment"
              >
                <ToggleButton
                  value="none"
                  aria-label="iconNone"
                  sx={{ width: "34px" }}
                >
                  <Image src={iconNone} alt="iconNone" />
                </ToggleButton>
                <ToggleButton value="solid" aria-label="color-1">
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
                value={selectedBlockStyle?.borderWidth}
                onChange={(e) => {
                  handleBorderWidthChange(e, e.target.value);
                }}
                IconComponent={KeyboardArrowDownIcon}
              >
                <MenuItem value={"1"}>1</MenuItem>
                <MenuItem value={"2"}>2</MenuItem>
                <MenuItem value={"3"}>3</MenuItem>
              </Select>
            </Stack>
          </Stack>
          <hr className="hr" />

          <SectionItemCorner brFor={"wrapper"} />
          <hr className="hr" />

          <Stack direction="row">
            <div className={styles.sectionItemTitle}>여백</div>
            <Stack direction="column" gap="8px" width="100%">
              <Stack direction="row" alignItems="center" gap="12px">
                <span className="subtitle2 text-grey-300">내부</span>
                <Slider
                  color="secondary"
                  aria-label="padding"
                  // defaultValue={30}
                  value={selectedBlockStyle?.padding}
                  onChange={(e, value) => {
                    dispatch(
                      changeStyle({
                        id: selectedBlockId,
                        wrapperStyle: { ...selectedBlockStyle, padding: value },
                      })
                    );
                  }}
                  shiftStep={30}
                  step={10}
                  marks
                  min={0}
                  max={110}
                />
                <TextField
                  className="indivisible"
                  color="secondary"
                  placeholder="0"
                  value={selectedBlockStyle?.padding}
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
              <Stack direction="row" alignItems="center" gap="12px">
                <span className="subtitle2 text-grey-300">외부</span>
                <Slider
                  color="secondary"
                  aria-label="padding"
                  defaultValue={30}
                  shiftStep={30}
                  value={selectedBlockStyle?.margin ?? 0}
                  onChange={(e, value) => {
                    dispatch(
                      changeStyle({
                        id: selectedBlockId,
                        wrapperStyle: { ...selectedBlockStyle, margin: value },
                      })
                    );
                  }}
                  step={10}
                  marks
                  min={0}
                  max={110}
                />
                <TextField
                  className="indivisible"
                  color="secondary"
                  placeholder="0"
                  value={selectedBlockStyle?.margin ?? 0}
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
          </Stack>
        </AccordionDetails>
      </Accordion>
    </li>
  );
}

function Background({bgFor='block'}:{bgFor: 'wrapper' | 'block'}) {
  // const [backgroundOption, setBackgroundOption] = React.useState("none");

  const styleName = bgFor==='wrapper'?'wrapperStyle':'style';

  const dispatch = useAppDispatch();
  const [showPicker, setShowPicker] = React.useState(false);
  const selectedBlockId = useAppSelector(
    (state: RootState) => state.blockData.present.selectedBlockId
  );
  const selectedBlockStyle = useAppSelector((state: RootState) =>
    state.blockData.present.blocks.find(
      (block) => block.id === state.blockData.present.selectedBlockId
    )
  )?.[styleName];

  const backgroundOption = selectedBlockStyle?.background ?? "none";

  const [gradientStart, setGradientStart] = React.useState(
    backgroundOption?.includes("gradient")
      ? backgroundOption.split(" ")[1]
      : "blue"
  );
  const [gradientEnd, setGradientEnd] = React.useState(
    backgroundOption?.includes("gradient")
      ? backgroundOption.split(" ")[3]
      : "red"
  );

  const handleBackgroundOption = (
    event: React.MouseEvent<HTMLElement>,
    newValue: string
  ) => {
    if (newValue !== null) {
      dispatch(
        changeStyle({
          id: selectedBlockId,
          [styleName]: { ...selectedBlockStyle, background: newValue },
        })
      );
      // setBackgroundOption(newValue);
    } else if (backgroundOption === "image"){
        // open image picker
        dispatch(
          showModal({
            modalType: "addImage",
            fieldToSet: "backgroundImage",
            isWrapper: bgFor==='wrapper',
            forBlockId: selectedBlockId,
          })
        );
    }
  };
  // const [imageOption, setImageOption] = React.useState("default");
  const imageOption = selectedBlockStyle?.imageFilter ?? "none";

  const handleImageOption = (
    event: React.MouseEvent<HTMLElement>,
    newValue: string
  ) => {
    if (newValue !== null) {
      dispatch(
        changeStyle({
          id: selectedBlockId,
          [styleName]: { ...selectedBlockStyle, imageFilter: newValue },
        })
      );
      // setImageOption(newValue);
    }
  };

  const [gradientOption, setGradientOption] = React.useState("linear");

  const handleGradientChange = (event: SelectChangeEvent) => {
    setGradientOption(event.target.value as string);
  };

  return (
    <Stack direction="column" gap="8px" width="100%">
      <Stack>
        {backgroundOption.includes("none") ? (
          <TextField
            className="indivisible"
            color="secondary"
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
        ) : !backgroundOption?.includes("gradient") &&
          backgroundOption !== "image" ? (
          <>
            <Stack direction="row" gap="8px" width="100%">
              <ToggleButton
                value="color-1"
                sx={toggleButtonStyle}
                style={{ width: "50%" }}
                onClick={()=>setShowPicker(true)}
              >
                <div
                  style={{ backgroundColor: selectedBlockStyle?.background }}
                ></div>
              </ToggleButton>
              <TextField
                className="indivisible"
                color="secondary"
                value={selectedBlockStyle?.background}
                sx={{
                  width: "50%",
                }}
                onChange={(e) => {
                  dispatch(
                    changeStyle({
                      id: selectedBlockId,
                      [styleName]: {
                        ...selectedBlockStyle,
                        background: e.target.value,
                      },
                    })
                  );
                }}
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
              />
            </Stack>
            <div
              className="relative"
              style={{
                display: showPicker ? "block" : "none",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  zIndex: 100000,
                  top: 0,
                  left: 0,
                }}
              >
                <Backdrop
                  open={true}
                  sx={{ background: "transparent" }}
                  onClick={() => setShowPicker(false)}
                />
                <SketchPicker
                  disableAlpha={false}
                  color={selectedBlockStyle?.background ?? "#000000"}
                  onChange={(v, e) => {
                    dispatch(
                      changeStyle({
                        id: selectedBlockId,
                        [styleName]: {
                          ...selectedBlockStyle,
                          background: v.hex,
                        },
                      })
                    );
                  }}
                />
              </div>
            </div>
          </>
        ) : backgroundOption.includes("gradient") ? (
          <Stack direction="row" gap="8px">
            <Select
              color="secondary"
              fullWidth
              size="small"
              value={gradientOption}
              onChange={handleGradientChange}
              IconComponent={KeyboardArrowDownIcon}
            >
              <MenuItem value={"linear"}>선형</MenuItem>
              <MenuItem value={"radical"}>원형</MenuItem>
            </Select>
            <ToggleButton value="start" aria-label="start">
              <div
                className={styles.innerColorBox}
                style={{ background: "blue" }}
              ></div>
            </ToggleButton>
            <ToggleButton value="end" aria-label="end">
              <div
                className={styles.innerColorBox}
                style={{ background: "red" }}
              ></div>
            </ToggleButton>
            <ToggleButton
              value="none"
              aria-label="none"
              sx={{ width: "34px", minWidth: "34px" }}
            >
              <Image
                src={gradientOption === "linear" ? iconRotate : iconConvert}
                alt="switch"
              />
            </ToggleButton>
          </Stack>
        ) : backgroundOption === "image" ? (
          <ToggleButtonGroup
            value={imageOption}
            onChange={handleImageOption}
            exclusive
            fullWidth
          >
            <ToggleButton value="none" aria-label="default">
              기본
            </ToggleButton>
            <ToggleButton value="brightness(50%)" aria-label="dark">
              어둡게
            </ToggleButton>
            <ToggleButton value="opacity(50%)" aria-label="light">
              밝게
            </ToggleButton>
            <ToggleButton value="blur(10px)" aria-label="image">
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
        {/* none background option */}
        <ToggleButton
          value="none"
          aria-label="none"
          sx={{ width: "34px", minWidth: "34px" }}
        >
          <Image src={iconNone} alt="iconNone" />
        </ToggleButton>
        {/* solid background option */}
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
        {/* gradient background option */}
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
        {/* image background option */}
        <ToggleButton
          value="image"
          aria-label="image"
          sx={toggleButtonStyle}
          style={{ width: "34px" }}
        >
          <Image src={iconImage} alt="iconImage" />
        </ToggleButton>
      </ToggleButtonGroup>
    </Stack>
  );
}
