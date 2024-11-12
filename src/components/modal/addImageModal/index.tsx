import React, { useCallback, useEffect, useState } from "react";
import styles from "./index.module.scss";

import {
  Button,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  Popover,
  Stack,
  Tab,
  TextField,
} from "@mui/material";

import iconRotate from "/public/images/icon-rotate.svg";
import iconBookmark from "/public/images/icon-bookmark.svg";
import iconBookmarkActive from "/public/images/icon-bookmark-active.svg";
import iconDelete from "/public/images/icon-delete.svg";
import iconMore from "/public/images/icon-more.svg";
import iconFlipVertical from "/public/images/icon-flip-vertical.svg";
import iconFlipHorizontal from "/public/images/icon-flip-horizontal.svg";
const sampleImage = "/public/images/sample-image-2.jpg";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import Image from "next/image";
import MyImage from "./MyImage";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import SearchImage from "./SearchImage";
import { Asset } from "@prisma/client";

export default function AddImageModal() {
  const [value, setValue] = React.useState("myImage");

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  const [showInformation, setShowInformation] = useState<boolean>(false);

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
  const [loadingImages, setLoadingImages] = React.useState(false);
  const [images, setImages] = React.useState<Asset[]>([]);

  const getImages = useCallback(async () => {
    setLoadingImages(true);
    const res = await fetch(window.location.origin + "/api/images");
    setLoadingImages(false);
    if (!res.ok) {
      throw new Error("Failed to fetch images");
    }

    const data = await res.json();
    setImages(data.images);
  }, []);
  const [selectedImage, setSelectedImage] = React.useState<Asset | null>(null);

  useEffect(() => {
    getImages();
  }, [getImages]);

  return (
    <TabContext value={value}>
      <TabList
        onChange={handleChange}
        sx={{
          borderBottom: "1px solid var(--color-grey-100)",
          minHeight: "36px",
        }}
      >
        <Tab
          label="내 이미지"
          value="myImage"
          className="h2"
          sx={{ padding: "6px 16px", minHeight: "unset" }}
        />
        <Tab
          label="이미지 검색"
          value="searchImage"
          className="h2"
          sx={{ padding: "6px 16px", minHeight: "unset" }}
        />
        <Tab
          label="GIF 검색"
          value="searchGif"
          className="h2"
          sx={{ padding: "6px 16px", minHeight: "unset" }}
        />
      </TabList>

      <Stack
        direction="column"
        gap="24px"
        sx={{ paddingBottom: "32px", flex: 1, marginTop: "24px" }}
      >
        <Stack direction="row" gap="32px">
          <div className={styles.left}>
            <ul className={styles.navigation}>
              <li>
                <button>
                  <div>
                    <Image src={iconBookmarkActive} alt="iconBookmarkActive" />
                    <span className="subtitle2">즐겨찾기</span>
                  </div>
                  <KeyboardArrowDownIcon
                    sx={{
                      color: "var(--color-grey-400)",
                      fontSize: 18,
                      transform: "rotate(-90deg)",
                    }}
                  />
                </button>
              </li>
            </ul>
            <Divider sx={{ borderColor: "var(--color-grey-100)" }} />
            <div className={styles.bin}>
              <button>
                <div>
                  <Image src={iconDelete} alt="iconDelete" />
                  <span className="subtitle2">휴지통</span>
                </div>
              </button>
            </div>
          </div>
          <Divider orientation="vertical" flexItem />

          <Stack
            direction="row"
            gap="32px"
            sx={{
              maxHeight: 728,
              overflowY: "auto",
              paddingLeft: "1px",
            }}
          >
            <TabPanel value="myImage" sx={{ padding: 0, flex: 1 }}>
              <MyImage
                selectedImage={selectedImage}
                setSelectedImage={setSelectedImage}
                images={images}
                getImages={getImages}
                loading={loadingImages}
                showInformation={showInformation}
                setShowInformation={setShowInformation}
              />
            </TabPanel>
            <TabPanel value="searchImage" sx={{ padding: 0, flex: 1 }}>
              <SearchImage
                showInformation={showInformation}
                setShowInformation={setShowInformation}
              />
            </TabPanel>
            <TabPanel value="searchGif" sx={{ padding: 0, flex: 1 }}>
              <SearchImage
                showInformation={showInformation}
                setShowInformation={setShowInformation}
              />
            </TabPanel>
          </Stack>

          <div
            className={
              showInformation
                ? `${styles.rightWrap} ${styles.showInformation}`
                : styles.rightWrap
            }
          >
            <Divider orientation="vertical" flexItem />
            {value === "myImage" ? (
              <div className={styles.right}>
                <div className={styles.head}>
                  <div>
                    <Image
                      src={iconBookmark}
                      alt="iconBookmark"
                      width={20}
                      height={20}
                    />
                    {/* TODO: [modify filename]: edit condition */}
                    {true ? (
                      <span className="subtitle2">filename.jpg</span>
                    ) : (
                      <TextField
                        variant="outlined"
                        color="secondary"
                        defaultValue={"filename.jpg"}
                      />
                    )}
                  </div>
                  <IconButton
                    sx={{
                      borderRadius: "16px",
                      width: "28px",
                      height: "28px",
                      backgroundColor: "var(--color-grey-50)",
                    }}
                    onClick={handleThumbnailMoreClick}
                  >
                    <Image
                      src={iconMore}
                      alt="iconMore"
                      width={4}
                      height={14}
                      style={{
                        transform: "rotate(-90deg)",
                      }}
                    />
                  </IconButton>
                </div>
                <div className={styles.body}>
                  <div className={styles.previewThumbnail}>
                    <img src={selectedImage?.url??sampleImage} alt="sampleImage" />
                  </div>

                  {true ? (
                    // TODO: for default
                    <div className={styles.editImageButton}>
                      <IconButton
                        sx={{ border: "1px solid var(--color-grey-200)" }}
                      >
                        <Image src={iconFlipVertical} alt="iconFlipVertical" />
                      </IconButton>
                      <IconButton
                        sx={{ border: "1px solid var(--color-grey-200)" }}
                      >
                        <Image
                          src={iconFlipHorizontal}
                          alt="iconFlipHorizontal"
                        />
                      </IconButton>
                      <IconButton
                        sx={{ border: "1px solid var(--color-grey-200)" }}
                      >
                        <Image src={iconRotate} alt="iconRotate" />
                      </IconButton>
                    </div>
                  ) : (
                    // TODO: for bin

                    <Button
                      variant="outlined"
                      color="info"
                      sx={{
                        width: "100%",
                        height: "34px",
                        padding: "0 16px",
                        marginBottom: "16px",
                      }}
                      className="subtitle1"
                      startIcon={
                        <Image
                          src={iconRotate}
                          alt="iconRotate"
                          style={{ transform: "scaleX(-1)" }}
                        />
                      }
                    >
                      복원하기
                    </Button>
                  )}
                  <ul className={styles.information}>
                    <li>
                      <div className="caption">유형</div>
                      <div className="unit-eng">jpg</div>
                    </li>
                    <li>
                      <div className="caption">크기</div>
                      <div className="unit-eng">000KB</div>
                    </li>
                    <li>
                      <div className="caption">해상도</div>
                      <div className="unit-eng">000*000px</div>
                    </li>
                    <li>
                      <div className="caption">업로드</div>
                      <div className="unit-eng">yyyy.mm.dd</div>
                    </li>
                  </ul>
                </div>
              </div>
            ) : (
              // search image, gif
              <div className={styles.right}>
                <div className={styles.head}>
                  <div>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={selectedImage ? (selectedImage?.url??''): sampleImage}
                      alt="iconBookmark"
                      width={20}
                      height={20}
                    />
                  </div>
                  <IconButton
                    sx={{
                      borderRadius: "16px",
                      width: "28px",
                      height: "28px",
                      backgroundColor: "var(--color-grey-50)",
                    }}
                    onClick={handleThumbnailMoreClick}
                  >
                    <Image
                      src={iconMore}
                      alt="iconMore"
                      width={4}
                      height={14}
                      style={{
                        transform: "rotate(-90deg)",
                      }}
                    />
                  </IconButton>
                </div>
                <div className={styles.body}>
                  <div className={styles.previewThumbnail}>
                    <img src={sampleImage} alt="sampleImage" />
                  </div>

                  <Button
                    variant="outlined"
                    color="info"
                    sx={{
                      width: "100%",
                      height: "34px",
                      padding: "0 16px",
                      marginBottom: "16px",
                    }}
                    className="subtitle1"
                  >
                    내 이미지에 추가하기
                  </Button>
                  <ul className={styles.information}>
                    <li>
                      <div className="caption">제공</div>
                      <div className="unit-eng">
                        <a
                          href="#"
                          style={{ color: "var(--color-information)" }}
                        >
                          Service API Name
                        </a>
                      </div>
                    </li>
                    <li>
                      <div className="caption"></div>
                      <div className="unit-eng">producer_id</div>
                    </li>
                  </ul>
                </div>
              </div>
            )}
          </div>
        </Stack>

        <ThumbnailPopover {...thumbnailPopoverProps} />
      </Stack>
    </TabContext>
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
