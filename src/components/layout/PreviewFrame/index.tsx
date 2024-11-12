"use client";
import React, { Fragment, use, useContext, useMemo } from "react";
import styles from "./styles.module.scss";
import Image from "next/image";
import iconPhone from "/public/images/icon-phone.svg";
import IconHome from "../../public/images/icon-home.svg";
import iconKakao from "/public/images/icon-kakao.svg";
import iconInstagram from "/public/images/icon-instagram.svg";
import iconYoutube from "/public/images/icon-youtube.svg";
import iconX from "/public/images/icon-x.svg";
import iconArrowRight from "/public/images/icon-arrow-right.svg";
// import GoogleMapReact from 'google-map-react';
// import { GoogleMap, LoadScript, Autocomplete} from '@react-google-maps/api';
import {
  APIProvider,
  ControlPosition,
  MapControl,
  // AdvancedMarker,
  Map,
  // useMap,
  // useMapsLibrary,
  // useAdvancedMarkerRef,
  // AdvancedMarkerRef
  useMap,
  useMapsLibrary
} from '@vis.gl/react-google-maps';
interface Props {
  onPlaceSelect: (place: google.maps.places.PlaceResult | null) => void;
}

import {
  IconButton,
} from "@mui/material";
import DefaultGallery from "./layout/gallery/DefaultGallery";
import { ImageBlock, ImageBlockDefault } from "./layout/ImageBlock";
import { VideoDefault } from "./layout/Video";
import { TextBlock, TextBlockDefault } from "./layout/Text";
import { Contact, ContactDefault } from "./layout/Contact";
import sampleImage from "/public/images/sample-image.jpg";
import GalleryCarousel from "./layout/gallery/GalleryCarousel";
import GalleryGrid from "./layout/gallery/GalleryGrid";
import GalleryGridMasonry from "./layout/gallery/GalleryGridMasonry";
import { QnaLongAnswerSubjective as QnaLongAnswer, QnaRadio, QnaSelect } from "./layout/Qna";
import { CodeDefault } from "./layout/Code";
import { ProfileCoverDefault, ProfileDefaultDefault, ProfileNamecardDefault } from "./layout/Profile";
import { useAppSelector } from "@/redux/hooks";
import { selectBlocks } from "@/redux/features/BlockData/blockDataSlice";
import exp from "constants";
import TextEditor from "@/components/text/TextEditor";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";


import { RootState } from "@/redux/store";
import { QnaCheckbox } from "./layout/QnATypes/CheckBox";
import { QnaShortAnswer } from "./layout/QnATypes/Subjective";

/**
 * <article/> is for [block design]
 * i made block style with inline-css.
 * and wrote option using annotation as suggest...
 * 
 * **** Short codes were not taken out as components.
 */

