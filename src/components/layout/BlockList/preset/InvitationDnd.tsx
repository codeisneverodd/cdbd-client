"use client";
import styles from "../styles.module.scss";

import React, { useState, useRef, useEffect } from "react";
import { SwitchPrimary } from "@/components/buttons/Switches";
import { selectBlock } from "@/redux/features/BlockData/blockDataSlice";
import { useAppDispatch } from "@/redux/hooks";
import { UniqueIdentifier, useSensors, useSensor, PointerSensor, KeyboardSensor, DragStartEvent, DragEndEvent, DndContext, closestCenter, DragOverlay } from "@dnd-kit/core";
import { sortableKeyboardCoordinates, SortableContext, verticalListSortingStrategy, useSortable } from "@dnd-kit/sortable";
import { IconButton, Popover, List, ListItem, ListItemButton } from "@mui/material";
import { CSS } from "@dnd-kit/utilities";
import Image from "next/image";

import iconMore from "/public/images/icon-more.svg";
import iconEdit from "/public/images/icon-edit.svg";

import iconMark from "/public/images/block-icon-mark.svg";
import iconImageStar from "/public/images/block-icon-image-star.svg";
import iconTextStar from "/public/images/block-icon-text-star.svg";
import iconText from "/public/images/block-icon-text.svg";
import iconDate from "/public/images/block-icon-date.svg";
import iconMap from "/public/images/block-icon-map.svg";
import iconImage from "/public/images/block-icon-image.svg";
import iconVideo from "/public/images/block-icon-video.svg";
import iconQna from "/public/images/block-icon-qna.svg";
import iconContact from "/public/images/block-icon-contact.svg";
import iconSns from "/public/images/block-icon-sns.svg";

// NOTE: Just check this "blocks"
const blocks = [
    {
        index: 12,
        id: "12",
        title: "로고",
        type: "logo",
        icon: iconMark,
        active: true,
        disabled: false,
        previewText: null,
      },
      {
        index: 13,
        id: "13",
        title: "메인 이미지",
        type: "mainImage",
        icon: iconImageStar,
        active: false,
        disabled: false,
      },
      {
        index: 14,
        id: "14",
        title: "행사 이름",
        type: "eventTitle",
        icon: iconTextStar,
        active: false,
        disabled: false,
      },
      {
        index: 15,
        id: "15",
        title: "행사 소개",
        type: "eventText",
        icon: iconText,
        active: false,
        disabled: false,
      },
      {
        index: 16,
        id: "16",
        title: "행사 일정",
        type: "eventDate",
        icon: iconDate,
        active: false,
        disabled: false,
      },
      {
        index: 17,
        id: "17",
        title: "행사장 위치",
        type: "eventlocation",
        icon: iconMap,
        active: false,
        disabled: false,
      },
      {
        index: 18,
        id: "18",
        title: "서브 이미지",
        type: "subImage",
        icon: iconImage,
        active: false,
        disabled: false,
      },
      {
        index: 19,
        id: "19",
        title: "서브 동영상",
        type: "subVideo",
        icon: iconVideo,
        active: false,
        disabled: false,
      },
      {
        index: 20,
        id: "20",
        title: "참석 응답 받기",
        type: "eventQna",
        icon: iconQna,
        active: false,
        disabled: false,
      },
      {
        index: 21,
        id: "21",
        title: "행사 안내 연락처",
        type: "eventContact",
        icon: iconContact,
        active: false,
        disabled: false,
      },
      {
        index: 22,
        id: "22",
        title: "추가 채널 안내",
        type: "eventSns",
        icon: iconSns,
        active: false,
        disabled: false,
      },
];

