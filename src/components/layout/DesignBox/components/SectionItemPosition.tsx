import styles from "../styles.module.scss";
import React from "react";
import Image from "next/image";

import { Stack, ToggleButtonGroup, ToggleButton } from "@mui/material";

import iconAlignTopLeft from "/public/images/icon-align-top-left.svg";
import iconAlignTopCenter from "/public/images/icon-align-top-center.svg";
import iconAlignTopRight from "/public/images/icon-align-top-right.svg";
import iconAlignBottomLeft from "/public/images/icon-align-bottom-left.svg";
import iconAlignBottomCenter from "/public/images/icon-align-bottom-center.svg";
import iconAlignBottomRight from "/public/images/icon-align-bottom-right.svg";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { RootState } from "@/redux/store";
import { changeStyle } from "@/redux/features/BlockData/blockDataSlice";

export default function SectionItemPosition() {
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
      <div className={styles.sectionItemTitle}>위치</div>
      <div className={styles.toggleButtonWrap}>
        <ToggleButtonGroup
          value={selectedBlockStyle?.textAlign}
          exclusive
          onChange={handleAlignment}
          aria-label="text alignment"
          fullWidth
          sx={{
          }}
        >
          <ToggleButton value="topLeft" aria-label="topLeft" sx={{borderBottomLeftRadius: 0}}>
            <Image src={iconAlignTopLeft} alt="iconAlignLeft" />
          </ToggleButton>
          <ToggleButton value="topCenter" aria-label="topCenter">
            <Image src={iconAlignTopCenter} alt="iconAlignCenter" />
          </ToggleButton>
          <ToggleButton value="topRight" aria-label="topRight" sx={{borderBottomRightRadius: 0}}>
            <Image src={iconAlignTopRight} alt="iconAlignRight" />
          </ToggleButton>
        </ToggleButtonGroup>
        <ToggleButtonGroup
          value={selectedBlockStyle?.textAlign}
          exclusive
          onChange={handleAlignment}
          aria-label="text alignment"
          fullWidth
          sx={{
            transform: "translate(0,-1px)"
          }}
        >
          <ToggleButton value="bottomLeft" aria-label="bottomLeft" sx={{borderTopLeftRadius: 0}}>
            <Image src={iconAlignBottomLeft} alt="iconAlignLeft" />
          </ToggleButton>
          <ToggleButton value="bottomCenter" aria-label="bottomCenter">
            <Image src={iconAlignBottomCenter} alt="iconAlignCenter" />
          </ToggleButton>
          <ToggleButton value="bottomRight" aria-label="bottomRight" sx={{borderTopRightRadius: 0}}>
            <Image src={iconAlignBottomRight} alt="iconAlignRight" />
          </ToggleButton>
        </ToggleButtonGroup>
      </div>
    </Stack>
  );
}
