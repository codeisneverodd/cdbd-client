import styles from "../styles.module.scss";
import React from "react";
import Image from "next/image";

import { Stack, ToggleButton, TextField, Backdrop } from "@mui/material";

import iconSpoid from "/public/images/icon-spoid.svg";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { RootState } from "@/redux/store";
import { changeStyle } from "@/redux/features/BlockData/blockDataSlice";
import { SketchPicker } from "react-color";

const toggleButtonStyle = {
  width: "50%",
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

export default function SectionItemColor() {
  const [showPicker, setShowPicker] = React.useState<Boolean>(false);
  const dispatch = useAppDispatch();
  const selectedBlockId = useAppSelector(
    (state: RootState) => state.blockData.present.selectedBlockId
  );
  const selectedBlockStyle = useAppSelector(
    (state: RootState) =>
      state.blockData.present.blocks.find(
        (block) => block.id === state.blockData.present.selectedBlockId
      )?.style
  );

  const [toggleButton, setToggleButton] = React.useState(false);

  const [colorToggle, setColorToggle] = React.useState("color-1");

  const handleColorToggle = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string
  ) => {
    setColorToggle(newAlignment);
  };

  return (
    <>
      <Stack direction="row">
        <div className={styles.sectionItemTitle}>색상</div>
        <Stack direction="row" gap="8px" width="100%">
          <ToggleButton
            value="color-1"
            sx={toggleButtonStyle}
            onClick={(e) => {
              e.stopPropagation();
              setShowPicker(true);
            }}
          >
            <div
              style={{ backgroundColor: selectedBlockStyle?.color ?? "unset" }}
            ></div>
          </ToggleButton>
          <TextField
            className="indivisible"
            color="secondary"
            value={selectedBlockStyle?.color}
            onChange={(e) => {
              dispatch(
                changeStyle({
                  id: selectedBlockId,
                  style: {
                    ...selectedBlockStyle,
                    color: e.target.value,
                  },
                })
              );
            }}
            sx={{
              width: "50%",
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
      </Stack>
      <div
        className="relative"
        style={{
          display: showPicker ? "block" : "none",
        }}
      >
        <div
          style={{ position: "absolute", zIndex: 100000, top: 0, left: "8px" }}
        >
          <Backdrop
            open={true}
            sx={{ background: "transparent" }}
            onClick={() => setShowPicker(false)}
          />
          <SketchPicker
            disableAlpha={false}
            color={selectedBlockStyle?.color ?? "#000000"}
            onChange={(v, e) => {
              dispatch(
                changeStyle({
                  id: selectedBlockId,
                  style: {
                    ...selectedBlockStyle,
                    color: v.hex,
                  },
                })
              );
            }}
          />
        </div>
      </div>
    </>
  );
}
