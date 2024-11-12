"use client"
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Scrollbar, Autoplay } from "swiper/modules";
import SwiperCore from "swiper";
import sampleImage from "/public/images/sample-image.jpg";
import sampleImage2 from "/public/images/sample-image-2.jpg";
import ImageHover from "@/components/util/ImageHover";
// import ImageHover from "@/components/ImageHover";

export default function GalleryCarousel() {
  SwiperCore.use([Navigation, Scrollbar, Autoplay]);
  return (
    <div
      style={{
        borderRadius: 8, // option: corner
        overflow: "hidden",
      }}
    >
      <div className="swiper-container">
        <Swiper
          navigation={true} // option: navigation
          autoplay={{
            delay: 6000, // option: autoPlay duration
            disableOnInteraction: false,
          }}
          pagination={true}
        >
          <SwiperSlide>
            <div style={{ position: "relative" }}>
              <ImageHover />
              <Image
                src={sampleImage2}
                alt="sampleImage2"
                style={{
                  width: "100%",
                  height: "100%",
                  aspectRatio: "16/9", // option: ratio

                  objectFit: "cover",
                }}
              />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div style={{ position: "relative" }}>
              <ImageHover />
              <Image
                src={sampleImage}
                alt="sampleImage"
                style={{
                  width: "100%",
                  height: "100%",
                  aspectRatio: "16/9", // option: ratio

                  objectFit: "cover",
                }}
              />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div style={{ position: "relative" }}>
              <ImageHover />
              <Image
                src={sampleImage2}
                alt="sampleImage2"
                style={{
                  width: "100%",
                  height: "100%",
                  aspectRatio: "16/9", // option: ratio
                  objectFit: "cover",
                }}
              />
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  );
}
