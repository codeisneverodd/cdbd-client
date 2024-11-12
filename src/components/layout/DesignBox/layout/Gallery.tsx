"use client";
import styles from "../styles.module.scss";

import React from "react";
// import { ButtonSecondary } from "@/components/Buttons";
import {
  FormGroup,
  FormControlLabel,
  Stack,
  ToggleButton,
  ToggleButtonGroup,
  Divider,
  MenuItem,
  Select,
  SelectChangeEvent,
  ButtonGroup,
  TextField,
} from "@mui/material";
import Image from "next/image";

import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import iconMinus from "/public/images/icon-minus.svg";
import iconPlus from "/public/images/icon-plus.svg";
import iconGallery from "/public/images/block-icon-primary-Gallery.svg";
import iconLayoutList from "/public/images/layout-list.png";
import iconLayoutListActive from "/public/images/layout-list-active.png";
import iconLayoutSlide from "/public/images/layout-slide.png";
import iconLayoutSlideActive from "/public/images/layout-slide-active.png";
import iconLayoutGrid from "/public/images/layout-grid.png";
import iconLayoutGridActive from "/public/images/layout-grid-active.png";
import BlockDesign from "../components/BlockDesign";
import DesignBoxHead from "../components/DesignBoxHead";
import SectionItemRatio from "../components/SectionItemRatio";
import SectionItemCorner from "../components/SectionItemCorner";
import { SwitchSecondary } from "@/components/buttons/Switches";
import { ButtonSecondary } from "@/components/buttons/Buttons";
import InfoText from "@/components/text/InfoText";
import ImageHover from "@/components/util/ImageHover";
import GalleryDnd from "./GalleryDnd";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { changeStyle } from "@/redux/features/BlockData/blockDataSlice";

const layoutToggleButtonStyle = {
  padding: "6px 0",
  display: "flex",
  flexDirection: "column",
  gap: "4px",
  "&.Mui-selected": {
    borderColor: "var(--color-success)",
    backgroundColor: "var(--color-success-light)",
    "& img": {
      filter: "unset",
    },
    "& span": {
      color: "var(--color-success)",
    },
  },
};

