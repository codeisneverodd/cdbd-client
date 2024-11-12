import styles from "../styles.module.scss";

import React from "react";
import {
  Stack,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import Image from "next/image";

import iconQna from "/public/images/block-icon-primary-QnA.svg";

import DesignBoxHead from "../components/DesignBoxHead";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { RootState } from "@/redux/store";
import { changeStyle } from "@/redux/features/BlockData/blockDataSlice";
import QnaDesign from "./QnaDesign";
import QnaQuestion from "./QnaQuestion";

export default function Qna({title = "질문과 답변"}: {title?: string}) {
  const [qnAEditType, setQnaEditType] = React.useState<'design' | 'question'>('question');

  const handleType = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string
  ) => {
    if (newAlignment !== null) {
      setQnaEditType(newAlignment as 'design' | 'question');
      // dispatch(changeStyle({ id: selectedBlockId, style: { ...selectedBlockStyle, type: newAlignment } }));
    }
  };

  return (
    <div className={styles.designBox}>
      <DesignBoxHead
        title={title}
        icon={<Image src={iconQna} alt="iconQna" />}
      />

      <Stack direction="row" sx={{ padding: "16px 20px 0" }}>
        <Stack direction="column" width="100%">
          <ToggleButtonGroup
            value={qnAEditType}
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
            <ToggleButton value="question" aria-label="Question">
              <span className="subtitle2">질문 목록</span>
            </ToggleButton>
            <ToggleButton value="design" aria-label="Design">
              <span className="subtitle2">디자인</span>
            </ToggleButton>
          </ToggleButtonGroup>
        </Stack>
      </Stack>

      {qnAEditType==='question'?<QnaQuestion />:<QnaDesign/>}

    </div>
  );
}
