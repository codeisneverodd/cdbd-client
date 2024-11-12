import styles from "../styles.module.scss";
import React from "react";

import { Stack, Slider, TextField, ToggleButton, ToggleButtonGroup } from '@mui/material'
import { useDispatch, useSelector } from "react-redux";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { RootState } from "@/redux/store";
import { changeStyle } from "@/redux/features/BlockData/blockDataSlice";

export default function SectionItemFilter({disableUnit = false}: {disableUnit?: boolean}) {
  const dispatch = useAppDispatch();
  const selectedBlockId = useAppSelector((state: RootState) => state.blockData.present.selectedBlockId);
  const selectedBlockStyle = useAppSelector((state: RootState) =>
    state.blockData.present.blocks.find(
      (block) => block.id === state.blockData.present.selectedBlockId
    )
  )?.style;

  return (
    <Stack direction="row" width="100%">
      <div className={styles.sectionItemTitle}>필터</div>
      <ToggleButtonGroup
        value={"default"}
        // onChange={handleImageOption}
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
    </Stack>
  );
}
