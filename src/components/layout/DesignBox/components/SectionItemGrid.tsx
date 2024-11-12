import styles from "../styles.module.scss";
import React from "react";
import Image from "next/image";

import { Stack, ToggleButtonGroup, ToggleButton } from "@mui/material";

import iconAlignLeft from "/public/images/icon-align-image-left.svg";
import iconAlignCenter from "/public/images/icon-align-image-center.svg";
import iconAlignRight from "/public/images/icon-align-image-right.svg";
import iconAlignTextLeft from "/public/images/icon-align-text-left.svg";
import iconAlignTextCenter from "/public/images/icon-align-text-center.svg";
import iconAlignTextRight from "/public/images/icon-align-text-right.svg";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { RootState } from "@/redux/store";
import { changeStyle } from "@/redux/features/BlockData/blockDataSlice";

export default function SectionItemGrid({
  type = "default",
}: {
  type?: "default" | "text";
}) {
  const dispatch = useAppDispatch();
  const selectedBlockId = useAppSelector((state: RootState) => state.blockData.present.selectedBlockId);
  const selectedBlockStyle = useAppSelector((state: RootState) =>
    state.blockData.present.blocks.find(
      (block) => block.id === state.blockData.present.selectedBlockId
    )
  )?.style;

  const [alignment, setAlignment] = React.useState("left");

  const handleAlignment = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string
  ) => {
    // setAlignment(newAlignment);
    if(newAlignment !== null) {
      dispatch(changeStyle({ id: selectedBlockId, style: { ...selectedBlockStyle, textAlign: newAlignment } }));
    }
  };

  return (
    <Stack direction="row">
      <div className={styles.sectionItemTitle}>그리드</div>
      <ToggleButtonGroup
        value={selectedBlockStyle?.textAlign}
        exclusive
        onChange={handleAlignment}
        aria-label="text alignment"
        fullWidth
      >
        <ToggleButton value="one" aria-label="one">
          1단
        </ToggleButton>
        <ToggleButton value="two" aria-label="two">
          2단
        </ToggleButton>
        <ToggleButton value="three" aria-label="three">
          3단
        </ToggleButton>
      </ToggleButtonGroup>
    </Stack>
  );
}
