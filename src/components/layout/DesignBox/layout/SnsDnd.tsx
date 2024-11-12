import React, { ReactElement, useMemo, useState } from "react";
import styles from "../styles.module.scss";

import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragOverlay,
  DragStartEvent,
  DragEndEvent,
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

import iconMovable from "/public/images/icon-movable.svg";
import iconHome from "/public/images/icon-home.svg";
import iconContact from "/public/images/icon-block-inquiry.svg";
import iconEmail from "/public/images/icon-email.svg";
import iconKakao from "/public/images/icon-kakao.svg";
import iconInstagram from "/public/images/icon-instagram.svg";
import iconYoutube from "/public/images/icon-youtube.svg";
import iconX from "/public/images/icon-x.svg";

import Image from "next/image";
import { SwitchSecondary } from "@/components/buttons/Switches";
import { TextField } from "@mui/material";

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { changeStyle } from "@/redux/features/BlockData/blockDataSlice";

type SnsDndItem = {
  index: number;
  id: string;
  title: string;
  icon: ReactElement<any, any>;
  disabled: boolean;
};

const sampleListData: SnsDndItem[] = [
  {
    index: 0,
    id: "home",
    title: "홈페이지 URL",
    icon: <Image src={iconHome} alt="iconHome" />,
    disabled: false,
  },
  {
    index: 1,
    id: "kakao",
    title: "카카오톡 채널 URL",
    icon: <Image src={iconKakao} alt="iconKakao" />,
    disabled: true,
  },
  {
    index: 2,
    id: "instagram",
    title: "인스타그램 채널 URL",
    icon: <Image src={iconInstagram} alt="iconInstagram" />,
    disabled: false,
  },
  {
    index: 3,
    id: "youtube",
    title: "유튜브 채널 URL",
    icon: <Image src={iconYoutube} alt="iconYoutube" />,
    disabled: false,
  },
  {
    index: 4,
    id: "x",
    title: "X 채널 URL",
    icon: <Image src={iconX} alt="iconX" />,
    disabled: false,
  },
];

const additionalSampleListData: SnsDndItem[] = [
  {
    index: 0,
    id: "home",
    title: "홈페이지 URL",
    icon: <Image src={iconHome} alt="iconHome" />,
    disabled: false,
  },
  {
    index: 1,
    id: "mobile",
    title: "전화번호",
    icon: <Image src={iconContact} alt="iconContact" />,
    disabled: false,
  },
  {
    index: 2,
    id: "email",
    title: "이메일 주소",
    icon: <Image src={iconEmail} alt="iconEmail" />,
    disabled: false,
  },
  {
    index: 3,
    id: "kakao",
    title: "카카오톡 채널 URL",
    icon: <Image src={iconKakao} alt="iconKakao" />,
    disabled: true,
  },
  {
    index: 4,
    id: "instagram",
    title: "인스타그램 채널 URL",
    icon: <Image src={iconInstagram} alt="iconInstagram" />,
    disabled: false,
  },
  {
    index: 5,
    id: "youtube",
    title: "유튜브 채널 URL",
    icon: <Image src={iconYoutube} alt="iconYoutube" />,
    disabled: false,
  },
  {
    index: 6,
    id: "x",
    title: "X 채널 URL",
    icon: <Image src={iconX} alt="iconX" />,
    disabled: false,
  },
];

export default function SnsDnd({additional = false}: {additional?:boolean}) {
  const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null);
  const [items, setItems] = useState(additional ? additionalSampleListData : sampleListData);
  const sensors = useSensors(
    useSensor(PointerSensor),
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
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over?.id);

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
              disabled={item.disabled}
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
                disabled={
                  items[items.findIndex((item) => item.id === activeId)]
                    .disabled
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
    cursor: "default",
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? "100" : "auto",
    opacity: isDragging ? 0.3 : 1,
    border:
      isDragging || props.isDraggingItem ? "1px solid var(--color-success)" : "",
    filter: isDragging
      ? "invert(44%) sepia(85%) saturate(2067%) hue-rotate(196deg) brightness(100%) contrast(96%)"
      : "none",
  };

  const dispatch = useDispatch();
  const selectedBlockId = useSelector(
    (state: RootState) => state.blockData.present.selectedBlockId
  );
  const selectedBlockStyle = useSelector((state: RootState) =>
    state.blockData.present.blocks.find(
      (block) => block.id === state.blockData.present.selectedBlockId
    )
  )?.style;

  const show = useMemo(
    () => selectedBlockStyle[props.id].show,
    [selectedBlockStyle, props.id]
  );

  return (
    <>
      <div
        ref={setNodeRef}
        className={
          show
            ? styles.channelListDndItem
            : `${styles.channelListDndItem} ${styles.disabled}`
        }
        style={style}
      >
        <Image
          {...listeners}
          {...attributes}
          src={iconMovable}
          alt="iconMovable"
          style={{
            cursor: "grab",
            filter:
              isDragging || props.isDraggingItem
                ? "invert(44%) sepia(85%) saturate(2067%) hue-rotate(196deg) brightness(100%) contrast(96%)"
                : "none",
          }}
        />

        <SwitchSecondary
          checked={show}
          onChange={(e: any) => {
            dispatch(
              changeStyle({
                id: selectedBlockId,
                style: {
                  ...selectedBlockStyle,
                  [props.id]: {
                    ...selectedBlockStyle[props.id],
                    show: e.target.checked,
                  },
                },
              })
            );
          }}
        />

        {props.icon}
        <TextField
          color="secondary"
          placeholder={props.title}
          fullWidth
          disabled={!show}
          value={selectedBlockStyle[props.id].value}
          onChange={(e) => {
            dispatch(
              changeStyle({
                id: selectedBlockId,
                style: {
                  ...selectedBlockStyle,
                  [props.id]: {
                    ...selectedBlockStyle[props.id],
                    value: e.target.value,
                  },
                },
              })
            );
          }}
          sx={{
            "& fieldset": {
              borderColor: show ? "inherit" : "transparent !important",
            },
            "& input": {
              color: show ? "inherit" : "var(--color-grey-300)",
            },
          }}
        />
      </div>
    </>
  );
}
