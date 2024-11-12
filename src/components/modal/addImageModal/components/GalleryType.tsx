import React, { Dispatch, SetStateAction, useCallback, useEffect, useState } from "react";
import styles from "../index.module.scss";

import { Button, ToggleButton, ToggleButtonGroup } from "@mui/material";

import iconBookmark from "/public/images/icon-bookmark.svg";
import iconBookmarkActive from "/public/images/icon-bookmark-active.svg";
import sampleImage from "/public/images/sample-image-2.jpg";
import Image from "next/image";
import MoreIcon from "./MoreIcon";
import { Asset } from "@prisma/client";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { RootState } from "@/redux/store";
import { changeStyle } from "@/redux/features/BlockData/blockDataSlice";
import { hideModal } from "@/redux/features/Modal/modalSlice";

const toggleButtonStyle = {
  borderWidth: "2px",
  borderLeftWidth: "2px !important",
  "&.Mui-selected img": {
    filter: "none",
  },
  "&:hover img": {
    filter: "none",
  },
  "&.Mui-selected:hover img": {
    filter: "none",
  },
};

export default function Gallery({
  images,
  setSelectedImage,
  showInformation,
  setShowInformation,
  handleThumbnailMoreClick,
  searchImage = false,
}: {
  images?: Asset[];
  showInformation: boolean;
  setSelectedImage?: Dispatch<SetStateAction<Asset | null>>;
  setShowInformation: Dispatch<SetStateAction<boolean>>;
  handleThumbnailMoreClick: (
    e: React.MouseEvent<HTMLButtonElement>,
    image: Asset
  ) => void;
  searchImage?: boolean;
}) {
  const [select, setSelect] = useState("");
  // const [images, setImages] = useState<Asset[]>([]);

  const dispatch = useAppDispatch();
  const { fieldToSet, forBlockId, isWrapper } = useAppSelector((state: RootState) => state.modal);
  const selectedBlockId = useAppSelector((state: RootState) => state.blockData.present.selectedBlockId);

  const selectedBlockStyle = useAppSelector((state: RootState) =>
    state.blockData.present.blocks.find(
      (block) => block.id === (forBlockId??selectedBlockId)
    )
  )?.[isWrapper?'wrapperStyle':'style'];
  const selectedBlockType = useAppSelector((state: RootState) =>
    state.blockData.present.blocks.find(
      (block) => block.id === (forBlockId??selectedBlockId)
    )
  )?.type;

 

  useEffect(() => {
    // getImages();
    if (select === "" || select === null) {
      setShowInformation(false);
    } else {
      setShowInformation(true);
    }
  }, [select]);

  const handleSelect = (
    event: React.MouseEvent<HTMLElement>,
    newValue: string
  ) => {
    console.log("newValue");
    console.log(newValue);
    setSelectedImage&&setSelectedImage(images?.find((image) => image.id === newValue) ?? null);
    setSelect(newValue);
  };

  const handleApply = (e: React.MouseEvent<HTMLButtonElement>, id: string) => {
    e.stopPropagation();

    const styleName = isWrapper ? "wrapperStyle" : "style";

    if(forBlockId){
      dispatch(
        changeStyle({
          id: forBlockId,
          [styleName]: {
            ...selectedBlockStyle,
            [fieldToSet??'url']: images?.find((image) => image.id === id)?.url,
          },
        })
      )
    } else if(selectedBlockType === "image"){
      dispatch(
        changeStyle({
          id: selectedBlockId,
          [styleName]: {
            ...selectedBlockStyle,
            url: images?.find((image) => image.id === id)?.url,
          },
        })
      );
    }else if(selectedBlockType === "gallery"){
      dispatch(
        changeStyle({
          id: selectedBlockId,
          [styleName]: {
            ...selectedBlockStyle,
            images: [
              ...selectedBlockStyle?.images??[],
              ...(images?.length ? [images?.find((image) => image.id === id)] : []),
            ],
          },
        })
      );
    }

    dispatch(hideModal());

    // close modal
    // closeModal();
  }

  return (
    <ToggleButtonGroup
      value={select}
      exclusive
      onChange={handleSelect}
      aria-label="text alignment"
      className={styles.gallery}
    >
      {/* TODO: for bookmarked item*/}
      {images?.map((image) => (
        <div key={image.id} className={styles.galleryItem}>
          <ToggleButton
            value={image.id}
            aria-label={image.id}
            className={
              select === image.id
                ? `${styles.selected} ${styles.galleryItemButton}`
                : `${styles.galleryItemButton}`
            }
            style={{ backgroundColor: "#F4EEED" }}
            sx={toggleButtonStyle}
          >
            {/* TODO: toggle bookmark data */}
            {true && (
              <Image
                className={styles.bookmark}
                src={iconBookmarkActive}
                alt="iconBookmarkActive"
                width={20}
                height={20}
              />
            )}
            <div className={styles.hoverWrap}>
              <div className={styles.head}>
                <Image
                  src={iconBookmark}
                  alt="iconBookmark"
                  width={20}
                  height={20}
                />
                <MoreIcon type="dark" handleClick={(e)=>handleThumbnailMoreClick(e, image)} />
              </div>

              <Button variant="contained" onClick={e=>handleApply(e, image.id)} sx={{ maxHeight: "34px" }}>
                적용하기
              </Button>
            </div>
            <Image
              src={image.url!}
              width={68}
              height={68}
              alt="sampleImage"
              className={styles.thumbnail}
            />
          </ToggleButton>
          {!searchImage && <p className="caption">{image.name}</p>}
        </div>
      ))}

      {/* TODO: for default item
      <div className={styles.galleryItem}>
        <ToggleButton
          value="image-2"
          aria-label="image-2"
          className={
            select === "image-2"
              ? `${styles.selected} ${styles.galleryItemButton}`
              : `${styles.galleryItemButton}`
          }
          style={{ backgroundColor: "#F4EEED" }}
          sx={toggleButtonStyle}
        >
          
          {false && (
            <Image
              className={styles.bookmark}
              src={iconBookmarkActive}
              alt="iconBookmarkActive"
              width={20}
              height={20}
            />
          )}
          <div className={styles.hoverWrap}>
            <div className={styles.head}>
              <Image
                src={iconBookmark}
                alt="iconBookmark"
                width={20}
                height={20}
              />
              <MoreIcon type="dark" handleClick={handleThumbnailMoreClick} />
            </div>

            <Button variant="contained" sx={{ maxHeight: "34px" }}>
              적용하기
            </Button>
          </div>
          <Image
            src={sampleImage}
            alt="sampleImage"
            className={styles.thumbnail}
          />
        </ToggleButton>
        {!searchImage && <p className="caption">filename.jpg</p>}
      </div>
\
      <div className={`${styles.galleryItem} ${styles.bin}`}>
        <ToggleButton
          value="image-2"
          aria-label="image-2"
          className={
            select === "image-2"
              ? `${styles.selected} ${styles.galleryItemButton}`
              : `${styles.galleryItemButton}`
          }
          style={{ backgroundColor: "#F4EEED" }}
          sx={toggleButtonStyle}
        >
          <div className={styles.hoverWrap}>
            <div className={styles.head}>
              <MoreIcon type="dark" handleClick={handleThumbnailMoreClick} />
            </div>

            <Button
              variant="contained"
              color="error"
              sx={{ maxHeight: "34px" }}
            >
              영구 삭제
            </Button>
          </div>
          <Image
            src={sampleImage}
            alt="sampleImage"
            className={styles.thumbnail}
          />
        </ToggleButton>
        {!searchImage && <p className="caption">bin.jpg 321</p>}
      </div> */}
    </ToggleButtonGroup>
  );
}
