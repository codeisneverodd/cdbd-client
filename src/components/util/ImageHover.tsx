import { IconButton, Stack } from "@mui/material";
import React from "react";
import Image from "next/image";
import iconDelete from "/public/images/icon-delete-white.svg";
import iconChange from "/public/images/icon-change-white.svg";
import { useSortable } from "@dnd-kit/sortable";
export default function ImageHover({
  isActive,
  handleChange,
  handleRemove,
}: {
  isActive?: boolean;
  handleChange?: any;
  handleRemove?: any;
}) {

  return (

      <Stack
        direction="row"
        justifyContent="center"
        alignItems="center"
        gap="8px"
        sx={{
          opacity: 0,
          position: "absolute",
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(255,255,255,0.2)",
          transition: "opacity 0.3s",
          borderRadius: "8px",
          "&:hover": {
            opacity: isActive ? 0 : 1,
          },
        }}
      >
        <IconButton
          sx={{
            maxWidth:"24px",
            maxHeight:"24px",
            backgroundColor: "var(--color-grey-900)",
            "&:hover": {
              backgroundColor: "var(--color-grey-800) !important",
            },
          }}
          onClick={handleChange}
        >
          <Image src={iconChange} alt="iconChange" width={14} height={14}/>
        </IconButton>
        <IconButton
          sx={{
            maxWidth:"24px",
            maxHeight:"24px",
            backgroundColor: "var(--color-danger)",
            "&:hover": {
              backgroundColor: "var(--color-danger) !important",
            },
          }}
          onClick={handleRemove}
        >
          <Image src={iconDelete} alt="iconDelete" width={14} height={14}/>
        </IconButton>
    </Stack>
    

  );
}
