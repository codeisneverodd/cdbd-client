import styles from "../styles.module.scss";

import React from "react";
// import { ButtonSecondary } from "@/components/Buttons";
import {
  Stack,
  ToggleButton,
  ToggleButtonGroup,
  MenuItem,
  Select,
  SelectChangeEvent,
  ButtonGroup,
} from "@mui/material";
import Image from "next/image";

import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import iconMinus from "/public/images/icon-minus.svg";
import iconPlus from "/public/images/icon-plus.svg";
import iconProfile from "/public/images/block-icon-primary-Profile.svg";

import iconLayoutDefault from "/public/images/layout-default.svg";
import iconLayoutDefaultActive from "/public/images/layout-default-active.svg";
import iconLayoutCover from "/public/images/layout-cover.svg";
import iconLayoutCoverActive from "/public/images/layout-cover-active.svg";
import iconLayoutNamecard from "/public/images/layout-namecard.svg";
import iconLayoutNamecardActive from "/public/images/layout-namecard-active.svg";

import BlockDesign from "../components/BlockDesign";
import DesignBoxHead from "../components/DesignBoxHead";
// import InfoText from "@/components/InfoText";
// import { SwitchSecondary } from "@/components/Switches";
import SectionItemAlignment from "../components/SectionItemAlignment";
import SectionItemFont from "../components/SectionItemFont";
import SectionItemColor from "../components/SectionItemColor";
import SectionItemRatio from "../components/SectionItemRatio";
import SectionItemSize from "../components/SectionItemSize";
import SectionItemCorner from "../components/SectionItemCorner";
import { ButtonSecondary } from "@/components/buttons/Buttons";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { changeStyle } from "@/redux/features/BlockData/blockDataSlice";

const layoutToggleButtonStyle = {
  overflow: "hidden",
  padding: "0 0 6px",
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
  height: "unset"
};

