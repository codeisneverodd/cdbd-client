import React from "react";
import Image from "next/image";
import sampleImage from "/public/images/sample-image.jpg";
import sampleImage2 from "/public/images/sample-image-2.jpg";
import { ImageList, ImageListItem } from "@mui/material";
import ImageHover from "@/components/util/ImageHover";
// import ImageHover from "@/components/ImageHover";

export default function GalleryGridMasonry() {
  const COLUMNS = 3; // option: column

  return (
    <ImageList variant="masonry" cols={COLUMNS} gap={8}>
      <ImageListItem>
        <div style={{ position: "relative" }}>
          <ImageHover />
          <Image
            src={sampleImage2}
            alt="sampleImage2"
            style={{
              width: "100%",
              height: "auto",
              borderRadius: 8, // option: corner
            }}
          />
        </div>
      </ImageListItem>
      <ImageListItem>
        <div style={{ position: "relative" }}>
          <ImageHover />
          <Image
            src={sampleImage}
            alt="sampleImage2"
            style={{
              width: "100%",
              height: "auto",
              borderRadius: 8, // option: corner
            }}
          />
        </div>
      </ImageListItem>
      <ImageListItem>
        <div style={{ position: "relative" }}>
          <ImageHover />
          <Image
            src={sampleImage}
            alt="sampleImage2"
            style={{
              width: "100%",
              height: "auto",
              borderRadius: 8, // option: corner
            }}
          />
        </div>
      </ImageListItem>
      <ImageListItem>
        <div style={{ position: "relative" }}>
          <ImageHover />
          <Image
            src={sampleImage2}
            alt="sampleImage2"
            style={{
              width: "100%",
              height: "auto",
              borderRadius: 8, // option: corner
            }}
          />
        </div>
      </ImageListItem>
      <ImageListItem>
        <div style={{ position: "relative" }}>
          <ImageHover />
          <Image
            src={sampleImage}
            alt="sampleImage2"
            style={{
              width: "100%",
              height: "auto",
              borderRadius: 8, // option: corner
            }}
          />
        </div>
      </ImageListItem>
    </ImageList>
  );
}
