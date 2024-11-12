import styles from "../styles.module.scss";

import React from 'react'
import { ButtonSecondary } from '@/components/buttons/Buttons'
import InfoText from '@/components/text/InfoText'
import { Stack, Divider } from '@mui/material'
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

export default function SectionItemSpecialCharacter() {
  return (
    <Stack direction="row" overflow="auto">
    <div className={styles.sectionItemTitle}>특수문자</div>
    <Stack direction="column" width="100%">
      <Stack direction="row" gap="8px" width="100%">
        <ButtonSecondary
          className="p1"
          style={{
            width: "100%",
            textAlign: "left",
            justifyContent: "space-between",
          }}
          endIcon={
            <KeyboardArrowDownIcon sx={{ width: 18, height: 18 }} />
          }
        >
          <span style={{ minWidth: "57px", lineHeight: "34px" }}>
            🙂 이모지
          </span>
        </ButtonSecondary>
        <Divider orientation="vertical" sx={{ height: "34px" }} />
        <ButtonSecondary
          className="p1"
          style={{
            width: "100%",
            textAlign: "left",
            justifyContent: "space-between",
          }}
          endIcon={
            <KeyboardArrowDownIcon sx={{ width: 18, height: 18 }} />
          }
        >
          <span style={{ minWidth: "52px", lineHeight: "34px" }}>
            ★ 기호
          </span>
        </ButtonSecondary>
      </Stack>
      <InfoText>현재 텍스트 커서가 있는 곳에 입력돼요.</InfoText>
    </Stack>
  </Stack>
  )
}
