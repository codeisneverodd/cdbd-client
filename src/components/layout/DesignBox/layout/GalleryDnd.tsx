import React, { useState } from "react";
import styles from "../styles.module.scss";
import ImageHover from "@/components/util/ImageHover";
import sampleImage from "/public/images/sample-image.jpg";
import iconPlus from "/public/images/icon-plus.svg";

import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragOverlay,
} from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import {
  useSortable,
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  rectSortingStrategy,
} from "@dnd-kit/sortable";

import Image from "next/image";
import { useDispatch } from "react-redux";
import { showModal } from "@/redux/features/Modal/modalSlice";
import { useAppSelector } from "@/redux/hooks";
import { changeStyle } from "@/redux/features/BlockData/blockDataSlice";

export default function GalleryDnd() {
  const [activeId, setActiveId] = useState(null);
  const [items, setItems] = useState(["0", "1", "2", "3", "4", "5"]);

  const images = useAppSelector(
    (state) =>
      state.blockData.present.blocks.find(
        (block) => block.id === state.blockData.present.selectedBlockId
      )?.style?.images
  );

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

  const handleDragStart = (event: any) => {
    setActiveId(event.active.id);
  };

  const handleDragEnd = (event: any) => {
    setActiveId(null);
    const { active, over } = event;

    if (active.id !== over.id) {
      setItems((items) => {
        const oldIndex = items.indexOf(active.id);
        const newIndex = items.indexOf(over.id);

        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  const dispatch = useDispatch();
  const handleAddImage = () => dispatch(showModal({ modalType: "addImage" }));

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
      onDragStart={handleDragStart}
    >
      <div
        style={{
          display: "grid",
          gridGap: "8px",
          gridTemplateColumns: "repeat(auto-fill, 68px)",
        }}
      >
        <SortableContext items={images??[]} strategy={rectSortingStrategy}>
          {images?.map(({id, url}:{id: string, url: string}, index: number) => (
            <SortableItem key={id+index} id={id} handle={true} value={url!} index={index} />
          ))}
          <DragOverlay>
            {activeId ? (
              <SortableItem
                key={activeId}
                id={activeId}
                handle={true}
                value={activeId}
                isDraggingItem={true}
              />
            ) : null}
          </DragOverlay>
          <div className={styles.imageThumbnail} onClick={handleAddImage}>
            <Image src={iconPlus} alt="iconPlus" width={18} height={18} />
          </div>
        </SortableContext>
      </div>
    </DndContext>
  );
}

function SortableItem(props: {id: string, value: string, handle: boolean, isDraggingItem?: boolean, index?: number}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: props.id });
  const selectedBlockId = useAppSelector(
    (state) => state.blockData.present.selectedBlockId
  );
  const blockStyle = useAppSelector(
    (state) =>
      state.blockData.present.blocks.find(
        (block) => block.id === state.blockData.present.selectedBlockId
      )?.style
  );

  const dispatch = useDispatch();

  const style = {
    cursor: "grab",
    transform: CSS.Transform.toString(transform),
    transition,
    width: "68px",
    height: "68px",
    backgroundColor: "#cccccc",
    border:
      isDragging || props.isDraggingItem ? "2px solid var(--color-success)" : "",
    zIndex: isDragging ? "100" : "auto",
    opacity: isDragging ? 0.3 : 1,
    filter: isDragging
      ? "invert(44%) sepia(85%) saturate(2067%) hue-rotate(196deg) brightness(100%) contrast(96%)"
      : "none",
  };

  const handleChangeImage = (e: any) => {
    alert("change image");
  };

  const handleRemoveImage = (e: any,) => {

    dispatch(changeStyle({
      id: selectedBlockId,
      style: {
        ...blockStyle,
        images: blockStyle.images.filter((_:any, index: number) => index !== props.index)
      }
    }))
    
  };

  return (
    <>
      <div
        ref={setNodeRef}
        className={styles.imageThumbnail}
        style={style}
        {...listeners}
        {...attributes}
      >
        <ImageHover
          isActive={props.isDraggingItem}
          handleChange={handleChangeImage}
          handleRemove={handleRemoveImage}
        />
        <Image className={styles.image} width={68} height={68} src={props.value} alt="sampleImage" />
      </div>
    </>
  );
}