export default function PreviewFrame() {
  const pageStyle = useAppSelector(
    (state: RootState) => state.blockData.present.style
  );

  const blocks = useAppSelector(selectBlocks);

  // it need modal open state
  return (
    // FIX: need modalOpen state
    // <section className={modalOpen ? `${styles.previewWrap} ${styles.modal}` : `${styles.previewWrap}`}>
    <section className={true ? `${styles.previewWrap} ${styles.modal}` : `${styles.previewWrap}`}>
      {/* TODO: The pointer must be programmed to follow the "active block" position...  */}
      <i
        className={styles.pointer}
        style={{
          top: 100,
        }}
      ></i>
      <div
        className={styles.deviceFrame}
        style={{
          background: pageStyle.background ?? "unset",
          color: pageStyle?.color ?? "unset",
          fontFamily: pageStyle?.fontFamily ?? "unset",
          // "*> button": {
          //   background: "red",
          // }
        }}
      >
        {/* make below client component */}
        <ul className={styles.previewList}>
          {/* [block design] example */}
          {blocks.filter(v=>!v.disabled).map((block) => (
            <li key={block.index}>
              <article
                style={{
                  overflow: 'hidden',
                  // padding: block?.wrapperStyle?.padding ?? 0,
                  margin: block?.wrapperStyle?.margin ?? 0,
                  ...(block?.wrapperStyle?.background === 'image'?{}:{background: block?.wrapperStyle?.background}),
                  border: block?.wrapperStyle?.border,
                  borderWidth: block?.wrapperStyle?.borderWidth,
                  borderColor: block?.wrapperStyle?.borderColor,
                  borderRadius: block?.wrapperStyle?.borderRadius,
                  ...(block?.wrapperStyle?.backgroundImage ? {
                    backgroundImage: `url(${block?.wrapperStyle?.backgroundImage})`,
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }:{}),

                  // backdropFilter: block?.wrapperStyle?.imageFilter??'none',

                  // opacity(50%) => 50%
                  // ...(block?.wrapperStyle?.imageFilter?.includes('opacity') && {backgroundColor: `rgba(255,255,255,${block?.wrapperStyle?.imageFilter?.replace(/opacity\((.*?)\)/, '$1')})`}),
                  // ...(block?.wrapperStyle?.backgroundImage ? {backgroundImage: block?.wrapperStyle?.backgroundImage} : {}),
                  // padding: "8px 24px",
                  // justifyContent: "center", // option: alignment
                }}
              >
                <div
                  style={{
                    width: '100%',
                    height: '100%',
                    padding: block?.wrapperStyle?.padding ?? 0,
                    backdropFilter: block?.wrapperStyle?.imageFilter??'none',
                    borderRadius: block?.wrapperStyle?.borderRadius,
                    overflow: 'clip',
              
                    // opacity(50%) => 50%
                    ...(block?.wrapperStyle?.imageFilter?.includes('opacity') && {backgroundColor: `rgba(255,255,255,${block?.wrapperStyle?.imageFilter?.replace(/opacity\((.*?)\)/, '$1')})`}),
                  }}
                >
                {typeof block.value === "function"
                  ? block.value(block.style, block.id)
                  : block.value}
                </div>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
//  <li>
//             <article
//               style={{
//                 background: "yellow", // option: background
//                 border: "2px solid red", // option: border
//                 borderRadius: "32px", // option: corner
//                 padding: "24px", // option: inner space
//                 margin: "12px", // // option: outer space
//               }}
//             >
//               <TextBlockDefault />
//             </article>
//           </li>
export function TextPreview ({style, id}:any) {
  //  [Text]-default
  return (
    <li>
      <article style={{ padding: "12px" }}>
        <TextBlockDefault style={style} id={id} />
      </article>
    </li>
  );
};

//           {/* [Text] */}
//           <li>
//             <article style={{ padding: "12px" }}>
//               <TextBlock />
//             </article>
//           </li>
export function GalleryPreview ({style, id}:any) {
  //  [Gallery]-default
  return (
    <li>
      <article style={{ padding: "12px" }}>
        <DefaultGallery style={style} id={id} />
        {/* <GalleryCarousel /> */}
      </article>
    </li>
  );
};

//           {/* [Gallery]-grid-normal */}
//           <li>
//             <article
//               style={{
//                 padding: "12px",
//                 justifyContent: "center", // option: alignment
//               }}
//             >
//               <GalleryGrid />
//             </article>
//           </li>

//           {/* [Gallery]-grid-masonry */}
//           <li>
//             <article
//               style={{
//                 padding: "12px",
//               }}
//             >
//               <GalleryGridMasonry />
//             </article>
//           </li>

//           {/* [Gallery]-carousel(slide) */}
//           <li>
//             <article
//               style={{
//                 padding: "12px",
//               }}
//             >
//               <GalleryCarousel />
//             </article>
//           </li>

//           {/* [Image]-default */}
//           <li className={`${styles.active}`}>
//             <article style={{ padding: "12px" }}>
//               <ImageBlockDefault />
//             </article>
//           </li>

export function ImagePreview ({style, id}:any) {
  //  [Image]-default
  return (
    <li>
      <article style={{}}>
        <ImageBlock style={style} id={id} />
      </article>
    </li>
  );
}

//           {/* [Image] */}
//           <li>
//             <article
//               style={{
//                 padding: "12px",
//                 justifyContent: "center", // option: align
//               }}
//             >
//               <ImageBlock />
//             </article>
//           </li>

//           {/* [Video]-default */}
//           <li>
//             <article style={{ padding: "12px" }}>
//               <VideoDefault />
//             </article>
//           </li>
export const VideoPreview = ({style}:any) => {  
  //  [Video]-default

  if(style.url){
    let url = style.url;
    if(!style.url.includes("youtube.com/embed/")){
      if((style.url.includes("youtu.be") || style.url.includes("youtube")) && style.url.includes("v=")){
      // example: https://www.youtube.com/watch?v=ERGgwer-IpiM&ab_channel=EnesYilmazer
        try {
          let theLink = style.url
          if(!theLink.includes("https")) theLink = "https://" + theLink;
          const link = new URL(theLink);
          const videoId = link.searchParams.get("v");
          url = "https://www.youtube.com/embed/" + videoId + "?"  + (style.autoPlay?"autoplay=1":"") + (style.mute?"&mute=1":"");
        } catch (error) {
          url = "";
        }
      }
      else if(style.url.includes("youtu.be") || style.url.includes("youtube")){
        // example: https://youtu.be/iTPtklj-IpiM
        const videoId = style.url.split("/").pop().split("?")[0];
        url = "https://www.youtube.com/embed/" + videoId + "?"  + (style.autoPlay?"autoplay=1":"") + (style.mute?"&mute=1":"");
      }else {
        url = "";
      }
    }

    return (
      <li>
        <article
          style={{
            padding: style.padding ?? "8px 24px",
            margin: style.margin,
            background: style.background,
            border: style.border,
            borderWidth: style.borderWidth,
            borderColor: style.borderColor,
          }}
        >
          <iframe
            style={{ borderRadius: style?.borderRadius ?? 0 }}
            width="100%"
            height="100%"
            src={url}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
        </article>
      </li>
    );
  }

  return (
    <li>
      <article
        style={{
          // padding: style.padding ?? "8px 24px",
          // margin: style.margin,
          // background: style.background,
          // border: style.border,
          // borderWidth: style.borderWidth,
          // borderColor: style.borderColor,
        }}
      >
        <VideoDefault style={{}} />
      </article>
    </li>
  );
}

export const MapPreview = ({style}:any) => {
  //  [Map]-default

  const { type } = style;

  const sourceUrl = useMemo(() => {

    const baseUrl = "https://maps.googleapis.com/maps/api/staticmap";
    const params = new URLSearchParams({
      center: `${style?.lat},${style?.lng}`,
      zoom: style?.zoom ?? 12,
      size: style.aspectRatio==="1/1"?"800x800": style.aspectRatio==="3/2"?"800x533": style.aspectRatio==="16/9"?"800x450":"800x800",
      key: process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY!,
    });
    return `${baseUrl}?${params.toString()}`;
  }, [style.lat, style.lng, style.zoom, style.aspectRatio]);


  return (
    <li>
      <article style={{ padding: "12px" }}>
        <div style={{ position: "relative" }}>
          {/* <LoadScript googleMapsApiKey={process.env.GOOGLE_MAP_API_KEY!}>
          <GoogleMap
            mapContainerStyle={{ width: "100%", height: "100%" }}
            zoom={11}
            center={{ lat: 37.5665, lng: 126.9779 }}
          />
        </LoadScript> */}
          {type === "google" && (
            //   <GoogleMapReact
            //   bootstrapURLKeys={{ key: process.env.GOOGLE_MAP_API_KEY! }}
            //   defaultZoom={11}
            //   defaultCenter={{ lat: 37.5665, lng: 126.9779 }}
            // />

            <div>
              {style.showAddressText && <h1>{style.address}</h1>}

              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                style={{
                  cursor: style.showMapButton?"pointer":"default",
                  borderRadius: style.borderRadius,
                  overflow: 'clip'
                  // aspectRatio: style.aspectRatio
                }}
                onClick={() => {
                  if(style.lat && style.lng && style.showMapButton)
                  window.open(
                    `https://www.google.com/maps/search/?api=1&query=${style.lat},${style.lng}`
                  );
                }}
                alt="google map"
                src={sourceUrl}
                // src="https://maps.googleapis.com/maps/api/staticmap?center=Brooklyn+Bridge,New+York,NY&zoom=13&size=600x300&maptype=roadmap&markers=color:blue%7Clabel:S%7C40.702147,-74.015794&markers=color:green%7Clabel:G%7C40.711614,-74.012318&markers=color:red%7Clabel:C%7C40.718217,-73.998284&key=YOUR_API_KEY"
              />
            </div>
            // <APIProvider
            //   apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY??''}
            //   // solutionChannel='GMP_devsite_samples_v3_rgmautocomplete'
            //   >
            //   <Map
            //     mapId={'bf51a910020fa25a'}
            //     defaultZoom={11}
            //     defaultCenter={{ lat: 37.5665, lng: 126.9779 }}
            //     gestureHandling={'greedy'}
            //     disableDefaultUI={true}
            //   >
            //     {/* <AdvancedMarker ref={markerRef} position={null} /> */}
            //   </Map>
            //   {/* <MapControl position={ControlPosition.TOP}>
            //     <div className="autocomplete-control">
            //        <PlaceAutocomplete onPlaceSelect={setSelectedPlace} />
            //     </div>
            //   </MapControl> */}
            //   {/* <MapHandler place={selectedPlace} marker={marker} /> */}
            //   {/* //https://developers.google.com/maps/documentation/javascript/examples/rgm-autocomplete */}
            // </APIProvider>
          )}
        </div>
      </article>
    </li>
  );
}
//           {/* [Code]-default */}
//           <li>
//             <article style={{ padding: "12px" }}>
//               <CodeDefault />
//             </article>
//           </li>
export const CodePreview = ({style}:any) => {
  //  [Code]-default
  return (
    <li>
      <article
        style={{
          padding: style.padding ?? "8px 24px",
          margin: style.margin,
          background: style.background,
          border: style.border,
          borderWidth: style.borderWidth,
          borderColor: style.borderColor,
        }}
      >
        <CodeDefault style={style} />
      </article>
    </li>
  );
}

//           {/* [Contact]-default */}
//           <li>
//             <article style={{ padding: "12px" }}>
//               <ContactDefault />
//             </article>
//           </li>

//           {/* [Contact] */}
//           <li>
//             <article style={{ padding: "12px" }}>
//               <Contact />
//             </article>
//           </li>
export const ContactPreview = ({ style }:any) => {
  //  [Contact]-default
  return (
    <div
      style={{
        padding: style.padding ?? "8px 24px",
        margin: style.margin,
        background: style.background,
        border: style.border,
        borderWidth: style.borderWidth,
        borderColor: style.borderColor,
      }}
    >
      <button
        onClick={() => {
          if (!style.contact) return;
          if (style.contactType === "mobile") {
            window.open("tel:" + style.contact);
          } else {
            window.open("mailto:" + style.contact);
            // window.location.href = style.url.includes("http") ? style.url : "https://" + style.url
          }
        }}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          lineHeight: 1,
          padding: "14px",
          borderRadius: style.borderRadius,
          // border: "1px solid var(--color-black)",
          borderStyle: "solid",
          borderWidth: style.showBorder ? style.borderWidth : 0,
          // color: "var(--color-white)",
          // background: "var(--color-black)",
          background: style.buttonColor,
          color: style.textColor,
          fontWeight: style.fontWeight,
          fontSize: style.fontSize,
          textDecoration: style.textDecoration,
          gap: "8px",
        }}
      >
        <TextEditor value="문의하기" onSubmit={() => {}} onClose={() => {}} />
        {/* <span>문의하기</span> */}
      </button>
    </div>
  );
}

//           {/* [Qna]-checkbox */}
//           <li>
//             <article style={{ padding: "12px" }}>
//               <QnaCheckbox />
//             </article>
//           </li>

//           {/* [Qna]-radio */}
//           <li>
//             <article style={{ padding: "12px" }}>
//               <QnaRadio />
//             </article>
//           </li>

//           {/* [Qna]-select */}
//           <li>
//             <article style={{ padding: "12px" }}>
//               <QnaSelect />
//             </article>
//           </li>

//           {/* [Qna]-short-answer */}
//           <li>
//             <article style={{ padding: "12px" }}>
//               <QnaShortAnswer />
//             </article>
//           </li>

//           {/* [Qna]-long-answer */}
//           <li>
//             <article style={{ padding: "12px" }}>
//               <QnaLongAnswer />
//             </article>
//           </li>
export const QnaPreview = ({style, id}:any) => {
  //  [Qna]-long-answer
  const data = useAppSelector((state: RootState) => state.blockData.present.blocks.find((block) => block.id === id)?.data)??{};

  const QatypeSelector = () => {
    switch(style.type){
      case "checkbox":
        return <QnaCheckbox style={style} data={data} />;
      // case "Radio":
      //   return <QnaRadio style={style} />;
      // case "Select":
      //   return <QnaSelect style={style} />;
      case "subjective":
        return <QnaShortAnswer style={style} data={data} />;
      // case "Subjective-long":
      //   return <QnaLongAnswer style={style} />;
      default:
        return <QnaCheckbox style={style} data={data} />;
    }
  }

  return (
    <li>
      <article
        style={{
          padding: style.padding ?? "8px 24px",
          margin: style.margin,
          background: style.background,
          border: style.border,
          borderWidth: style.borderWidth,
          borderColor: style.borderColor,
        }}
      >
        {/* <QnaLongAnswerSubjective style={style} /> */}
        <QatypeSelector />
      </article>
    </li>
  );
}
//           {/* [Contact]-default */}
//           <li>
//             <article style={{ padding: "12px" }}>
//               <button
//                 style={{
//                   display: "flex",
//                   alignItems: "center",
//                   justifyContent: "center",
//                   width: "100%",
//                   lineHeight: 1,
//                   padding: "14px",
//                   borderRadius: "60px",
//                   border: "1px solid var(--color-black)",
//                   color: "var(--color-white)",
//                   background: "var(--color-black)",
//                   gap: "8px",
//                 }}
//               >
//                 <Image src={iconPhone} alt="iconPhone" />
//                 <span>전화하기</span>
//               </button>
//             </article>
//           </li>

//           {/* [SNS]-default */}
//           <li>
//             <article style={{ padding: "12px" }}>
//               <div
//                 style={{
//                   display: "flex",
//                   gap: "8px",
//                   justifyContent: "center",
//                 }}
//               >
//                 <IconButton>
//                   <Image src={iconHome} alt="iconHome" />
//                 </IconButton>
//                 <IconButton>
//                   <Image src={iconKakao} alt="iconKakao" />
//                 </IconButton>
//                 <IconButton>
//                   <Image src={iconInstagram} alt="iconInstagram" />
//                 </IconButton>
//                 <IconButton>
//                   <Image src={iconYoutube} alt="iconYoutube" />
//                 </IconButton>
//                 <IconButton>
//                   <Image src={iconX} alt="iconX" />
//                 </IconButton>
//               </div>
//             </article>
//           </li>
export const SNSPreview = ({ style }: any) => {
  //  [SNS]-default
  return (
    <div
      style={{
        padding: style.padding ?? "8px 24px",
        margin: style.margin,
        background: style.background,
        border: style.border,
        borderWidth: style.borderWidth,
        borderColor: style.borderColor,
      }}
    >
      <div
        style={{
          display: "flex",
          gap: "8px",
          justifyContent: "center",
        }}
      >
        {style?.home?.show && (
          <IconButton 
            onClick={() => {
              if (!style.home.value) return;
              window.open(
                style.home.value.includes("http")
                  ? style.home.value
                  : "https://" + style.home.value
              );
            }}
            >
            {/* <link href={style.home.value} /> */}
            {/* <IconHome
              // src={iconHome}
              style={{ fill: style?.color }}
              height={style?.size}
              width={style?.size}
              alt="iconHome"
              onClick={() => {
                if (!style.home.value) return;
                window.open(
                  style.home.value.includes("http")
                    ? style.home.value
                    : "https://" + style.home.value
                );
              }}
            /> */}
            <svg
              width={style?.size}
              height={style?.size}
              style={{ fill: style?.color }}
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M12.7975 3.70619C12.3483 3.27536 11.6517 3.27078 11.2025 3.70619L3.75 10.9341V19.4729C3.75 20.1054 4.26333 20.6187 4.89583 20.6187H9.25V16.0354C9.25 14.5183 10.4829 13.2854 12 13.2854C13.5171 13.2854 14.75 14.5183 14.75 16.0354V20.6187H19.1042C19.7367 20.6187 20.25 20.1054 20.25 19.4729V10.9341L12.7975 3.70619Z" />
            </svg>
          </IconButton>
        )}
        {style?.kakao?.show && (
          <IconButton 
            onClick={() => {
              if (!style.kakao.value) return;
              window.open(
                style.kakao.value.includes("http")
                  ? style.kakao.value
                  : "https://" + style.kakao.value
              );
            }}
          >
            {/* <Image
              src={iconKakao}
              style={{ fill: style?.color }}
              height={style?.size}
              width={style?.size}
              alt="iconKakao"
              onClick={() => {
                if (!style.kakao.value) return;
                window.open(
                  style.kakao.value.includes("http")
                    ? style.kakao.value
                    : "https://" + style.kakao.value
                );
              }}
            /> */}
            <svg
              width={style?.size}
              height={style?.size}
              style={{ fill: style?.color }}
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10.4145 11.3386C10.2267 10.8049 10.0388 10.2712 9.85095 9.73741C9.84628 9.7372 9.84161 9.73694 9.83694 9.73668L9.82526 9.73608L9.26006 11.342C9.37793 11.3693 10.3388 11.3652 10.4145 11.3386Z"
                fill="#292929"
              />
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M6.10003 17.1899C6.25508 17.2758 6.41132 17.3594 6.5732 17.4474C6.57132 17.4569 6.56985 17.4656 6.56852 17.4731C6.56617 17.4865 6.56423 17.4974 6.56115 17.508C6.49756 17.7294 6.43374 17.9507 6.36992 18.1721C6.2333 18.6458 6.09669 19.1195 5.96238 19.594C5.8424 20.0178 5.72706 20.443 5.6117 20.8682L5.55878 21.0632C5.5462 21.1095 5.54058 21.1597 5.54272 21.2076C5.54914 21.3478 5.64854 21.4319 5.78834 21.412C5.84934 21.4031 5.91033 21.3821 5.96679 21.3567C6.04599 21.321 6.12291 21.2793 6.19728 21.2343C6.99772 20.7508 7.76739 20.2208 8.53699 19.6908L8.56109 19.6742C8.98279 19.3839 9.4025 19.0905 9.82217 18.7971C9.9249 18.7253 10.0276 18.6535 10.1304 18.5817C10.1703 18.5539 10.2084 18.5466 10.2572 18.5536C10.764 18.6265 11.2743 18.6609 11.7857 18.672C12.179 18.6804 12.5721 18.6628 12.9648 18.634C13.3886 18.603 13.8095 18.552 14.2275 18.478C15.4848 18.2554 16.6808 17.8554 17.8028 17.241C18.7957 16.6973 19.6798 16.0175 20.4236 15.1603C21.1246 14.3523 21.6436 13.4443 21.9445 12.4144C22.1034 11.8703 22.1791 11.3142 22.1999 10.7497C22.2025 10.6785 22.1984 10.607 22.1944 10.5355C22.1914 10.4818 22.1883 10.4281 22.1881 10.3745C22.1873 10.1407 22.1585 9.91012 22.1249 9.67949C22.0079 8.8743 21.7397 8.12115 21.3473 7.41053C20.9052 6.60976 20.328 5.91707 19.6484 5.30879C19.004 4.73195 18.2891 4.25679 17.5191 3.86456C16.9034 3.55099 16.2624 3.30029 15.6009 3.1019C15.0464 2.93563 14.4818 2.81322 13.9098 2.72653C13.4072 2.65041 12.9013 2.60466 12.3933 2.59196C11.9302 2.58032 11.466 2.58072 11.0044 2.62339C10.6203 2.65885 10.237 2.70848 9.85577 2.76734C9.1172 2.88118 8.39908 3.07742 7.6973 3.33307C6.91231 3.61908 6.16772 3.98736 5.46968 4.44648C4.77712 4.90198 4.14973 5.43401 3.60165 6.05847C3.18387 6.53444 2.82576 7.05081 2.53559 7.61347C2.31165 8.04784 2.13787 8.50227 2.01079 8.97463C1.89761 9.39575 1.82725 9.82477 1.80532 10.2591C1.79402 10.4823 1.80229 10.7067 1.81054 10.9308C1.81256 10.9852 1.81457 11.0396 1.81629 11.0939C1.82659 11.4179 1.8817 11.7368 1.95367 12.052C2.14029 12.8686 2.47272 13.6233 2.9325 14.3224C3.32901 14.9252 3.80178 15.4618 4.33969 15.942C4.87974 16.4242 5.46674 16.8395 6.10003 17.1899ZM17.0863 11.4181C17.0706 11.3984 17.0545 11.378 17.0378 11.3568C16.977 11.4174 16.9187 11.467 16.8713 11.5259C16.8505 11.5517 16.8446 11.5955 16.8444 11.6313C16.8436 11.8127 16.8437 11.9942 16.8438 12.1756C16.8438 12.3813 16.8439 12.587 16.8427 12.7927C16.8414 13.0267 16.757 13.2201 16.5493 13.3464C16.1702 13.577 15.6718 13.3072 15.6573 12.8635C15.6571 12.8568 15.6571 12.85 15.6572 12.8433C15.6572 12.836 15.6573 12.8288 15.6573 12.8216L15.6573 11.4893C15.6572 10.6011 15.6572 9.71286 15.6573 8.82467C15.6573 8.54588 15.8298 8.3182 16.0952 8.24396C16.4303 8.15031 16.7792 8.37746 16.8288 8.72327C16.8376 8.78494 16.8423 8.84768 16.8426 8.91001C16.8436 9.16897 16.8434 9.42792 16.8433 9.68688C16.8433 9.7732 16.8432 9.85952 16.8432 9.94584V10.0673C16.8648 10.0474 16.8822 10.0319 16.8971 10.0183C16.9106 10.0061 16.9223 9.99531 16.9334 9.9841C17.3683 9.54799 17.8031 9.11162 18.2377 8.67524C18.2614 8.65146 18.2849 8.62755 18.3085 8.60365C18.3556 8.55576 18.4028 8.50787 18.4508 8.46093C18.6389 8.27713 18.8773 8.24984 19.099 8.39151C19.2848 8.5103 19.3878 8.67805 19.3831 8.90467C19.3804 9.03402 19.3284 9.13918 19.2379 9.22934C18.8404 9.62585 18.4436 10.0233 18.0466 10.4203C18.0049 10.4619 17.9635 10.5037 17.9165 10.5508C17.9246 10.5619 17.9322 10.5727 17.9396 10.583C17.9555 10.6054 17.9703 10.6262 17.9857 10.6465L18.2592 11.0091C18.6168 11.4831 18.9744 11.957 19.3328 12.4304C19.4282 12.5565 19.4873 12.6924 19.481 12.854C19.4719 13.0897 19.3058 13.3114 19.0773 13.3871C18.8405 13.4656 18.5779 13.3884 18.4305 13.1936C18.1767 12.8584 17.9235 12.5228 17.6702 12.1872C17.506 11.9696 17.3418 11.7521 17.1775 11.5347C17.1484 11.4962 17.1183 11.4584 17.0863 11.4181ZM10.7399 12.4333C10.7367 12.4264 10.7333 12.4191 10.7299 12.4114H8.94395C8.93199 12.4414 8.91983 12.4715 8.90762 12.5016C8.88257 12.5635 8.85734 12.6259 8.83332 12.6888C8.7738 12.8447 8.7172 13.0018 8.65714 13.1575C8.62062 13.2521 8.55815 13.3242 8.46316 13.3661C8.21876 13.4736 7.97957 13.4495 7.74935 13.3287C7.6371 13.2699 7.58586 13.1617 7.57182 13.0374C7.55029 12.8471 7.58761 12.6644 7.65397 12.488C7.81004 12.073 7.96761 11.6586 8.12517 11.2441C8.18396 11.0895 8.24273 10.9349 8.30143 10.7803C8.36846 10.6038 8.43553 10.4272 8.5026 10.2507C8.68258 9.7769 8.86255 9.30317 9.04188 8.82922C9.15264 8.53639 9.35237 8.33626 9.65497 8.25117C9.92693 8.17479 10.1621 8.26295 10.3692 8.44006C10.4933 8.54628 10.5772 8.67979 10.6353 8.83336C10.8343 9.36013 11.0343 9.8866 11.2342 10.4131C11.4406 10.9565 11.647 11.4999 11.8524 12.0436C11.9346 12.2612 12.0126 12.4809 12.0807 12.7032C12.1192 12.8292 12.1295 12.9622 12.0944 13.0946C12.0609 13.2208 11.9899 13.3117 11.8668 13.3606C11.6589 13.443 11.4492 13.4641 11.2375 13.3776C11.1372 13.3365 11.0631 13.2679 11.0235 13.1626C10.9571 12.986 10.8886 12.8103 10.8202 12.6345C10.799 12.5801 10.7778 12.5258 10.7567 12.4714C10.7518 12.4589 10.7461 12.4466 10.7399 12.4333ZM5.7573 9.38051L5.64172 9.38037C5.38005 9.38037 5.11852 9.38104 4.85685 9.3801C4.59144 9.37903 4.37018 9.21542 4.2918 8.96406C4.18879 8.63431 4.42343 8.27124 4.76723 8.22977C4.81886 8.22362 4.8713 8.22041 4.92348 8.22041C5.43698 8.22012 5.95053 8.2201 6.46406 8.22009C6.90628 8.22007 7.34849 8.22006 7.79068 8.21987C7.92525 8.21974 8.05448 8.23847 8.17046 8.31298C8.39762 8.45893 8.48056 8.69919 8.42143 8.94868C8.36244 9.19777 8.12953 9.37609 7.86921 9.37957C7.68451 9.38199 7.49975 9.38143 7.31496 9.38087C7.23461 9.38062 7.15427 9.38037 7.07391 9.38037H6.94736C6.94589 9.42572 6.94348 9.46585 6.94348 9.50612C6.94344 9.80509 6.94306 10.1041 6.94268 10.403C6.94168 11.2133 6.94066 12.0236 6.94642 12.8338C6.94869 13.1469 6.72904 13.3909 6.43488 13.4342C6.10351 13.4828 5.77656 13.2189 5.77055 12.9203C5.7697 12.878 5.76702 12.8356 5.76434 12.7933C5.76109 12.742 5.75783 12.6908 5.75783 12.6395C5.75712 11.8406 5.75718 11.0415 5.75725 10.2425L5.7573 9.38051ZM13.6201 12.1341V12.2687L14.2853 12.2686C14.3447 12.2686 14.4041 12.2684 14.4635 12.2682C14.5993 12.2678 14.7352 12.2674 14.871 12.2691C15.1177 12.2721 15.334 12.425 15.4043 12.6494C15.5053 12.9718 15.3 13.2672 14.999 13.3353C14.9418 13.3483 14.882 13.356 14.8234 13.3562C14.2237 13.3576 13.6241 13.3575 13.0244 13.3568C12.8391 13.3566 12.6741 13.3051 12.5475 13.1606C12.4616 13.0627 12.4131 12.9506 12.4131 12.8193C12.4131 12.4314 12.4131 12.0434 12.4132 11.6555C12.4133 10.7047 12.4134 9.75384 12.4123 8.80299C12.4121 8.52836 12.647 8.21345 13.0368 8.22416C13.3498 8.23285 13.6226 8.4996 13.6214 8.84995C13.6187 9.63713 13.6192 10.4244 13.6197 11.2116C13.6199 11.5191 13.6201 11.8266 13.6201 12.1341Z"
                // fill="#292929"
              />
            </svg>
          </IconButton>
        )}
        {style?.instagram?.show && (
          <IconButton
          onClick={() => {
            if (!style.instagram.value) return;
            window.open(
              style.instagram.value.includes("http")
                ? style.instagram.value
                : "https://" + style.instagram.value
            );
          }}>
            {/* <Image
              src={iconInstagram}
              style={{ fill: style?.color }}
              height={style?.size}
              width={style?.size}
              alt="iconInstagram"
              onClick={() => {
                if (!style.instagram.value) return;
                window.open(
                  style.instagram.value.includes("http")
                    ? style.instagram.value
                    : "https://" + style.instagram.value
                );
              }}
            /> */}
            <svg
              width={style?.size}
              height={style?.size}
              style={{ fill: style?.color }}
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M8 3C5.243 3 3 5.243 3 8V16C3 18.757 5.243 21 8 21H16C18.757 21 21 18.757 21 16V8C21 5.243 18.757 3 16 3H8ZM8 5H16C17.654 5 19 6.346 19 8V16C19 17.654 17.654 19 16 19H8C6.346 19 5 17.654 5 16V8C5 6.346 6.346 5 8 5ZM17 6C16.7348 6 16.4804 6.10536 16.2929 6.29289C16.1054 6.48043 16 6.73478 16 7C16 7.26522 16.1054 7.51957 16.2929 7.70711C16.4804 7.89464 16.7348 8 17 8C17.2652 8 17.5196 7.89464 17.7071 7.70711C17.8946 7.51957 18 7.26522 18 7C18 6.73478 17.8946 6.48043 17.7071 6.29289C17.5196 6.10536 17.2652 6 17 6ZM12 7C9.243 7 7 9.243 7 12C7 14.757 9.243 17 12 17C14.757 17 17 14.757 17 12C17 9.243 14.757 7 12 7ZM12 9C13.654 9 15 10.346 15 12C15 13.654 13.654 15 12 15C10.346 15 9 13.654 9 12C9 10.346 10.346 9 12 9Z"
                // fill="#292929"
              />
            </svg>
          </IconButton>
        )}
        {style?.youtube?.show && (
          <IconButton
          onClick={() => {
            if (!style.youtube.value) return;
            window.open(
              style.youtube.value.includes("http")
                ? style.youtube.value
                : "https://" + style.youtube.value
            );
          }}>
            {/* <Image
              src={iconYoutube}
              style={{ fill: style?.color }}
              height={style?.size}
              width={style?.size}
              alt="iconYoutube"
              onClick={() => {
                if (!style.youtube.value) return;
                window.open(
                  style.youtube.value.includes("http")
                    ? style.youtube.value
                    : "https://" + style.youtube.value
                );
              }}
            /> */}
            <svg
              width={style?.size}
              height={style?.size}
              style={{ fill: style?.color }}
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M21.7665 6.95982C21.5753 5.9042 20.664 5.13545 19.6065 4.89545C18.024 4.55982 15.0953 4.31982 11.9265 4.31982C8.75965 4.31982 5.78402 4.55982 4.19965 4.89545C3.14402 5.13545 2.2309 5.85545 2.03965 6.95982C1.84652 8.15982 1.65527 9.83982 1.65527 11.9998C1.65527 14.1598 1.84652 15.8398 2.08652 17.0398C2.27965 18.0954 3.1909 18.8642 4.24652 19.1042C5.92652 19.4398 8.80652 19.6798 11.9753 19.6798C15.144 19.6798 18.024 19.4398 19.704 19.1042C20.7596 18.8642 21.6709 18.1442 21.864 17.0398C22.0553 15.8398 22.2953 14.1111 22.344 11.9998C22.2465 9.83982 22.0065 8.15982 21.7665 6.95982ZM9.33527 15.3598V8.63982L15.1909 11.9998L9.33527 15.3598Z"
                // fill="#292929"
              />
            </svg>
          </IconButton>
        )}
        {style?.x?.show && (
          <IconButton 
          onClick={() => {
            if (!style.x.value) return;
            window.open(
              style.x.value.includes("http")
                ? style.x.value
                : "https://" + style.x.value
            );
          }}>
            {/* <Image
              src={iconX}
              style={{ fill: style?.color }}
              height={style?.size}
              width={style?.size}
              alt="iconX"
              onClick={() => {
                if (!style.x.value) return;
                window.open(
                  style.x.value.includes("http")
                    ? style.x.value
                    : "https://" + style.x.value
                );
              }}
            /> */}
            <svg
              width={style?.size}
              height={style?.size}
              style={{ fill: style?.color }}
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M3.75 4.38623L9.75285 12.965L4.06559 19.614H6.29952L10.7525 14.3943L14.4041 19.614H20.25L13.9712 10.6254L19.2933 4.38623H17.0941L12.9749 9.19777L9.61406 4.38623H3.75ZM6.99845 6.0782H8.73172L17.0032 17.922H15.2848L6.99845 6.0782Z"
                // fill="#292929"
              />
            </svg>
          </IconButton>
        )}
      </div>
    </div>
  );
};

//           {/* [Link]-default */}
//           <li>
//             <article style={{ padding: "12px" }}>
//               <button
//                 style={{
//                   display: "flex",
//                   alignItems: "center",
//                   justifyContent: "center",
//                   width: "100%",
//                   lineHeight: 1,
//                   padding: "14px",
//                   borderRadius: "60px",
//                   border: "1px solid var(--color-black)",
//                   color: "var(--color-white)",
//                   background: "var(--color-black)",
//                   gap: "8px",
//                 }}
//               >
//                 <span>버튼 텍스트를 입력하세요</span>
//               </button>
//             </article>
//           </li>
export const LinkPreview = ({style}:any) => {
  //  [Link]-default
  return (
    <div
      style={{
        padding: style.padding ?? "8px 24px",
        margin: style.margin,
        background: style.background,
        border: style.border,
        borderWidth: style.borderWidth,
        borderColor: style.borderColor,
      }}
    >
      <button
        onClick={() => {
          // if (!style.link) return;
          // if (style.openNewTab) {
          //   window.open(
          //     style.link.includes("http") ? style.link : "https://" + style.link
          //   );
          // } else {
          //   window.location.href = style.link.includes("http")
          //     ? style.link
          //     : "https://" + style.link;
          // }
        }}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          lineHeight: 1,
          padding: "14px",
          borderRadius: style.borderRadius,
          // border: "1px solid var(--color-black)",
          borderStyle: "solid",
          borderWidth: style.showBorder ? style.borderWidth : 0,
          // color: "var(--color-white)",
          // background: "var(--color-black)",
          background: style.buttonColor,
          color: style.textColor,
          fontWeight: style.fontWeight,
          fontSize: style.fontSize,
          textDecoration: style.textDecoration,
          gap: "8px",
        }}
      >
        <TextEditor
          value="버튼 텍스트를 입력하세요"
          onSubmit={() => {}}
          onClose={() => {}}
        />
        {/* <span>버튼 텍스트를 입력하세요</span> */}
      </button>
    </div>
  );
}

export const WhiteSpacePreview = ({style}: any) => {
  return (
    <div
      style={{
        height: style.height,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        margin: style.margin,
        background: style.background,
        border: style.border,
        borderWidth: style.borderWidth,
        borderColor: style.borderColor,
      }}
    >
      {style.showLine && (
        <div style={{ height: style.lineHeight, background: "#000" }}></div>
      )}
    </div>
  );
}

//           {/* [Link]-image-vertical */}
//           <li>
//             <article style={{ padding: "12px" }}>
//               <button
//                 style={{
//                   display: "flex",
//                   flexDirection: "column",
//                   alignItems: "center",
//                   justifyContent: "center",
//                   width: "100%",
//                   lineHeight: 1,
//                   borderRadius: "8px",
//                   color: "var(--color-white)",
//                   background: "var(--color-black)",
//                   border: "none",
//                   overflow: "hidden",
//                 }}
//               >
//                 <Image
//                   src={sampleImage}
//                   alt="sampleImage"
//                   style={{
//                     width: "100%", // option: size
//                     height: "auto",
//                     aspectRatio: "1/1", // option: ratio
//                     objectFit: "cover",
//                   }}
//                 />
//                 <span
//                   style={{
//                     padding: "16px 0",
//                   }}
//                 >
//                   버튼 텍스트를 입력하세요
//                 </span>
//               </button>
//             </article>
//           </li>

//           {/* [Link]-image-horizontal */}
//           <li>
//             <article style={{ padding: "12px" }}>
//               <button
//                 style={{
//                   display: "flex",
//                   flexDirection: "row",
//                   alignItems: "center",
//                   justifyContent: "space-between",
//                   width: "100%",
//                   lineHeight: 1,
//                   borderRadius: "8px",
//                   color: "var(--color-white)",
//                   background: "var(--color-black)",
//                   border: "none",
//                   overflow: "hidden",
//                 }}
//               >
//                 <Image
//                   src={sampleImage}
//                   alt="sampleImage"
//                   style={{
//                     width: "30%", // option: size
//                     height: "auto",
//                     aspectRatio: "1/1", // option: ratio
//                     objectFit: "cover",
//                   }}
//                 />
//                 <span
//                   style={{
//                     display: "block",
//                     width: "100%",
//                     padding: "16px 0",
//                   }}
//                 >
//                   버튼 텍스트를 입력하세요
//                 </span>
//               </button>
//             </article>
//           </li>

//           {/* [Link]-image */}
//           <li>
//             <article style={{ padding: "12px" }}>
//               <button
//                 style={{
//                   position: "relative",
//                   display: "flex",
//                   flexDirection: "row",
//                   alignItems: "center",
//                   justifyContent: "space-between",
//                   width: "100%",
//                   lineHeight: 1,
//                   borderRadius: "8px",
//                   color: "var(--color-white)",
//                   background: "var(--color-black)",
//                   border: "none",
//                   overflow: "hidden",
//                 }}
//               >
//                 <Image
//                   src={sampleImage}
//                   alt="sampleImage"
//                   style={{
//                     display: "block",
//                     width: "100%", // option: size
//                     height: "auto",
//                     aspectRatio: "1/1", // option: ratio
//                     objectFit: "cover",
//                   }}
//                 />
//                 <span
//                   style={{
//                     position: "absolute",
//                     left: "50%",
//                     top: "50%",
//                     transform: "translate(-50%, -50%)",
//                     display: "block",
//                     width: "100%",
//                     padding: "16px 0",
//                     textDecoration: "underline",
//                   }}
//                 >
//                   버튼 텍스트를 입력하세요
//                 </span>
//               </button>
//             </article>
//           </li>

//           {/* [Link]-image */}
//           <li>
//             <article style={{ padding: "12px" }}>
//               <button
//                 style={{
//                   position: "relative",
//                   display: "flex",
//                   flexDirection: "row",
//                   alignItems: "center",
//                   justifyContent: "space-between",
//                   width: "100%",
//                   lineHeight: 1,
//                   borderRadius: "8px",
//                   color: "var(--color-white)",
//                   background: "var(--color-black)",
//                   border: "none",
//                   overflow: "hidden",
//                 }}
//               >
//                 <Image
//                   src={sampleImage}
//                   alt="sampleImage"
//                   style={{
//                     display: "block",
//                     width: "100%", // option: size
//                     height: "auto",
//                     aspectRatio: "1/1", // option: ratio
//                     objectFit: "cover",
//                   }}
//                 />
//                 <span
//                   style={{
//                     position: "absolute",
//                     left: "50%",
//                     top: "50%",
//                     transform: "translate(-50%, -50%)",
//                     display: "block",
//                     width: "100%",
//                     padding: "16px 0",
//                     textDecoration: "underline",
//                   }}
//                 >
//                   버튼 텍스트를 입력하세요
//                 </span>
//               </button>
//             </article>
//           </li>

export const ProfilePreview = ({style, id}: any) => {
  const LayoutRenderer = () => {
    switch (style.layout) {
      case "default":
        return <ProfileDefaultDefault style={style} id={id} />;
      case "namecard":
        return <ProfileNamecardDefault style={style} id={id} />;
      case "cover":
        return <ProfileCoverDefault style={style} id={id} />;
      default:
        return <ProfileDefaultDefault style={style} id={id} />;
    }
  }

  return (
    <div style={{background: style?.background, border: style?.border, borderWidth: style?.borderWidth, padding: style?.padding??0, margin: style?.margin??0}}>
      <LayoutRenderer />
    </div>
  )
}
//           {/* [Profile]-default-default */}
//           <li>
//             <article style={{ padding: "0px 0px 8px 0px" }}>
//               <ProfileDefaultDefault />
//             </article>
//           </li>

//           {/* [Profile]-default */}
//           <li>
//             <article style={{ padding: "0px 0px 8px 0px" }}>
//               <ProfileDefault />
//             </article>
//           </li>

//           {/* [Profile]-cover-default */}
//           <li>
//             <article style={{ padding: "0px 0px 8px 0px" }}>
//               <ProfileCoverDefault />
//             </article>
//           </li>

//           {/* [Profile]-cover */}
//           <li>
//             <article style={{ padding: "0px 0px 8px 0px" }}>
//               <ProfileCover />
//             </article>
//           </li>

//           {/* [Profile]-namecard-default */}
//           <li>
//             <article style={{ padding: "0px 0px 8px 0px" }}>
//               <ProfileNamecardDefault />
//             </article>
//           </li>

//           {/* [Profile]-namecard */}
//           <li>
//             <article style={{ padding: "0px 0px 8px 0px" }}>
//               <ProfileNamecard />
//             </article>
//           </li>


export const IndexPreview = ({style}: any) => {
  return (
    <div style={{}}>
      <p
        style={{
          color: "#292929",
          textAlign: "center",
          fontSize: "20px",
          fontWeight: "bold",
          lineHeight: "140%",
        }}
      >
        목차
      </p>
      {/* space */}
      <div
        style={{
          height: "24px", // option: space
          position: "relative",
        }}
      ></div>
      {/* index list item */}
      <button
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center", // option: alignment
          gap: "8px",
          width: "100%",
          border: "none",
          background: "none"
        }}
      >
        <span style={{ fontSize: "16px" }}>1. CdBd 브랜드 스토리</span>
        <Image src={iconArrowRight} alt="arrow" style={{
          width: "24px", // option: arrow size
          height: "24px", // option: arrow size
        }}/>
      </button>
      {/* space-divider */}
      <div
        style={{
          height: "24px", // option: space
          position: "relative",
        }}
      >
        <hr
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "100%",
            border: "none",
            outline: "none",
            height: "1px", // option: divider height
            backgroundColor: "#000000", // option: divider color
          }}
        />
      </div>
    </div>
  );
}