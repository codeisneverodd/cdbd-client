import styles from "../styles.module.scss";
import React from "react";
import Image from "next/image";

// import { ButtonSecondary } from "@/components/Buttons";
import { Stack, ToggleButton } from "@mui/material";

import iconBold from "/public/images/icon-bold.svg";
import iconUnderline from "/public/images/icon-underline.svg";
import iconEdit from "/public/images/icon-edit.svg";
import { ButtonSecondary } from "@/components/buttons/Buttons";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { RootState } from "@/redux/store";
import { changeStyle } from "@/redux/features/BlockData/blockDataSlice";
import { showModal } from "@/redux/features/Modal/modalSlice";

export default function SectionItemFont({disableOption = false} : {disableOption?: boolean}) {
  const dispatch = useAppDispatch();
  const selectedBlockId = useAppSelector((state: RootState) => state.blockData.present.selectedBlockId);
  const selectedBlockStyle = useAppSelector((state: RootState) =>
    state.blockData.present.blocks.find(
      (block) => block.id === state.blockData.present.selectedBlockId
    )
  )?.style;

  const [toggleButton, setToggleButton] = React.useState(false);

  const handleSelectFont = () => {
    dispatch(showModal({ modalType: "selectFont", forBlockId: selectedBlockId }));
  }

  return (
    <Stack direction="row">
      <div className={styles.sectionItemTitle}>서체</div>
      <Stack direction="row" gap="8px" width="100%">
        <ButtonSecondary
          className="p1"
          style={{
            width: "100%",
            maxWidth: "unset",
            height: "34px",
            textAlign: "left",
            justifyContent: "space-between",
          }}
          endIcon={
            <Image src={iconEdit} alt="iconEdit" width={15} height={14} />
          }
          onClick={handleSelectFont}
        >
          {selectedBlockStyle?.fontFamily || "서체를 선택하세요"}
        </ButtonSecondary>
        {
          !disableOption && (
          <Stack direction="row" gap="4px" width="unset">
            <ToggleButton
              value={"check"}
              // selected={toggleButton}
              selected={selectedBlockStyle?.fontWeight === "bold"}
              onChange={() => {
                dispatch(changeStyle({ id: selectedBlockId, style: { ...selectedBlockStyle, fontWeight: selectedBlockStyle?.fontWeight === "bold" ? "normal" : "bold" } }));
              }}
              style={{
                width: 34,
                height: 34,
              }}
            >
              <Image src={iconBold} alt="iconBold" />
            </ToggleButton>
            <ToggleButton
              value="check"
              selected={selectedBlockStyle?.textDecoration === "underline"}
              onChange={() => {
                dispatch(changeStyle({ id: selectedBlockId, style: { ...selectedBlockStyle, textDecoration: selectedBlockStyle?.textDecoration === "underline" ? "none" : "underline" } }));
              }}
              style={{
                width: 34,
                height: 34,
              }}
            >
              <Image src={iconUnderline} alt="iconUnderline" />
            </ToggleButton>
          </Stack>
          )
        }
      </Stack>
    </Stack>
  );
}