export default function Gallery({title="갤러리"}: {title?:string}) {
  const [layout, setLayout] = React.useState("layoutList");
  const dispatch = useAppDispatch();
  const selectedBlockStyle = useAppSelector(
    (state) =>
      state.blockData.present.blocks.find(
        (block) => block.id === state.blockData.present.selectedBlockId
      )?.style
  );

  const handleLayoutChange = (
    event: React.MouseEvent<HTMLElement>,
    newLayout: string
  ) => {
    if (newLayout !== null) {
      dispatch(
        changeStyle({
          style:{
            ...selectedBlockStyle,
            layout: newLayout,
          }
        })
      );
    }
  };


  const [select, setSelect] = React.useState("10");

  const handleSelectChange = (event: SelectChangeEvent) => {
    setSelect(event.target.value as string);
  };

  return (
    <div className={styles.designBox}>
      <DesignBoxHead
        title={title}
        icon={<Image src={iconGallery} alt="iconGallery" />}
      />

      <ul className={styles.body}>
        <li className={styles.sectionItem}>
          <Stack direction="column">
            <div className={`${styles.sectionItemTitle} ${styles.column}`}>
              이미지 목록
            </div>
            <div>
            <GalleryDnd />
            </div>
            <InfoText>최대 15장, 1장당 10MB까지 업로드 가능해요.</InfoText>
          </Stack>

          <hr className="hr" />

          <Stack direction="column">
            <div className={`${styles.sectionItemTitle} ${styles.column}`}>
              레이아웃
            </div>

            <Stack direction="column" gap="8px" width="100%">
              <ToggleButtonGroup
                value={selectedBlockStyle?.layout??'layoutList'}
                exclusive
                onChange={handleLayoutChange}
                aria-label="text alignment"
                fullWidth
                sx={{
                  height: "max-content",
                }}
              >
                <ToggleButton
                  value="layoutList"
                  aria-label="layoutList"
                  sx={layoutToggleButtonStyle}
                  className={styles.toggleButtonImage}
                >
                  <Image
                    src={
                      layout === "layoutList"
                        ? iconLayoutListActive
                        : iconLayoutList
                    }
                    alt="iconLayoutList"
                  />
                  {/* hover image */}
                  <Image
                    src={iconLayoutListActive}
                    alt="iconLayoutList"
                  />
                  <span className="caption">나열하기</span>
                </ToggleButton>
                <ToggleButton
                  value="layoutSlide"
                  aria-label="layoutSlide"
                  sx={layoutToggleButtonStyle}
                  className={styles.toggleButtonImage}
                >
                  <Image
                    src={
                      layout === "layoutSlide"
                        ? iconLayoutSlideActive
                        : iconLayoutSlide
                    }
                    alt="iconLayoutSlide"
                  />
                  {/* hover image */}
                  <Image
                    src={iconLayoutSlideActive}
                    alt="iconLayoutSlide"
                  />
                  <span className="caption">넘겨보기</span>
                </ToggleButton>
                <ToggleButton
                  value="layoutGrid"
                  aria-label="layoutGrid"
                  sx={layoutToggleButtonStyle}
                  className={styles.toggleButtonImage}
                >
                  <Image
                    src={
                      layout === "layoutGrid"
                        ? iconLayoutGridActive
                        : iconLayoutGrid
                    }
                    alt="iconLayoutGrid"
                  />
                  <Image
                    src={iconLayoutGridActive}
                    alt="iconLayoutGrid"
                  />
                  <span className="caption">그리드</span>
                </ToggleButton>
              </ToggleButtonGroup>

              {selectedBlockStyle?.layout === "layoutSlide" && (
                <Stack direction="row" mt="16px" alignItems="center">
                  <FormControlLabel
                    value={selectedBlockStyle?.navigator}
                    onChange={(e:any) => dispatch(changeStyle({  style:{ ...selectedBlockStyle, navigator: e.target?.checked??false}}))}
                    sx={{ marginLeft: 0 }}
                    control={<SwitchSecondary />}
                    label={
                      <span className="caption" style={{ marginLeft: "8px" }}>
                        내비게이션
                      </span>
                    }
                  />
                  <Divider
                    orientation="vertical"
                    sx={{ height: "34px", margin: "0 16px" }}
                  />
                  <FormControlLabel
                    sx={{ marginLeft: 0 }}
                    value={selectedBlockStyle?.autoPlay}
                    onChange={(e:any) => dispatch(changeStyle({  style:{ ...selectedBlockStyle, autoPlay: e.target?.checked??false}}))}
                    control={<SwitchSecondary />}
                    label={
                      <span
                        className="caption text-grey-400"
                        style={{ marginLeft: "8px" }}
                      >
                        자동 넘김
                      </span>
                    }
                  />

                  <Select
                    color="secondary"
                    size="small"
                    value={select}
                    onChange={handleSelectChange}
                    IconComponent={KeyboardArrowDownIcon}
                    endAdornment={
                      <span
                        className="unit-kor text-grey-400"
                        style={{ paddingRight: "12px" }}
                      >
                        초
                      </span>
                    }
                    sx={{
                      marginLeft: "8px",
                      "& .MuiSelect-outlined": {
                        paddingRight: "4px !important",
                      },
                    }}
                  >
                    <MenuItem value={"10"}>10</MenuItem>
                    <MenuItem value={"20"}>20</MenuItem>
                    <MenuItem value={"30"}>30</MenuItem>
                  </Select>
                </Stack>
              )}
              {selectedBlockStyle?.layout === "layoutGrid" && (
                <Stack direction="row" mt="16px" alignItems="center" gap="8px">
                  <TextField
                    color="secondary"
                    value={selectedBlockStyle?.column}
                    sx={{
                      width: "60px",
                      minWidth: "60px",
                      "& .MuiInputBase-root": {
                        padding: 0,
                      },
                    }}
                    onChange={(e) => dispatch(changeStyle({  style:{ ...selectedBlockStyle, column: e.target.value}}))}
                    InputProps={{
                      endAdornment: (
                        <span
                          className="unit-kor"
                          style={{
                            marginRight: "8px",
                            color: "var(--color-grey-400)",
                          }}
                        >
                          단
                        </span>
                      ),
                    }}
                  />

                  <ButtonGroup aria-label="Basic button group">
                    <ButtonSecondary onClick={
                      () => dispatch(changeStyle({  style:{ ...selectedBlockStyle, column: (Number(selectedBlockStyle?.column)||0)-1}}))
                    }>
                      <Image src={iconMinus} alt="iconMinus" />
                    </ButtonSecondary>
                    <ButtonSecondary onClick={
                      () => dispatch(changeStyle({  style:{ ...selectedBlockStyle, column: (Number(selectedBlockStyle?.column)||0)+1}}))
                    }>
                      <Image src={iconPlus} alt="iconPlus" />
                    </ButtonSecondary>
                  </ButtonGroup>
                </Stack>
              )}
            </Stack>
          </Stack>
        </li>

        <li className={styles.sectionItem}>
          <SectionItemRatio />
          <hr className="hr" />

          <SectionItemCorner type="image" />
        </li>

        <BlockDesign />
      </ul>
    </div>
  );
}
