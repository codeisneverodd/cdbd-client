import styles from "../styles.module.scss";
import React from "react";
import Image from "next/image";

import { Stack, ToggleButton, ToggleButtonGroup } from "@mui/material";

import iconCornerBevel from "/public/images/icon-corner-bevel.svg";
import iconCornerCircle from "/public/images/icon-corner-circle.svg";
import iconCornerRound from "/public/images/icon-corner-round.svg";
import iconCornerRight from "/public/images/icon-corner-right.svg";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { RootState } from "@/redux/store";
import { changeStyle } from "@/redux/features/BlockData/blockDataSlice";

export default function SectionItemCorner({type = "default", brFor="block"}: {type?: "default" | "image", brFor?: "wrapper" | "block"}) {
  const styleName = brFor === "wrapper" ? "wrapperStyle" : "style";
  const dispatch = useAppDispatch();
  const selectedBlockId = useAppSelector((state: RootState) => state.blockData.present.selectedBlockId);
  const selectedBlockStyle = useAppSelector((state: RootState) =>
    state.blockData.present.blocks.find(
      (block) => block.id === state.blockData.present.selectedBlockId
    )
  )?.[styleName];

  const [alignment, setAlignment] = React.useState(type === "default" ? "cornerCircle" : "cornerRight");

  const handleBorderRadiusChange = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string
  ) => {
    dispatch(changeStyle({id: selectedBlockId, [styleName]:{ ...selectedBlockStyle, borderRadius: Number(newAlignment)??0 }}))
  };

  return (
    <Stack direction="row">
      <div className={styles.sectionItemTitle}>모서리</div>
      <Stack direction="row" gap="8px" width="100%">

        {
          type === "default" ? (
            <ToggleButtonGroup
              value={selectedBlockStyle?.borderRadius}
              exclusive
              onChange={handleBorderRadiusChange}
              aria-label="text alignment"
              fullWidth
            >
              <ToggleButton value={999} aria-label="cornerCircle">
                <Image src={iconCornerCircle} alt="iconCornerCircle" />
              </ToggleButton>
              <ToggleButton value={20} aria-label="cornerRound">
                <Image src={iconCornerRound} alt="iconCornerRound" />
              </ToggleButton>
              <ToggleButton value={0} aria-label="cornerRight">
                <Image src={iconCornerRight} alt="iconCornerRight" />
              </ToggleButton>
            </ToggleButtonGroup>
          ): (
            <ToggleButtonGroup
              value={selectedBlockStyle?.borderRadius}
              exclusive
              onChange={handleBorderRadiusChange}
              aria-label="text alignment"
              fullWidth
            >
              <ToggleButton value="999" aria-label="cornerRight">
                <Image src={iconCornerRight} alt="iconCornerRight" />
              </ToggleButton>
              <ToggleButton value="20" aria-label="cornerRound">
                <Image src={iconCornerRound} alt="iconCornerRound" />
              </ToggleButton>
              <ToggleButton value="0" aria-label="cornerBevel">
                <Image src={iconCornerBevel} alt="iconCornerBevel" />
              </ToggleButton>
            </ToggleButtonGroup>
          )
        }
      </Stack>
    </Stack>
  );
}
