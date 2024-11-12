import React, { Dispatch, useCallback, useEffect } from "react";
import styles from "./index.module.scss";

import {
  Button,
  CircularProgress,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  Popover,
  Stack,
} from "@mui/material";

import iconCheck from "/public/images/icon-check.svg";
import iconInfo from "/public/images/icon-info.svg";
import iconArrowBack from "/public/images/arrow-back.svg";
import iconUpload from "/public/images/icon-upload.svg";
import iconBookmarkActive from "/public/images/icon-bookmark-active.svg";
import iconDelete from "/public/images/icon-delete.svg";
import iconGridline from "/public/images/icon-grid-line.svg";
import iconSorting from "/public/images/icon-sorting.svg";
import Image from "next/image";
import GalleryType from "./components/GalleryType";
import { Asset } from "@prisma/client";
import { Toast } from "@/components/Toast";


type MyImageProps = {
  selectedImage: Asset | null;
  setSelectedImage: Dispatch<React.SetStateAction<Asset | null>>;
  showInformation: boolean;
  setShowInformation: Dispatch<React.SetStateAction<boolean>>;
  images: Asset[];
  getImages: () => void;
  loading: boolean;
};
export default function MyImage({
  selectedImage,
  setSelectedImage,
  showInformation,
  setShowInformation,
  images,
  getImages,
  loading: loadingImages
}: MyImageProps) {
  // const [loadingImages, setLoadingImages] = React.useState(false);
  // control popover
  const [thumbnailAnchorEl, setThumbnailAnchorEl] =
    React.useState<HTMLButtonElement | null>(null);
  // const [selectedImage, setSelectedImage] = React.useState<Asset | null>(null);
  const [viewTypeAnchorEl, setViewTypeAnchorEl] =
    React.useState<HTMLButtonElement | null>(null);
  const [sortingAnchorEl, setSortingAnchorEl] =
    React.useState<HTMLButtonElement | null>(null);

  // const [file, setFile] = React.useState<File | null>(null)
  const [showToast, setShowToast] = React.useState({ show: false, message: "", type: "SUCCESS" as "SUCCESS" | "ERROR" | "WARNING" });

  const [uploading, setUploading] = React.useState(false);
  // const [images, setImages] = React.useState<Asset[]>([]);

  const handleThumbnailMoreClick = (
    e: React.MouseEvent<HTMLButtonElement>,
    image: Asset
  ) => {
    e.stopPropagation();
    // alert("more");
    setThumbnailAnchorEl(e.currentTarget);

  };

  const handleThumbnailPopoverClose = () => {
    setThumbnailAnchorEl(null);
  };

  const handleViewTypeClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    setViewTypeAnchorEl(event.currentTarget);
  };

  const handleViewTypePopoverClose = () => {
    setViewTypeAnchorEl(null);
  };

  const handleSortingClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    setSortingAnchorEl(event.currentTarget);
  };

  const handleSortingPopoverClose = () => {
    setSortingAnchorEl(null);
  };

  const thumbnailOpen = Boolean(thumbnailAnchorEl);
  const viewTypeOpen = Boolean(viewTypeAnchorEl);
  const sortingOpen = Boolean(sortingAnchorEl);

  const thumbnailPopoverid = thumbnailOpen ? "thumbnail-popover" : undefined;
  const viewTypePopoverid = viewTypeOpen ? "viewType-popover" : undefined;
  const sortingPopoverid = sortingOpen ? "sorting-popover" : undefined;

  const thumbnailPopoverProps = {
    id: thumbnailPopoverid,
    open: thumbnailOpen,
    anchorEl: thumbnailAnchorEl,
    handleClose: handleThumbnailPopoverClose,
  };

  const viewTypePopoverProps = {
    id: viewTypePopoverid,
    open: viewTypeOpen,
    anchorEl: viewTypeAnchorEl,
    handleClose: handleViewTypePopoverClose,
  };

  const sortingPopoverProps = {
    id: sortingPopoverid,
    open: sortingOpen,
    anchorEl: sortingAnchorEl,
    handleClose: handleSortingPopoverClose,
  };

  const handleSubmit = async (file: File) => {
    // e.preventDefault()

    if (!file) {
      alert('Please select a file to upload.')
      return
    }

    console.log("file ===>>>", file)

    try {


      setUploading(true)

      const response = await fetch(
        window.location.origin + '/api/upload',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ filename: file.name, contentType: file.type }),
        }
      )

      if (response.ok) {
        const { url, fields } = await response.json()

        const formData = new FormData()
        Object.entries(fields).forEach(([key, value]) => {
          formData.append(key, value as string)
        })
        formData.append('file', file)

        const uploadResponse = await fetch(url, {
          method: 'POST',
          body: formData,
        })

        if (uploadResponse.ok) {
          getImages();
          setShowToast({ show: true, message: "Upload successful!", type: "SUCCESS" });
        } else {
          console.error('S3 Upload Error:', uploadResponse)
          alert('Upload failed.')
        }
      } else {
        alert('Failed to get pre-signed URL.')
      }
    } catch (error) {
      console.error(error)
      alert('Upload failed.')
    }

    setUploading(false)
  }
   
  // const getImages = useCallback(async () => {
  //   setLoadingImages(true);
  //   const res = await fetch(window.location.origin + "/api/images");
  //   setLoadingImages(false);
  //   if (!res.ok) {
  //     throw new Error("Failed to fetch images");
  //   }

  //   const data = await res.json();
  //   setImages(data.images);
  // }, []);

  // useEffect(() => {
  //   getImages();
  // }, [getImages]);

  return (<>
    <div
      className={
        showInformation
          ? `${styles.center} ${styles.showInformation} flex flex-col`
          : styles.center + " flex flex-col"
      }
    >
      <div className={styles.head}>
        {
          // TODO: [subtitle]: for default
          true && <p className="subtitle1">내 이미지 전체</p>
        }

        {
          // TODO: [subtitle]: for bookmark
          false && (
            <p className="subtitle1">
              <IconButton sx={{ width: "34px", height: "34px" }}>
                <Image
                  src={iconArrowBack}
                  alt="iconArrowBack"
                  width={24}
                  height={24}
                />
              </IconButton>
              <Image
                className={styles.bookmark}
                src={iconBookmarkActive}
                alt="iconBookmarkActive"
                width={20}
                height={20}
                style={{ filter: "grayscale(1)", marginTop: "2px" }}
              />
              즐겨찾기
            </p>
          )
        }

        {
          // TODO: [subtitle]: for bin
          false && (
            <p className="subtitle1">
              <IconButton sx={{ width: "34px", height: "34px" }}>
                <Image
                  src={iconArrowBack}
                  alt="iconArrowBack"
                  width={24}
                  height={24}
                />
              </IconButton>
              <Image
                className={styles.bookmark}
                src={iconBookmarkActive}
                alt="iconBookmarkActive"
                width={20}
                height={20}
                style={{ filter: "grayscale(1)", marginTop: "2px" }}
              />
              휴지통
            </p>
          )
        }

        <Stack direction="row" gap="8px" width="min-content">
          <IconButton
            sx={{ width: "34px",minWidth: "34px", height: "34px", maxHeight: "34px" }}
            onClick={handleViewTypeClick}
          >
            <Image
              src={iconGridline}
              alt="iconGridline"
              width={24}
              height={24}
            />
          </IconButton>
          <IconButton
            sx={{ width: "34px",minWidth: "34px", height: "34px", maxHeight: "34px" }}
            onClick={handleSortingClick}
          >
            <Image src={iconSorting} alt="iconSorting" width={24} height={24} />
          </IconButton>
          {
            // TODO: [button]: for bin
            false && (
              <Button
                variant="outlined"
                color="info"
                sx={{ width: "130px", height: "34px", padding: "0 16px" }}
                className="subtitle1"
                startIcon={<Image src={iconDelete} alt="iconDelete" />}
              >
                휴지통 비우기
              </Button>
            )
          }
        </Stack>
      </div>

      {
        // TODO: [notification] for bin
        false && (
          <div className={styles.notification}>
            <Image
              className={styles.bookmark}
              src={iconInfo}
              alt="iconInfo"
              width={16}
              height={16}
              style={{ filter: "grayscale(1)" }}
            />
            <p className="subtitle2">
              휴지통으로 이동된 날짜로부터 30일이 지나면 자동으로 영구
              삭제되며, 기한 내에 언제든지 개별 영구 삭제 또는 비우기가
              가능합니다.
            </p>
          </div>
        )
      }
      <form className={styles.upload} //onSubmit={}
      >
        <input
          disabled={uploading}
          id="file"
          type="file"
          onChange={(e) => {
            const files = e.target.files
            if (files?.length) {
              // setFile(files[0])
              handleSubmit(files[0])
            }
          }}
          accept="image/png, image/jpeg"
          style={{ width: "100%", height: "100%", opacity: 0, cursor: "pointer", position: "absolute", top: 0, left: 0 }}
        />
        <p className="subtitle2">
          {uploading ? "업로드중..." : "업로드하려면 이 곳을 클릭하거나 파일을 끌어오세요"}
        </p>
        {/* <Button type="submit" disabled={uploading}> */}
          <Image src={iconUpload} alt="iconUpload" width={22} height={22} className="m-2" />
        {/* </Button> */}
      </form>

      {/* TODO: Toggle Gallery or List type */}
      {!loadingImages?<GalleryType
        images={images}
        setSelectedImage={setSelectedImage}
        showInformation={showInformation}
        setShowInformation={setShowInformation}
        handleThumbnailMoreClick={handleThumbnailMoreClick}
      />: <div className="w-full flex-1 flex justify-center items-center"><CircularProgress /></div>}
      {/* <ListType
            showInformation={showInformation}
            setShowInformation={setShowInformation}
            handleThumbnailMoreClick={handleThumbnailMoreClick}
          /> */}

      <ThumbnailPopover {...thumbnailPopoverProps} />
      <ViewTypePopover {...viewTypePopoverProps} />
      <SortingPopover {...sortingPopoverProps} />
    </div>

    {showToast.show && (
        <Toast
          message={showToast.message}
          open={showToast.show}
          setOpen={() =>
            setShowToast({ show: false, message: "", type: "SUCCESS" })
          }
          type={showToast.type}
        />
      )}
    </>
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

const ViewTypePopover = ({
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
          vertical: "bottom",
          horizontal: "left",
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
            <ListItemButton sx={listButtonStyle}>
              <Image
                src={iconCheck}
                alt="iconCheck"
                width={10}
                height={10}
                style={{
                  marginRight: "12px",
                }}
              />
              <strong>격자로 보기</strong>
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton sx={listButtonStyle}>목록으로 보기</ListItemButton>
          </ListItem>
        </List>
      </Popover>
    );
  };
  
  const SortingPopover = ({
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
          vertical: "bottom",
          horizontal: "left",
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
            <ListItemButton sx={listButtonStyle}>
              <Image
                src={iconCheck}
                alt="iconCheck"
                width={10}
                height={10}
                style={{
                  marginRight: "12px",
                }}
              />
              <strong>추가일</strong>
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton sx={listButtonStyle}>최근 사용일</ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton sx={listButtonStyle}>이름</ListItemButton>
          </ListItem>
        </List>
      </Popover>
    );
  };
  