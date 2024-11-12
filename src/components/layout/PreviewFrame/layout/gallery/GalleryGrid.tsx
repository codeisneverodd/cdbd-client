import styles from "../../styles.module.scss";

import React from "react";
import Image from "next/image";
import sampleImage from "/public/images/sample-image.jpg";
import sampleImage2 from "/public/images/sample-image-2.jpg";
import { IconButton, Stack } from "@mui/material";
import ImageHover from "@/components/util/ImageHover";
// import ImageHover from "@/components/ImageHover";

export default function GalleryGrid() {
  return (
    <div
      style={{
        display: "grid", // option: type grid
        gridTemplateColumns: "repeat(3, 1fr)", // option: column
        gap: "8px",
      }}
    >
      <div style={{ position: "relative" }}>
        <ImageHover />
        <Image
          src={sampleImage2}
          alt="sampleImage2"
          style={{
            borderRadius: 8, // option: corner
            width: "100%",
            height: "100%",
            aspectRatio: "1/1", // option: ratio
            objectFit: "cover",
          }}
        />
      </div>
      <div style={{ position: "relative" }}>
        <ImageHover />
        <Image
          src={sampleImage}
          alt="sampleImage"
          style={{
            borderRadius: 8, // option: corner
            width: "100%",
            height: "100%",
            aspectRatio: "1/1", // option: ratio
            objectFit: "cover",
          }}
        />
      </div>
      <div style={{ position: "relative" }}>
        <ImageHover />
        <Image
          src={sampleImage2}
          alt="sampleImage2"
          style={{
            borderRadius: 8, // option: corner
            width: "100%",
            height: "100%",
            aspectRatio: "1/1", // option: ratio
            objectFit: "cover",
          }}
        />
      </div>
    </div>
  );
}