export default function Profile() {
  // const [structure, setStructure] = React.useState(() => [
  //   "profile",
  //   "poster",
  // ]);
  const dispatch = useAppDispatch();
  const selectedBlockId = useAppSelector((state) => state.blockData.present.selectedBlockId);
  const selectedBlockStyle = useAppSelector((state) =>
    state.blockData.present.blocks.find(
      (block) => block.id === state.blockData.present.selectedBlockId
    )?.style
  );
  const structure = useAppSelector((state) => state.blockData.present.blocks.find(v=>v.id === state.blockData.present.selectedBlockId)?.style?.structure);


  const handleStructure = (
    event: React.MouseEvent<HTMLElement>,
    newStructure: string[]
  ) => {
    console.log("newStructure");
    console.log(newStructure);
    if (newStructure && newStructure.length) {
      // setStructure(newStructure);
      dispatch(
        changeStyle({
          id: selectedBlockId,
          style: {
            ...selectedBlockStyle,
            structure: newStructure,
          },
        })
      );
    }
  };

  // const [layout, setLayout] = React.useState("layoutDefault");
  const layout = useAppSelector((state) => state.blockData.present.blocks.find(v=>v.id === state.blockData.present.selectedBlockId)?.style?.layout);

  const handleLayout = (
    event: React.MouseEvent<HTMLElement>,
    newLayout: string
  ) => {
    if (newLayout !== null) {
      // setLayout(newLayout);
      dispatch(
        changeStyle({
          id: selectedBlockId,
          style: {
            ...selectedBlockStyle,
            layout: newLayout,
          },
        })
      );
    }
  };

  // const [select, setSelect] = React.useState("10");
  const nameSelect = useAppSelector((state) => state.blockData.present.blocks.find(v=>v.id === state.blockData.present.selectedBlockId)?.style?.nameFontSize);
  const descriptionSelect = useAppSelector((state) => state.blockData.present.blocks.find(v=>v.id === state.blockData.present.selectedBlockId)?.style?.descriptionFontSize);

  const handleNameSelectChange = (event: SelectChangeEvent) => {
    // setSelect(event.target.value as string);
    dispatch(
      changeStyle({
        id: selectedBlockId,
        style: {
          ...selectedBlockStyle,
          nameFontSize: event.target.value as string,
        },
      })
    );
  };

  const handleNameFontSizeIncrease = () => {
    dispatch(
      changeStyle({
        id: selectedBlockId,
        style: {
          ...selectedBlockStyle,
          nameFontSize: nameSelect + 1,
        },
      })
    );
  }

  const handleNameFontSizeDecrease = () => {
    dispatch(
      changeStyle({
        id: selectedBlockId,
        style: {
          ...selectedBlockStyle,
          nameFontSize: nameSelect - 1,
        },
      })
    );
  }

  const handleDescriptionSelectChange = (event: SelectChangeEvent) => {
    // setSelect(event.target.value as string);
    dispatch(
      changeStyle({
        id: selectedBlockId,
        style: {
          ...selectedBlockStyle,
          descriptionFontSize: event.target.value as string,
        },
      })
    );
  };

  const handleDescriptionFontSizeIncrease = () => {
    dispatch(
      changeStyle({
        id: selectedBlockId,
        style: {
          ...selectedBlockStyle,
          descriptionFontSize: descriptionSelect + 1,
        },
      })
    );
  }

  const handleDescriptionFontSizeDecrease = () => {
    dispatch(
      changeStyle({
        id: selectedBlockId,
        style: {
          ...selectedBlockStyle,
          descriptionFontSize: descriptionSelect - 1,
        },
      })
    );
  }

  return (
    <div className={styles.designBox}>
      <DesignBoxHead
        title="프로필"
        icon={<Image src={iconProfile} alt="iconProfile" />}
      />

      <ul className={styles.body}>
        <li className={styles.sectionItem}>
          <div className={`${styles.sectionItemTitle} ${styles.column}`}>
            레이아웃
          </div>
          <ToggleButtonGroup
            value={layout}
            exclusive
            onChange={handleLayout}
            aria-label="text alignment"
            fullWidth
            sx={{
              height: "max-content",
            }}
          >
            <ToggleButton
              value="default"
              aria-label="layoutDefault"
              sx={layoutToggleButtonStyle}
              className={styles.toggleButtonImage}
            >
              <Image
                src={
                  layout === "layoutDefault"
                    ? iconLayoutDefaultActive
                    : iconLayoutDefault
                }
                alt="iconLayoutDefault"
              />
              <Image
                src={iconLayoutDefaultActive}
                alt="iconLayoutDefault"
              />
              <span className="caption">기본형</span>
            </ToggleButton>
            <ToggleButton
              value="cover"
              aria-label="layoutCover"
              sx={layoutToggleButtonStyle}
              className={styles.toggleButtonImage}
            >
              <Image
                src={
                  layout === "layoutCover"
                    ? iconLayoutCoverActive
                    : iconLayoutCover
                }
                alt="iconLayoutCover"
              />
              <Image
                src={iconLayoutCoverActive}
                alt="iconLayoutCover"
              />
              <span className="caption">커버형</span>
            </ToggleButton>
            <ToggleButton
              value="namecard"
              aria-label="layoutNamecard"
              sx={layoutToggleButtonStyle}
              className={styles.toggleButtonImage}
            >
              <Image
                src={
                  layout === "layoutNamecard"
                    ? iconLayoutNamecardActive
                    : iconLayoutNamecard
                }
                alt="iconLayoutNamecard"
              />
              <Image
                src={iconLayoutNamecardActive}
                alt="iconLayoutNamecard"
              />
              <span className="caption">명함형</span>
            </ToggleButton>
          </ToggleButtonGroup>

          <hr className="hr" />

          <Stack direction="row">
            <div className={styles.sectionItemTitle}>구성</div>
            <ToggleButtonGroup
              value={structure}
              onChange={handleStructure}
              aria-label="structure"
              fullWidth
            >
              <ToggleButton value="profile" aria-label="profile">
                <span className="subtitle2">프로필</span>
              </ToggleButton>
              <ToggleButton value="poster" aria-label="background">
                <span className="subtitle2">배경</span>
              </ToggleButton>
              <ToggleButton value="name" aria-label="name">
                <span className="subtitle2">이름</span>
              </ToggleButton>
              <ToggleButton value="description" aria-label="introduce">
                <span className="subtitle2">소개</span>
              </ToggleButton>
            </ToggleButtonGroup>
          </Stack>

          <hr className="hr" />
          <SectionItemAlignment />
        </li>

        {/* structure: PROFILE */}
        <li className={styles.sectionItem}>
          <div
            className={`${styles.sectionItemTitle} ${styles.column}`}
            style={{ fontWeight: 700, marginBottom: 20 }}
          >
            프로필
          </div>
          <SectionItemRatio />
          <hr className="hr" />
          <SectionItemSize />
          <hr className="hr" />
          <SectionItemCorner />
        </li>

        {/* structure: TEXT */}
        <li className={styles.sectionItem}>
          <div
            className={`${styles.sectionItemTitle} ${styles.column}`}
            style={{ fontWeight: 700, marginBottom: 20 }}
          >
            텍스트
          </div>
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
                  이름
                </span>
                <Stack direction="row" gap="8px" width="100%">
                  <Select
                    color="secondary"
                    fullWidth
                    size="small"
                    value={nameSelect}
                    onChange={handleNameSelectChange}
                    IconComponent={KeyboardArrowDownIcon}
                    className="indivisible"
                  >
                    <MenuItem value={10} className="indivisible">10</MenuItem>
                    <MenuItem value={20} className="indivisible">20</MenuItem>
                    <MenuItem value={30} className="indivisible">30</MenuItem>
                    <MenuItem value={nameSelect} className="h-0 p-[0!important] overflow-clip">{nameSelect}</MenuItem>
                  </Select>
                  <ButtonGroup aria-label="Basic button group">
                    <ButtonSecondary onClick={handleNameFontSizeDecrease}>
                      <Image src={iconMinus} alt="iconMinus" />
                    </ButtonSecondary>
                    <ButtonSecondary onClick={handleNameFontSizeIncrease}>
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
                  소개
                </span>
                <Stack direction="row" gap="8px" width="100%">
                  <Select
                    color="secondary"
                    fullWidth
                    size="small"
                    value={descriptionSelect}
                    onChange={handleDescriptionSelectChange}
                    IconComponent={KeyboardArrowDownIcon}
                    className="indivisible"
                  >
                    <MenuItem value={10} className="indivisible">10</MenuItem>
                    <MenuItem value={20} className="indivisible">20</MenuItem>
                    <MenuItem value={30} className="indivisible">30</MenuItem>
                    <MenuItem value={descriptionSelect} className="h-0 p-[0!important] overflow-clip">{descriptionSelect}</MenuItem>
                  </Select>
                  <ButtonGroup aria-label="Basic button group">
                    <ButtonSecondary onClick={handleDescriptionFontSizeDecrease}>
                      <Image src={iconMinus} alt="iconMinus" />
                    </ButtonSecondary>
                    <ButtonSecondary onClick={handleDescriptionFontSizeIncrease}>
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
    </div>
  );
}
