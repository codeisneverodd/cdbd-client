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

export default function SectionItemAlignment({
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

  // const [alignment, setAlignment] = React.useState("left");

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
      <div className={styles.sectionItemTitle}>정렬</div>
      <ToggleButtonGroup
        value={selectedBlockStyle?.textAlign}
        exclusive
        onChange={handleAlignment}
        aria-label="text alignment"
        fullWidth
      >
        <ToggleButton value="left" aria-label="alginLeft">
          <Image src={type === "default" ? iconAlignLeft : iconAlignTextLeft} alt="iconAlignLeft" />
        </ToggleButton>
        <ToggleButton value="center" aria-label="alginCenter">
          <Image src={type === "default" ? iconAlignCenter : iconAlignTextCenter} alt="iconAlignCenter" />
        </ToggleButton>
        <ToggleButton value="right" aria-label="alginRight">
          <Image src={type === "default" ? iconAlignRight : iconAlignTextRight} alt="iconAlignRight" />
        </ToggleButton>
      </ToggleButtonGroup>
    </Stack>
  );
}
