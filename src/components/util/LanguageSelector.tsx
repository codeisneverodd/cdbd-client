import { Box, MenuItem, Select, Stack } from "@mui/material";
import React from "react";
import iconGlobe from "/public/images/icon-globe.svg";
import Image from "next/image";

type Props = {};

export default function LanguageSelector({}: Props) {
  return null;
  return (
    <Stack direction="row" justifyContent="flex-end" width="100%">
      <Select
        color="secondary"
        startAdornment={
          <Image
            src={iconGlobe}
            alt="iconGlobe"
            width={16}
            height={16}
            style={{ marginRight: "8px" }}
          />
        }
        size="small"
        value={"en"}
        // onChange={() => {}}
        inputProps={{
          name: "language",
          id: "language-selector",
        }}
        sx={{
          backgroundColor: "#fff",
          "& fieldset": {
            border: "1px solid var(--color-grey-200) !important",
          },
        }}
      >
        <MenuItem value="en">
          <Stack direction="row" gap="8px" alignItems="center">
            English
          </Stack>
        </MenuItem>
        <MenuItem value="ko">
          <Stack direction="row" gap="8px" alignItems="center">
            한국어
          </Stack>
        </MenuItem>
      </Select>
    </Stack>
  );
}
