import React, { Dispatch } from "react";
import styles from "./index.module.scss";

import {
  List,
  ListItem,
  ListItemButton,
  Popover,
  TextField,
} from "@mui/material";

import iconSearch from "/public/images/icon-search.svg";
import Image from "next/image";
import GalleryType from "./components/GalleryType";

type MyImageProps = {
  showInformation: boolean;
  setShowInformation: Dispatch<React.SetStateAction<boolean>>;
};
export default function SearchImage({
  showInformation,
  setShowInformation,
}: MyImageProps) {
  // control popover
  const [thumbnailAnchorEl, setThumbnailAnchorEl] =
    React.useState<HTMLButtonElement | null>(null);

  const handleThumbnailMoreClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.stopPropagation();
    setThumbnailAnchorEl(event.currentTarget);
  };

  const handleThumbnailPopoverClose = () => {
    setThumbnailAnchorEl(null);
  };

  const thumbnailOpen = Boolean(thumbnailAnchorEl);

  const thumbnailPopoverid = thumbnailOpen ? "thumbnail-popover" : undefined;

  const thumbnailPopoverProps = {
    id: thumbnailPopoverid,
    open: thumbnailOpen,
    anchorEl: thumbnailAnchorEl,
    handleClose: handleThumbnailPopoverClose,
  };

  return (
    <div
      className={
        showInformation
          ? `${styles.center} ${styles.showInformation}`
          : styles.center
      }
    >
      <div className={styles.head}>
        <TextField
          variant="outlined"
          color="info"
          fullWidth
          placeholder="검색어를 입력하세요"
          InputProps={{
            startAdornment: (
              <Image
                src={iconSearch}
                alt="iconSearch"
                width={16}
                height={16}
                style={{
                  marginRight: "8px",
                }}
              />
            ),
          }}
        />
      </div>

      {/* TODO: Toggle Gallery or List type */}
      <GalleryType
        searchImage
        showInformation={showInformation}
        setShowInformation={setShowInformation}
        handleThumbnailMoreClick={handleThumbnailMoreClick}
      />

      <ThumbnailPopover {...thumbnailPopoverProps} />
    </div>
  );
}
// popover
type PopoverProps = {
  id: string | undefined;
  anchorEl: HTMLButtonElement | null;
  handleClose: () => void;
  open: boolean;
};

const listButtonStyle = {
  padding: "8px 12px",
  color: "var(--color-grey-800)",
  "&:hover": {
    backgroundColor: "var(--color-success-light)",
  },
};

const ThumbnailPopover = ({
  id,
  anchorEl,
  handleClose,
  open,
}: PopoverProps) => {
  return (
    <Popover
      id={id}
      open={open}
      anchorEl={anchorEl}
      onClose={handleClose}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "left",
      }}
      sx={{
        "& .MuiPaper-root": {
          boxShadow: "0 2px 2px rgba(0,0,0,.2)",
        },
      }}
    >
      <List
        sx={{
          width: 140,
          backgroundColor: "var(--color-success-pale)",
        }}
      >
        <ListItem disablePadding>
          <ListItemButton sx={listButtonStyle}>이름 변경</ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton sx={listButtonStyle}>복제하기</ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton sx={listButtonStyle}>다운로드</ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton sx={listButtonStyle}>삭제하기</ListItemButton>
        </ListItem>
      </List>
    </Popover>
  );
};
