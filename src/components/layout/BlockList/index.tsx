"use client";
import styles from "./styles.module.scss";

import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragOverlay,
  DragEndEvent,
  DragStartEvent,
  UniqueIdentifier,
} from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import {
  useSortable,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";

import iconMore from "/public/images/icon-more.svg";
import iconEdit from "/public/images/icon-edit.svg";
import iconPlus from "/public/images/icon-plus-white.svg";

import {
  Button,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  Popover,
  Stack,
} from "@mui/material";
import { ButtonPrimaryBlack } from "@/components/buttons/Buttons";
import { SwitchPrimary } from "@/components/buttons/Switches";
import {
  changeBlockStatus,
  selectBlock,
  selectBlocks,
} from "@/redux/features/BlockData/blockDataSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { showModal } from "@/redux/features/Modal/modalSlice";
import Confirm from "@/components/Confirm";
import Alert from "@/components/Alert";
import { Toast } from "@/components/Toast";
import { move } from "@/redux/features/BlockData/blockDataSlice";

import InvitationDnd from "./preset/InvitationDnd";
import CatalogDnd from "./preset/CatalogDnd";
import NewsletterDnd from "./preset/NewsletterDnd";
import BusinessCardDnd from "./preset/BusinessCardDnd";

export default function BlockList() {
  const dispatch = useAppDispatch();

  const handleModalOpen = () => {
    dispatch(showModal({ modalType: "addBlock" }));
  };

  const openConfirm = () => {
    Confirm({
      title: "Confirm 제목",
      text: `필요한 경우 이곳에 경고 메세지가 표시됩니다.`,
    });
  };
  const openAlert = () => {
    Alert({
      title: "Alert 제목",
      text: `필요한 경우 이곳에 경고 메세지가 표시됩니다.`,
    });
  };

  const [toast, setToast] = useState<boolean>(false);
  const [toastType, setToastType] = useState<"SUCCESS" | "ERROR" | "WARNING">(
    "SUCCESS"
  );
  const openToast = (type: "SUCCESS" | "ERROR" | "WARNING") => {
    setToast(true);
    setToastType(type);
  };

  return (
    <section className={styles.blockListWrap}>
      <ButtonPrimaryBlack
        fullWidth
        startIcon={
          <Image src={iconPlus} alt="iconPlus" width={14} height={14} />
        }
        onClick={handleModalOpen}
      >
        카드 추가하기
      </ButtonPrimaryBlack>

      {/*
        FIX: You can unannotate to see which cards have been added.
        * BlockListDnd : For default, link in bio Cards
      */}

      <BlockListDnd />
      {/* <InvitationDnd /> */}
      {/* <CatalogDnd /> */}
      {/* <NewsletterDnd /> */}
      {/* <BusinessCardDnd /> */}

      <div className={styles.banner}>(배너)</div>

      {/* FIX: toast, modal example (delete please) */}
      <Stack mt={2} gap={2}>
        <Button variant="contained" onClick={openAlert}>
          Alert Example
        </Button>
        <Button variant="contained" onClick={openConfirm}>
          Confirm Example
        </Button>
        <hr />
        <Button variant="contained" onClick={() => openToast("SUCCESS")}>
          Toast SUCCESS Example
        </Button>
        <Button variant="contained" onClick={() => openToast("ERROR")}>
          Toast ERROR Example
        </Button>
        <Button variant="contained" onClick={() => openToast("WARNING")}>
          Toast WARNING Example
        </Button>

        <Toast
          open={toast}
          setOpen={setToast}
          type={toastType}
          message="메세지가 표시됩니다."
        />
      </Stack>
    </section>
  );
}

function BlockListDnd() {
  const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null);

  const blocks = useAppSelector(selectBlocks);
  const dispatch = useAppDispatch();

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

    // console.log("drag event 101",{event})

    const { active, over, collisions } = event;
    
    if (active.id !== over?.id && collisions)
      dispatch(move(event))

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
    return array.findIndex((item: any) => item.id === id);
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
  };

  const handleTitleEditClick = () => {
    setContentEditable(!contentEditable);
  };

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
  }, [contentEditable]);

  // control popover (... more button)
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );

  const handleDisableChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.stopPropagation();
    dispatch(changeBlockStatus({ id: props.id, disabled: !event.target.checked }));
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
  };

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
            : isDragging
            ? `${styles.blockListDndItem} ${styles.dragging}`
            : props.disabled
            ? `${styles.blockListDndItem} ${styles.disabled}`
            : `${styles.blockListDndItem}`
        }
        style={style}
      >
        <div className={styles.left}>
          <SwitchPrimary
            checked={!props.disabled}
            onChange={handleDisableChange}
          />
        </div>

        <div className={styles.center}>
          <div>
            <Image
              src={props.icon.src}
              alt="icon"
              width={props.icon.width}
              height={props.icon.height}
            />
            <span
              ref={titleRef}
              className={styles.title}
              contentEditable={props.disabled ? false : contentEditable}
              suppressContentEditableWarning={true}
            >
              {props.title}
            </span>
            <IconButton
              onClick={handleTitleEditClick}
              disabled={props.disabled}
            >
              <Image
                src={iconEdit}
                alt="iconEdit"
                width={14}
                height={14}
                style={{ opacity: 0.7 }}
              />
            </IconButton>
          </div>
          {props.previewText && (
            <i className={styles.previewText}>{props.previewText}</i>
          )}
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

const CustomPopover = ({ id, anchorEl, handleClose, open }: PopoverProps) => (
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
        <ListItemButton sx={listButtonStyle}>카드 복제하기</ListItemButton>
      </ListItem>
      <ListItem disablePadding>
        <ListItemButton sx={listButtonStyle}>카드 삭제하기</ListItemButton>
      </ListItem>
    </List>
  </Popover>
);
