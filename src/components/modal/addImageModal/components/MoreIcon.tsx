import { IconButton } from '@mui/material';
import Image from 'next/image';
import React from 'react'
import iconMore from "/public/images/icon-more.svg";

export default function MoreIcon({
  type="light",
    handleClick,
  }: {
    type?: "light" | "dark";
    handleClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  }) {
    return (
      <IconButton
        onClick={handleClick}
        sx={{
          minWidth: "28px",
          minHeight: "28px",
          maxWidth: "28px",
          maxHeight: "28px",
          backgroundColor: type === "light" ? "var(--color-grey-50)" :"var(--color-grey-900)",
          borderRadius: "24px !important",
          "&.MuiIconButton-root:hover": {
            backgroundColor:  type === "light" ? "var(--color-grey-50)" :"var(--color-grey-900)",
          },
        }}
      >
        <Image
          src={iconMore}
          alt="iconMore"
          width={4}
          height={14}
          style={{
            transform: "rotate(-90deg)",
            filter: type === "light" ? "none" :
              "invert(99%) sepia(6%) saturate(295%) hue-rotate(203deg) brightness(117%) contrast(100%)",
          }}
        />
      </IconButton>
    );
  }
