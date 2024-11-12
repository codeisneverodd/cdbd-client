import React, { ReactElement, useState } from "react";
import styles from "../index.module.scss";

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
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

import iconClose from "/public/images/icon-close-small.svg";
import iconMovable from "/public/images/icon-movable.svg";
import iconGallery from "/public/images/block-icon-gallery.svg";
import iconText from "/public/images/block-icon-text.svg";
import iconImage from "/public/images/block-icon-image.svg";
import iconVideo from "/public/images/block-icon-video.svg";
import iconLink from "/public/images/block-icon-link.svg";
import iconMargin from "/public/images/block-icon-margin.svg";
import iconQna from "/public/images/block-icon-qna.svg";
import iconSns from "/public/images/block-icon-sns.svg";
import iconMap from "/public/images/block-icon-map.svg";
import iconContact from "/public/images/block-icon-contact.svg";
import iconCode from "/public/images/block-icon-code.svg";
import iconGalleryPrimary from "/public/images/block-icon-primary-Gallery.svg";
import iconTextPrimary from "/public/images/block-icon-primary-Text.svg";
import iconImagePrimary from "/public/images/block-icon-primary-Image.svg";
import iconVideoPrimary from "/public/images/block-icon-primary-Video.svg";
import iconLinkPrimary from "/public/images/block-icon-primary-Link.svg";
import iconMarginPrimary from "/public/images/block-icon-primary-Margin.svg";
import iconQnaPrimary from "/public/images/block-icon-primary-QnA.svg";
import iconSnsPrimary from "/public/images/block-icon-primary-SNS.svg";
import iconMapPrimary from "/public/images/block-icon-primary-Map.svg";
import iconContactPrimary from "/public/images/block-icon-primary-Contact.svg";
import iconCodePrimary from "/public/images/block-icon-primary-Code.svg";

import Image from "next/image";
import { IconButton } from "@mui/material";

type PreviewListItem = {
  index: number;
  id: string;
  title: string;
  icon: ReactElement<any, any>;
  iconPrimary: ReactElement<any, any>;
  active: boolean;
};

const sampleListData: PreviewListItem[] = [
  {
    index: 0,
    id: "0",
    title: "갤러리",
    icon: <Image src={iconGallery} alt="iconGallery" />,
    iconPrimary: (
      <Image
        className={styles.primary}
        src={iconGalleryPrimary}
        alt="iconGalleryPrimary"
      />
    ),
    active: false,
  },
  {
    index: 1,
    id: "1",
    title: "텍스트",
    icon: <Image src={iconText} alt="iconText" />,
    iconPrimary: (
      <Image
        className={styles.primary}
        src={iconTextPrimary}
        alt="iconTextPrimary"
      />
    ),
    active: true,
  },
  {
    index: 2,
    id: "2",
    title: "이미지",
    icon: <Image src={iconImage} alt="iconImage" />,
    iconPrimary: (
      <Image
        className={styles.primary}
        src={iconImagePrimary}
        alt="iconImagePrimary"
      />
    ),
    active: false,
  },
  {
    index: 3,
    id: "3",
    title: "동영상",
    icon: <Image src={iconVideo} alt="iconVideo" />,
    iconPrimary: (
      <Image
        className={styles.primary}
        src={iconVideoPrimary}
        alt="iconVideoPrimary"
      />
    ),
    active: false,
  },
  {
    index: 4,
    id: "4",
    title: "링크",
    icon: <Image src={iconLink} alt="iconLink" />,
    iconPrimary: (
      <Image
        className={styles.primary}
        src={iconLinkPrimary}
        alt="iconLinkPrimary"
      />
    ),
    active: false,
  },
  {
    index: 5,
    id: "5",
    title: "여백",
    icon: <Image src={iconMargin} alt="iconMargin" />,
    iconPrimary: (
      <Image
        className={styles.primary}
        src={iconMarginPrimary}
        alt="iconMarginPrimary"
      />
    ),
    active: false,
  },
  {
    index: 6,
    id: "6",
    title: "질문과 답변",
    icon: <Image src={iconQna} alt="iconQna" />,
    iconPrimary: (
      <Image
        className={styles.primary}
        src={iconQnaPrimary}
        alt="iconQnaPrimary"
      />
    ),
    active: false,
  },
  {
    index: 7,
    id: "7",
    title: "SNS",
    icon: <Image src={iconSns} alt="iconSns" />,
    iconPrimary: (
      <Image
        className={styles.primary}
        src={iconSnsPrimary}
        alt="iconSnsPrimary"
      />
    ),
    active: false,
  },
  {
    index: 8,
    id: "8",
    title: "위치 안내",
    icon: <Image src={iconMap} alt="iconMap" />,
    iconPrimary: (
      <Image
        className={styles.primary}
        src={iconMapPrimary}
        alt="iconMapPrimary"
      />
    ),
    active: false,
  },
  {
    index: 9,
    id: "9",
    title: "문의하기",
    icon: <Image src={iconContact} alt="iconContact" />,
    iconPrimary: (
      <Image
        className={styles.primary}
        src={iconContactPrimary}
        alt="iconContactPrimary"
      />
    ),
    active: false,
  },
  {
    index: 10,
    id: "10",
    title: "코드",
    icon: <Image src={iconCode} alt="iconCode" />,
    iconPrimary: (
      <Image
        className={styles.primary}
        src={iconCodePrimary}
        alt="iconCodePrimary"
      />
    ),
    active: false,
  },
];

