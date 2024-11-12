import styles from "../../styles.module.scss";
import React from "react";
import Image from "next/image";

import { Stack } from "@mui/material";
import iconGallery from "/public/images/block-icon-gallery.svg";
import { ButtonSecondary } from "@/components/buttons/Buttons";
import { Asset } from "@prisma/client";
import { useAppDispatch } from "@/redux/hooks";
import { showModal } from "@/redux/features/Modal/modalSlice";
import { selectBlock } from "@/redux/features/BlockData/blockDataSlice";
// import { ButtonSecondary } from "@/components/Buttons";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';

export default function DefaultGallery({ style, id }: any) {
  const dispatch = useAppDispatch();
  const handleAddImage = () => {
    dispatch(selectBlock(id));
    dispatch(showModal({ modalType: "addImage" }));
  };

  const LayoutSelector = () => {
    switch (style?.layout) {
      case "layoutList":
        return (
          <Stack
            direction={style?.direction ?? "column"}
            gap="8px"
            alignItems="center"
            justifyContent="center"
          >
            {style?.images.map((image: Asset) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                key={image.id}
                width={"100%"}
                height={"auto"}
                src={image.url ?? ""}
                alt="iconGallery"
                style={{
                  aspectRatio: style?.aspectRatio ?? "none",
                  objectFit: style?.objectFit ?? "cover",
                }}
              />
            ))}
          </Stack>
        );
      case "layoutSlide":
        return (
          <Carousel
            showThumbs={false}
            showStatus={false}
            showArrows={style.navigator ?? false}
            autoPlay={style.autoPlay ?? false}
          >
            {style?.images.map((image: Asset) => (
              <div
                key={image.id}
                className="h-full w-full flex justify-center items-center"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  width={"100%"}
                  height={"auto"}
                  src={image.url ?? ""}
                  alt="iconGallery"
                  style={{
                    aspectRatio: style?.aspectRatio ?? "none",
                    objectFit: style?.objectFit ?? "cover",
                  }}
                />
              </div>
            ))}
          </Carousel>
        );
      case "layoutGrid":
        return (
          <div className={`grid gap-2`}
            style={{    gridTemplateColumns: `repeat(${style.column}, minmax(0, 1fr))`}}
          >
            {style?.images.map((image: Asset) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                key={image.id}
                width={"100%"}
                height={"auto"}
                src={image.url ?? ""}
                alt="iconGallery"
                style={{
                  aspectRatio: style?.aspectRatio ?? "none",
                  objectFit: style?.objectFit ?? "cover",
                }}
              />
            ))}
          </div>
        );
      default:
        return (
          <Stack
            direction={style?.direction ?? "column"}
            gap="8px"
            alignItems="center"
            justifyContent="center"
          >
            {style?.images.map((image: Asset) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                key={image.id}
                width={"100%"}
                height={"auto"}
                src={image.url ?? ""}
                alt="iconGallery"
                style={{
                  aspectRatio: style?.aspectRatio ?? "none",
                  objectFit: style?.objectFit ?? "cover",
                }}
              />
            ))}
          </Stack>
        );
    }
  };

  return (
    <div className={style?.images?.length ? "" : styles.defaultArea}>
      <Stack
        direction="column"
        justifyContent="center"
        alignItems="center"
        gap="12px"
        height="100%"
      >
        {style?.images?.length > 0 ? (
          <>
            <div
              // direction={style?.direction ?? "column"}
              style={{
                padding: style?.padding ?? "0px",
                margin: style?.margin ?? "0px",
                borderRadius: style?.borderRadius ?? "0px",
                backgroundColor: style?.backgroundColor ?? "transparent",
                border: style?.border ?? "none",
                borderWidth: style?.borderWidth ?? "0px",
                borderColor: style?.borderColor ?? "transparent",
                borderStyle: style?.borderStyle ?? "solid",

              }}
              // gap="8px"
              // alignItems="center"
              // justifyContent="center"
            >
              <LayoutSelector />
            </div>
          </>
        ) : (
          <>
            <Stack
              direction="row"
              gap="8px"
              alignItems="center"
              justifyContent="center"
            >
              <Image src={iconGallery} alt="iconGallery" width={20} />
              <span className="h3">갤러리</span>
            </Stack>
            <ButtonSecondary onClick={handleAddImage}>이미지 업로드하기</ButtonSecondary>
          </>
        )}
      </Stack>
    </div>
  );
}