export default function InvitationDnd () {
    const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null);
  
    // const blocks = useAppSelector(selectBlocks);
    // const dispatch = useAppDispatch()
  
    const sensors = useSensors(
      useSensor(PointerSensor, {
        activationConstraint: {
          delay: 100,
          tolerance: 1,
        },
      }),
      useSensor(KeyboardSensor, {
        coordinateGetter: sortableKeyboardCoordinates,
      })
    );
  
    const handleDragStart = (event: DragStartEvent) => {
      setActiveId(event.active.id);
    };
  
    const handleDragEnd = (event: DragEndEvent) => {
  
      // FIX: please modify handling blocks data
  
      // NOTE: Library example code ----start
      // setActiveId(null);
      // const { active, over } = event;
  
      // console.log(event)
      // if (active.id !== over?.id) {
      //   setItems((items) => {
      //     const oldIndex = items.findIndex(item => item.id === active.id);
      //     const newIndex = items.findIndex(item => item.id === over?.id);
  
      //     return arrayMove(items, oldIndex, newIndex);
      //   });
      // }
  
  
      // NOTE: Existing Code
      // dispatch(move(result))
    };
  
    function getIndexById(array: any, id: UniqueIdentifier) {
      return array.findIndex((item:any) => item.id === id);
    }
    return (
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
        onDragStart={handleDragStart}
      >
        <div
          className={styles.blockListDnd}
          style={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <SortableContext items={blocks} strategy={verticalListSortingStrategy}>
            {blocks.map((item: any) => (
              <SortableItem
                key={item.id}
                id={item.id}
                handle={true}
                value={item.id}
                title={item.title}
                icon={item.icon}
                active={item.active}
                disabled={item.disabled}
                previewText={item.previewText}
              />
            ))}
            <DragOverlay>
              {activeId ? (
                <SortableItem
                  key={activeId}
                  id={activeId}
                  handle={true}
                  value={activeId}
                  isDraggingItem={true}
                  title={blocks[getIndexById(blocks, activeId)].title}
                  icon={blocks[getIndexById(blocks, activeId)].icon}
                  active={blocks[getIndexById(blocks, activeId)].active}
                  disabled={blocks[getIndexById(blocks, activeId)].disabled}
                  previewText={blocks[getIndexById(blocks, activeId)].previewText}
                />
              ) : null}
            </DragOverlay>
          </SortableContext>
        </div>
      </DndContext>
    );
  }
  
  function SortableItem(props: any) {
    const {
      attributes,
      listeners,
      setNodeRef,
      transform,
      transition,
      isDragging,
    } = useSortable({ id: props.id });
  
    const style = {
      cursor: "grab",
      transform: CSS.Transform.toString(transform),
      transition,
      zIndex: isDragging ? "100" : "auto",
      opacity: isDragging ? 0.3 : 1,
      filter: isDragging
        ? "brightness(0) saturate(100%) invert(80%) sepia(82%) saturate(438%) hue-rotate(73deg) brightness(105%) contrast(97%)"
        : "none",
    };
  
  
    const dispatch = useAppDispatch();
  
    // control edit title
    const [contentEditable, setContentEditable] = useState<boolean>(false);
    const titleRef = useRef<HTMLInputElement>(null);
  
    const handleSelectBlock = () => {
      dispatch(selectBlock(props.id));
    }
  
    const handleTitleEditClick = () => {
      setContentEditable(!contentEditable);
    }
  
    useEffect(() => {
      if (contentEditable) {
        const element = titleRef?.current;
        element?.focus();
        // 텍스트의 끝에 커서를 이동시키기 위한 코드
        const range = document.createRange();
        const selection = window.getSelection();
        range.selectNodeContents(element!);
        range.collapse(false);
        selection?.removeAllRanges();
        selection?.addRange(range);
      }
    },[contentEditable]);
  
  
    // control popover (... more button)
    const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
      null
    );
  
    const handleDisableChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      // TODO: link blocks data
      // setValue(event.target.checked);
    };
  
    const handleMoreIconClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      setAnchorEl(event.currentTarget);
    };
  
    const handlePopoverClose = () => {
      setAnchorEl(null);
    };
  
    const open = Boolean(anchorEl);
    const popoverId = open ? "simple-popover" : undefined;
  
    const popoverProps = {
      id: popoverId,
      open,
      anchorEl,
      handleClose: handlePopoverClose,
    }
  
    return (
      <>
        <div
          {...listeners}
          {...attributes}
          onClick={props.disabled ? () => {} : handleSelectBlock}
          ref={setNodeRef}
          className={
            props.active
              ? `${styles.blockListDndItem} ${styles.active}`
              :  isDragging
              ? `${styles.blockListDndItem} ${styles.dragging}`
              : props.disabled
              ? `${styles.blockListDndItem} ${styles.disabled}`
              : `${styles.blockListDndItem}`
          }
          style={style}
        >
          <div className={styles.left}>
                <SwitchPrimary checked={!props.disabled} onChange={handleDisableChange}/>
              </div>
  
              <div className={styles.center}>
                <div>
                  <Image src={props.icon.src} alt="icon" width={props.icon.width} height={props.icon.height}/>
                  <span
                    ref={titleRef}
                    className={styles.title}
                    contentEditable={props.disabled ? false : contentEditable}
                    suppressContentEditableWarning={true}
                  >
                    {props.title}
                  </span>
                  <IconButton onClick={handleTitleEditClick} disabled={props.disabled}>
                    <Image
                      src={iconEdit}
                      alt="iconEdit"
                      width={14}
                      height={14}
                      style={{ opacity: 0.7 }}
                    />
                  </IconButton>
                </div>
                {props.previewText && <i className={styles.previewText}>{props.previewText}</i>}
              </div>
              <div className={styles.right}>
                <IconButton onClick={handleMoreIconClick}>
                  <Image src={iconMore} alt="iconMore" width={5} height={16} />
                </IconButton>
              </div>
        </div>
  
        <CustomPopover {...popoverProps} />
      </>
    );
  }
  
  
  
  // popover
  type PopoverProps = {
    id: string | undefined,
    anchorEl: HTMLButtonElement | null,
    handleClose: () => void,
    open: boolean
  }
  
  const listButtonStyle = {
    padding: "8px 12px",
    color: "var(--color-grey-800)",
    "&:hover": {
      backgroundColor: "var(--color-success-light)"
    }
  };
  
  const CustomPopover = ({id, anchorEl, handleClose, open}: PopoverProps) => (
    <Popover
          id={id}
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          sx={{
            "& .MuiPaper-root": {
              boxShadow: "0 2px 2px rgba(0,0,0,.2)",
            }
          }}
        >
          <List sx={{
            width: 140,
            backgroundColor: "var(--color-success-pale)",
          }}>
            <ListItem disablePadding>
              <ListItemButton sx={listButtonStyle}>카드 복제하기</ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton sx={listButtonStyle}>카드 삭제하기</ListItemButton>
            </ListItem>
          </List>
        </Popover>
  )