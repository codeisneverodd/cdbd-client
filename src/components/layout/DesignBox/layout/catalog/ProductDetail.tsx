import styles from "../../styles.module.scss";

import React from "react";
import {
  Stack,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import Image from "next/image";

import iconQna from "/public/images/block-icon-primary-QnA.svg";

import DesignBoxHead from "../../components/DesignBoxHead";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { RootState } from "@/redux/store";
import { changeStyle } from "@/redux/features/BlockData/blockDataSlice";
import ProductDesign from "./ProductDesign";
import ProductList from "./ProductList";

export default function ProductDetail() {
  const dispatch = useAppDispatch();
  const selectedBlockId = useAppSelector((state: RootState) => state.blockData.present.selectedBlockId);
  const selectedBlockStyle = useAppSelector((state: RootState) =>
    state.blockData.present.blocks.find(
      (block) => block.id === state.blockData.present.selectedBlockId
    )
  )?.style;

  const handleType = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string
  ) => {
    if (newAlignment !== null) {
      dispatch(changeStyle({ id: selectedBlockId, style: { ...selectedBlockStyle, type: newAlignment } }));
    }
  };

  return (
    <div className={styles.designBox}>
      <DesignBoxHead
        title="상품 상세"
        icon={<Image src={iconQna} alt="iconQna" />}
      />

      <Stack direction="row" sx={{ padding: "16px 20px 0" }}>
        <Stack direction="column" width="100%">
          <ToggleButtonGroup
            value={
              selectedBlockStyle?.type.includes("List")
                ? "List"
                : "Design"
            }
            exclusive
            onChange={handleType}
            aria-label="type"
            fullWidth
            sx={{
              padding: "6px",
              height: "46px",
              backgroundColor: "var(--color-grey-100)",
              borderRadius: "8px",
              "& .MuiButtonBase-root": {
                border: "none",
                borderRadius: "8px",
                "&:hover": {
                  color: "var(--color-grey-400)",
                  backgroundColor: "transparent !important",
                  "& img,span": {
                    filter:
                      "none",
                  },
                },
                "&.Mui-selected": {
                  backgroundColor: "white",
                  border: "none",
                  "&:hover": {
                    color: "unset !important",
                    backgroundColor: "white !important",
                  },
                  "& img,span": {
                    filter:
                      "brightness(0) saturate(100%) invert(50%) sepia(98%) saturate(5463%) hue-rotate(238deg) brightness(98%) contrast(107%);",
                  },
                },
              },
            }}
          >
            <ToggleButton value="List" aria-label="List">
              <span className="subtitle2">상품 목록</span>
            </ToggleButton>
            <ToggleButton value="Design" aria-label="Design">
              <span className="subtitle2">디자인</span>
            </ToggleButton>
          </ToggleButtonGroup>
        </Stack>
      </Stack>

      {/* FIX: toggle below annotation */}
      {/* <ProductList /> */}
      <ProductDesign/>
    </div>
  );
}