export default function SnsDnd() {
  const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null);
  const [items, setItems] = useState(sampleListData);
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
    setActiveId(null);
    const { active, over } = event;

    if (active.id !== over?.id) {
      setItems((items) => {
        const oldIndex = items.findIndex(item => item.id === active.id);
        const newIndex = items.findIndex(item => item.id === over?.id);

        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
      onDragStart={handleDragStart}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "8px",
        }}
      >
        <SortableContext items={items} strategy={verticalListSortingStrategy}>
          {items.map((item) => (
            <SortableItem
              key={item.id}
              id={item.id}
              handle={true}
              value={item.id}
              icon={item.icon}
              title={item.title}
              active={item.active}
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
                icon={
                  items[items.findIndex((item) => item.id === activeId)].icon
                }
                title={
                  items[items.findIndex((item) => item.id === activeId)].title
                }
                active={
                  items[items.findIndex((item) => item.id === activeId)].active
                }
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
    border:
      isDragging || props.isDraggingItem ? "1px solid var(--color-grey-900)" : "",
    filter: isDragging
      ? "brightness(0) saturate(100%) invert(29%) sepia(25%) saturate(7498%) hue-rotate(241deg) brightness(101%) contrast(102%)"
      : "none",
  };

  const handleRemoveItem = () => {
    alert("remove!")
  }

  return (
    <>
      <div
        {...listeners}
        {...attributes}
        ref={setNodeRef}
        className={
          props.active
            ? `${styles.channelListDndItem} ${styles.active}`
            : styles.channelListDndItem
        }
        style={style}
      >
        <div className={styles.left}>
          <Image
            src={iconMovable}
            alt="iconMovable"
            style={{
              filter: isDragging || props.isDraggingItem
                ? "brightness(0) saturate(100%) invert(0%) sepia(27%) saturate(3184%) hue-rotate(45deg) brightness(113%) contrast(87%)"
                : props.active ? "brightness(0) saturate(100%) invert(29%) sepia(25%) saturate(7498%) hue-rotate(241deg) brightness(101%) contrast(102%)"
                : "none",
            }}
          />
          {props.icon}
          <span className="subtitle1">{props.title}</span>
        </div>
        <IconButton onClick={handleRemoveItem}>
          <Image
            src={iconClose}
            alt="iconClose"
            width={10}
            height={10}
            style={{ opacity: 0.7 }}
          />
        </IconButton>
      </div>
    </>
  );
}
