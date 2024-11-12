import styles from "../styles.module.scss";

import React from "react";
import { Stack, TextField, ToggleButton } from "@mui/material";
import Image from "next/image";

import iconEdit from "/public/images/icon-edit.svg";
import iconSwitchTheme from "/public/images/switch-theme.svg";
import iconTheme from "/public/images/block-icon-theme.svg";
import iconBold from "/public/images/icon-bold.svg";
import { ButtonSecondary } from "@/components/buttons/Buttons";

import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { showModal } from "@/redux/features/Modal/modalSlice";
import DesignBoxHead from "../components/DesignBoxHead";


export default function PageTheme() {
  const dispatch = useAppDispatch();
  const { background, color:textColor, buttonColor, fontFamily, headerFontFamily } = useAppSelector((state) => state.blockData.present.style);

  const handleAppThemeEdit = () => {
    dispatch(showModal({ modalType: "selectColor" }));
  }

  const handleHeaderFontFamilyEdit = () => {
    dispatch(showModal({ modalType: "selectFont", fieldToSet: "headerFontFamily" }));
  }

  const handleFontFamilyEdit = () => {
    dispatch(showModal({ modalType: "selectFont", fieldToSet: "fontFamily" }));
  }

  const [toggleButton, setToggleButton] = React.useState(false);


  return (
    <div className={styles.designBox}>
      <DesignBoxHead
        title="페이지 테마"
        icon={<Image src={iconTheme} alt="iconSwitchTheme" />}
      />

      <ul className={styles.body}>
        {/*  sectionItem: 기능정의서에서는 section이라고 함 */}
        <li className={styles.sectionItem}>
          <Stack direction="row">
            <div className={styles.sectionItemTitle}>서체</div>
            <Stack direction="column" gap="12px" width="100%" minWidth="0">
              <Stack direction="row" alignItems="center" width="100%">
                <span
                  className="subtitle2 text-grey-300"
                  style={{ minWidth: 52 }}
                >
                  제목
                </span>
                <Stack direction="row" gap="8px" width="100%" minWidth="0">
                  <ButtonSecondary
                    className="p1"
                    style={{
                      width: "100%",
                      height: 34,
                      textAlign: "left",
                      justifyContent: "space-between",
                      fontWeight: "bold !important",
                    }}
                    endIcon={
                      <Image
                        src={iconEdit}
                        alt="iconEdit"
                        width={15}
                        height={14}
                      />
                    }
                    onClick={handleHeaderFontFamilyEdit}
                  >
                    <span
                      style={{
                        display: "block",
                        textOverflow: "ellipsis",
                        width: "100%",
                        overflow: "hidden",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {(headerFontFamily==="unset" || !headerFontFamily) ? "default" : headerFontFamily}
                    </span>
                  </ButtonSecondary>
                  <ToggleButton
                    value="check"
                    style={{
                      minWidth: 34,
                      height: 34,
                    }}
                    selected={toggleButton}
                    onChange={() => {
                      setToggleButton(!toggleButton);
                    }}
                  >
                    <Image src={iconBold} alt="iconBold" />
                  </ToggleButton>
                </Stack>
              </Stack>
              <Stack direction="row" alignItems="center" width="100%">
                <span
                  className="subtitle2 text-grey-300"
                  style={{ minWidth: 52 }}
                >
                  본문
                </span>
                <Stack direction="row" gap="8px" width="100%" minWidth="0">
                  <ButtonSecondary
                    className="p1"
                    style={{
                      width: "100%",
                      height: 34,
                      textAlign: "left",
                      justifyContent: "space-between",
                    }}
                    endIcon={
                      <Image
                        src={iconEdit}
                        alt="iconEdit"
                        width={15}
                        height={14}
                      />
                    }
                    onClick={handleFontFamilyEdit}
                  >
                    <span
                      style={{
                        display: "block",
                        textOverflow: "ellipsis",
                        width: "100%",
                        overflow: "hidden",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {fontFamily==="unset" ? "default" : fontFamily}
                    </span>
                  </ButtonSecondary>
                  <ToggleButton
                    value="check"
                    style={{
                      minWidth: 34,
                      height: 34,
                    }}
                    selected={toggleButton}
                    onChange={() => {
                      setToggleButton(!toggleButton);
                    }}
                  >
                    <Image src={iconBold} alt="iconBold" />
                  </ToggleButton>
                </Stack>
              </Stack>
            </Stack>
          </Stack>
        </li>

        <li className={styles.sectionItem}>
          <Stack direction="row">
            <div className={styles.sectionItemTitle}>색상</div>
            <Stack direction="column" gap="12px" width="100%">
              <Stack direction="row" alignItems="center" width="100%">
                <span
                  className="subtitle2 text-grey-300"
                  style={{ minWidth: 52 }}
                >
                  배경
                </span>
                <Stack direction="row" gap="8px">
                  <div
                    className={styles.colorBox}
                    style={{ background: background }}
                  ></div>
                  <TextField
                    className="indivisible"
                    color="secondary"
                    value={background.includes("gradient") ? "gradient" : background}
                    fullWidth
                    sx={{ pointerEvents: "none" }}
                    // InputProps={{
                    //   startAdornment: (
                    //     <span
                    //       className="unit-eng"
                    //       style={{
                    //         marginRight: "8px",
                    //         color: "var(--color-grey-400)",
                    //       }}
                    //     >
                    //       #
                    //     </span>
                    //   ),
                    // }}
                    inputProps={{ className: "p1-eng" }}
                  />
                </Stack>
              </Stack>
              <Stack direction="row" alignItems="center" width="100%">
                <span
                  className="subtitle2 text-grey-300"
                  style={{ minWidth: 52 }}
                >
                  텍스트
                </span>
                <Stack direction="row" gap="8px">
                  <div
                    className={styles.colorBox}
                    style={{ backgroundColor: textColor }}
                  ></div>
                  <TextField
                    className="indivisible"
                    color="secondary"
                    value={textColor}
                    fullWidth
                    sx={{ pointerEvents: "none" }}
                    // InputProps={{
                    //   startAdornment: (
                    //     <span
                    //       className="unit-eng"
                    //       style={{
                    //         marginRight: "8px",
                    //         color: "var(--color-grey-400)",
                    //       }}
                    //     >
                    //       #
                    //     </span>
                    //   ),
                    // }}
                    inputProps={{ className: "p1-eng" }}
                  />
                </Stack>
              </Stack>
              <Stack direction="row" alignItems="center" width="100%">
                <span
                  className="subtitle2 text-grey-300"
                  style={{ minWidth: 52 }}
                >
                  버튼
                </span>
                <Stack direction="row" gap="8px">
                  <div
                    className={styles.colorBox}
                    style={{ backgroundColor: buttonColor }}
                  ></div>
                  <TextField
                    className="indivisible"
                    color="secondary"
                    value={buttonColor}
                    fullWidth
                    sx={{ pointerEvents: "none" }}
                    // InputProps={{
                    //   startAdornment: (
                    //     <span
                    //       className="unit-eng"
                    //       style={{
                    //         marginRight: "8px",
                    //         color: "var(--color-grey-400)",
                    //       }}
                    //     >
                    //       #
                    //     </span>
                    //   ),
                    // }}
                    inputProps={{ className: "p1-eng" }}
                  />
                </Stack>
              </Stack>
            </Stack>
          </Stack>
          <hr className="hr" />
          <ButtonSecondary
            style={{ width: "100%" }}
            startIcon={
              <Image src={iconEdit} alt="iconEdit" width={14} height={14} />
            }
            onClick={handleAppThemeEdit}
          >
            편집하기
          </ButtonSecondary>
        </li>
      </ul>
    </div>
  );
}
