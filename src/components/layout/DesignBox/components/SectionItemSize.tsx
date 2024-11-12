import styles from "../styles.module.scss";
import React from "react";

import { Stack, Slider, TextField } from '@mui/material'
import { useDispatch, useSelector } from "react-redux";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { RootState } from "@/redux/store";
import { changeStyle } from "@/redux/features/BlockData/blockDataSlice";

export default function SectionItemSize({disableUnit = false, title="크기"}: {disableUnit?: boolean; title?: string;}) {
  const dispatch = useAppDispatch();
  const selectedBlockId = useAppSelector((state: RootState) => state.blockData.present.selectedBlockId);
  const selectedBlockStyle = useAppSelector((state: RootState) =>
    state.blockData.present.blocks.find(
      (block) => block.id === state.blockData.present.selectedBlockId
    )
  )?.style;

  return (
    <Stack direction="row" width="100%">
    <div className={styles.sectionItemTitle}>{title}</div>
    <Stack direction="row" alignItems="center" gap="12px" width="100%">
      <Slider
        color="secondary"
        aria-label="padding"
        value={selectedBlockStyle?.size}
        onChange={(e, value) => dispatch(changeStyle({id: selectedBlockId, style:{ ...selectedBlockStyle, size: value }}))}
        shiftStep={10}
        step={6}
        marks
        min={6}
        max={60}
      />
      <TextField
        className="indivisible"
        color="secondary"
        placeholder="0"
        value={selectedBlockStyle?.size}
        sx={{
          width: "60px",
          minWidth: "60px",
          "& .MuiInputBase-root": {
            padding: 0,
          },
        }}
        InputProps={{
          endAdornment: !disableUnit && (
            <span
              className="unit-eng"
              style={{
                marginRight: "8px",
                color: "var(--color-grey-400)",
              }}
            >
              %
            </span>
          ),
        }}
      />
    </Stack>
  </Stack>
  )
}
