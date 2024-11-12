import styles from "../styles.module.scss";
import React, { useState } from "react";
import Image from "next/image";

import { IconButton, Stack } from "@mui/material";
import iconImage from "/public/images/block-icon-image.svg";
// import { ButtonSecondary } from "@/components/Buttons";
import sampleImage from "/public/images/sample-image.jpg";
import { ButtonSecondary } from "@/components/buttons/Buttons";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useAppDispatch } from "@/redux/hooks";
import { changeStyle, selectBlock } from "@/redux/features/BlockData/blockDataSlice";
import { showModal } from "@/redux/features/Modal/modalSlice";

export const ImageBlockDefault = () => (
  <div className={styles.defaultArea}>
    <Stack
      direction="column"
      justifyContent="center"
      alignItems="center"
      gap="12px"
      height="100%"
    >
      <Stack
        direction="row"
        gap="8px"
        alignItems="center"
        justifyContent="center"
      >
        <Image src={iconImage} alt="iconImage" width={20} />
        <span className="h3">이미지</span>
      </Stack>
      <ButtonSecondary>이미지 업로드하기</ButtonSecondary>
    </Stack>
  </div>
);

export const ImageBlock = ({style, id}:any) => {
  const {
    url,
    alt,
    width,
    height,
    aspectRatio,
    borderRadius,
    objectFit,
    padding,
    margin,
    borderWidth,
    borderColor,
    border,
    background,
    imageFilter,
    link,
    openInNewTab = false,
  } = style;

  const dispatch = useAppDispatch();

  const [hover, setHover] = useState(false);

  const handleDelete = (e:any) => {
    e.stopPropagation();
    dispatch(changeStyle({id: id, style: {...style, url: '/images/sample-image.jpg'}}));
  };

  const handleEdit = (e:any) => {
    e.stopPropagation();
    dispatch(selectBlock(id));
    dispatch(showModal({ modalType: "addImage" }));
  };

  const handleClick = (e:any) => {
    e.stopPropagation();
    if(!link) return;
    if(openInNewTab) {
      // open in new tab
      window.open(link.includes('http')?link: `https://${link}`, '_blank');
    } else {
      // open in same tab
      window.location.href = link.includes('http')?link: `https://${link}`;
    }
  };

  return (
    <div style={{
      position: 'relative',
      width: width,
      height: height,
      margin: margin,
      border: border,
      borderWidth: borderWidth,
      borderColor: borderColor,
      background: background==="image"?`url(${url})`:background,
    }}
    onMouseEnter={() => setHover(true)}
    onMouseLeave={() => setHover(false)}
    >
    {/* hover buttons */}
    <div style={{
      width: '100%',
      height: '100%',
      position: 'absolute',
      top: 0,
      left: 0,
      display: hover?'flex':'none',
      justifyContent: 'center',
      alignItems: 'center',
      gap: '4px',
      background: 'rgba(0,0,0,0.4)',
      }}
      onClick={handleClick}
    >
      <IconButton size="large" color="error" onClick={handleDelete}>
        <DeleteIcon />
      </IconButton>
      <IconButton size="large" color="secondary" onClick={handleEdit}>
        <EditIcon />
      </IconButton>
    </div>
    <div style={{
      width: '100%',
      height: '100%',
      padding: padding,
      backdropFilter: imageFilter??'none',

      // opacity(50%) => 50%
      ...(imageFilter?.includes('opacity') && {backgroundColor: `rgba(255,255,255,${imageFilter?.replace(/opacity\((.*?)\)/, '$1')})`}),
    }}>
      {
      // eslint-disable-next-line @next/next/no-img-element
      <img
        onClick={handleClick}
        src={url}
        alt={alt??""}
        width={'100%'}
        // height={'auto'}
        style={{
          aspectRatio: aspectRatio,
          borderRadius: borderRadius,
          objectFit: objectFit,
        }}
      />
      }
    </div>
  </div>
  );
};
