import { Chip } from "@mui/material";
import React from "react";


const commonStyle = {
    height: 20,
    padding: "0 6px",
    fontSize: "12px !important",
    borderRadius: "4px",
    "& .MuiChip-label": {
        padding: 0
    }
}
export default function Chips({ variant }: {variant: "profile" | "invite" | "news" | "catalog" | "business"}) {
  switch (variant) {
    case "profile":
      return (
        <Chip
          label="프로필"
          sx={{
            ...commonStyle,
            color: "#1C6FDB",
            backgroundColor: "#CCE3FF",
          }}
        />
      );
    case "invite":
      return (
        <Chip
          label="초청장"
          sx={{
            ...commonStyle,
            color: "#D358E7",
            backgroundColor: "#F5DCF1",
          }}
        />
      );
    case "news":
      return (
        <Chip
          label="소식지"
          sx={{
            ...commonStyle,
            color: "#FF8A00",
            backgroundColor: "#FFE7CC",
          }}
        />
      );
    case "catalog":
      return (
        <Chip
          label="카탈로그"
          sx={{
            ...commonStyle,
            color: "#876DFF",
            backgroundColor: "#E9E4FF",
          }}
        />
      );
    case "business":
      return (
        <Chip
          label="비지니스 명함"
          sx={{
            ...commonStyle,
            color: "#23C584",
            backgroundColor: "#CCECDF",
          }}
        />
      );

    default:
      return <Chip />;
  }
}
