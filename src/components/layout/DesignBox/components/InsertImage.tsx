import styles from "../styles.module.scss";

import React from "react";

import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Checkbox,
  FormControlLabel,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

import Image from "next/image";

import typeRow from "/public/images/icon-type-row.svg";
import typeRowActive from "/public/images/icon-type-row-active.svg";
import iconTypeCard from "/public/images/icon-type-card.svg";
import iconTypeCardActive from "/public/images/icon-type-card-active.svg";
import iconTypeBackground from "/public/images/icon-type-background.svg";
import iconTypeBackgroundActive from "/public/images/icon-type-background-active.svg";


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
};


export default function InsertImage() {
  const [layout, setLayout] = React.useState("typeRow");

  const handleLayout = (
    event: React.MouseEvent<HTMLElement>,
    newLayout: string
  ) => {
    if (newLayout !== null) {
      setLayout(newLayout);
    }
  };

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
          <div className="h5">이미지 삽입</div>
        </AccordionSummary>
        <AccordionDetails sx={{ padding: 0, marginTop: "20px" }}>
        <ToggleButtonGroup
            value={layout}
            exclusive
            onChange={handleLayout}
            aria-label="type"
            fullWidth
            sx={{
              height: "max-content",
            }}
          >
            <ToggleButton
              value="typeRow"
              aria-label="typeRow"
              sx={layoutToggleButtonStyle}
              className={styles.toggleButtonImage}
            >
              <Image
                src={
                  layout === "typeRow"
                    ? typeRowActive
                    : typeRow
                }
                alt="typeRow"
              />
              <Image
                src={typeRowActive}
                alt="typeRow"
              />
              <span className="caption">가로 버튼형</span>
            </ToggleButton>
            <ToggleButton
              value="typeCard"
              aria-label="typeCard"
              sx={layoutToggleButtonStyle}
              className={styles.toggleButtonImage}
            >
              <Image
                src={
                  layout === "typeCard"
                    ? iconTypeCardActive
                    : iconTypeCard
                }
                alt="iconTypeCard"
              />
              <Image
                src={iconTypeCardActive}
                alt="iconTypeCard"
              />
              <span className="caption">카드형</span>
            </ToggleButton>
            <ToggleButton
              value="typeBackground"
              aria-label="typeBackground"
              sx={layoutToggleButtonStyle}
              className={styles.toggleButtonImage}
            >
              <Image
                src={
                  layout === "typeBackground"
                    ? iconTypeBackgroundActive
                    : iconTypeBackground
                }
                alt="iconTypeBackground"
              />
              <Image
                src={iconTypeBackgroundActive}
                alt="iconTypeBackground"
              />
              <span className="caption">배경형</span>
            </ToggleButton>
          </ToggleButtonGroup>

          <FormControlLabel
            className="caption"
            control={
              <Checkbox size="small" color="secondary" sx={{height: "18px"}}/>
            }
            sx={{mt: "12px"}}
            label="원본 비율 유지"
          />
        </AccordionDetails>
      </Accordion>
    </li>
  );
}
