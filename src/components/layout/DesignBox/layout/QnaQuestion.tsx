import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import { ButtonSecondary } from "@/components/buttons/Buttons";
import styles from "../styles.module.scss";

import iconPlus from "/public/images/icon-plus.svg";
import iconCheck from "/public/images/icon-check_small.svg";
import iconDelete from "/public/images/icon-delete-grey.svg";
import iconCopy from "/public/images/icon-copy.svg";

import iconAnswer from "/public/images/icon-answer.svg";
import Image from "next/image";
import { SwitchSecondary } from "@/components/buttons/Switches";
import {
  UniqueIdentifier,
  useSensors,
  useSensor,
  PointerSensor,
  KeyboardSensor,
  DragStartEvent,
  DragEndEvent,
  DndContext,
  closestCenter,
  DragOverlay,
} from "@dnd-kit/core";
import {
  sortableKeyboardCoordinates,
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";
import {
  IconButton,
  Popover,
  List,
  ListItem,
  ListItemButton,
  FormControlLabel,
  Button,
  Checkbox,
} from "@mui/material";

import iconMovable from "/public/images/icon-movable.svg";
import iconMore from "/public/images/icon-more.svg";
import { CSS } from "@dnd-kit/utilities";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { changeStyle } from "@/redux/features/BlockData/blockDataSlice";


export default function QnaQuestion() {
  const dispatch = useAppDispatch();
  const selectedBlockId = useAppSelector(
    (state) => state.blockData.present.selectedBlockId
  );
  const selectedBlockStyle = useAppSelector((state) =>
    state.blockData.present.blocks.find(
      (block) => block.id === state.blockData.present.selectedBlockId
    )
  )?.style;

  const handleQnAType = (type: "checkbox"|"subjective") => {
    dispatch(changeStyle({ id: selectedBlockId, style: { ...selectedBlockStyle, type } }));
  };
  return (
    <ul className={styles.body}>
      <li className={`${styles.sectionItem} ${styles.questionItem}`}>
        <ButtonSecondary
          style={{ width: "100%" }}
          startIcon={
            <Image src={iconPlus} alt="iconPlus" width={14} height={14} />
          }
        >
          질문 추가
        </ButtonSecondary>

        <div className={styles.selectType}>
          <Button
            variant="outlined"
            color="secondary"
            startIcon={
              <Image src={iconCheck} alt="iconCheck" width={18} height={18} />
            }
            sx={{ backgroundColor: "#fff" }}
            onClick={()=>handleQnAType("checkbox")}
          >
            객관식
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            startIcon={
              <Image src={iconAnswer} alt="iconAnswer" width={18} height={18} />
            }
            sx={{ backgroundColor: "#fff" }}
            onClick={()=>handleQnAType("subjective")}
          >
            주관식
          </Button>
        </div>

        <div className={styles.questionList}>
          <QuestionListDnd />
        </div>
      </li>
    </ul>
  );
}

type QuestionListItem = {
  index: number;
  id: string;
  title: string;
  active: boolean;
};

type OptionListItem = {
  index: number;
  id: string;
  title: string;
};

const sampleListData: QuestionListItem[] = [
  {
    index: 0,
    id: "0",
    title: "예시: 아래 2가지 중 선택하세요",
    active: false,
  },
  {
    index: 1,
    id: "1",
    title: "예시: 아래 2가지 중 선택하세요",
    active: true,
  },
  {
    index: 2,
    id: "2",
    title: "예시: 아래 2가지 중 선택하세요",
    active: false,
  },
];

const sampleOptionData: OptionListItem[] = [
  {
    index: 0,
    id: "0",
    title: "option1",
  },
  {
    index: 1,
    id: "1",
    title: "option2",
  },
  {
    index: 2,
    id: "2",
    title: "option3",
  },
];

function QuestionListDnd() {
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
    borderRadius: "8px",
    overflow: "hidden",
    border:
      props.active || props.isDraggingItem
        ? "1px solid var(--color-success)"
        : "1px solid var(--color-grey-200)",
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? "100" : "auto",
    opacity: isDragging ? 0.3 : 1,
    filter: isDragging
      ? "invert(44%) sepia(85%) saturate(2067%) hue-rotate(196deg) brightness(100%) contrast(96%)"
      : "none",
  };

  // control popover (... more button)
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );

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

  const [selectMultiple, setSelectMultiple] = useState<boolean>(false);

  const handleSwitchToggle = (
    state: boolean,
    setState: Dispatch<SetStateAction<boolean>>
  ) => {
    setState(!state);
  };

  const dispatch = useAppDispatch();
  const selectedBlockId = useAppSelector(
    (state) => state.blockData.present.selectedBlockId
  );
  const selectedBlockStyle = useAppSelector((state) =>
    state.blockData.present.blocks.find(
      (block) => block.id === state.blockData.present.selectedBlockId
    )
  )?.style;

  const handleAddingOption = (type: "checkbox"|"subjective") => {
    // dispatch(changeData({ id: selectedBlockId, style: { ...selectedBlockStyle, type } }));
  };

  return (
    <>
      <div
        ref={setNodeRef}
        className={
          props.active
            ? `${styles.questionListDndItem} ${styles.active}`
            : isDragging
            ? `${styles.questionListDndItem} ${styles.dragging}`
            : props.disabled
            ? `${styles.questionListDndItem} ${styles.disabled}`
            : `${styles.questionListDndItem}`
        }
        style={style}
      >
        <div className={styles.dndHead}>
          <div className={styles.left}>
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
            <span
              className={styles.title}
              suppressContentEditableWarning={true}
            >
              {props.title}
            </span>
          </div>
          <div className={styles.right}>
            <IconButton onClick={handleMoreIconClick}>
              <Image src={iconMore} alt="iconMore" width={5} height={16} />
            </IconButton>
          </div>
        </div>
        {props.active && (
          <div className={styles.dndBody}>
            <OptionlistDnd />

            <ButtonSecondary
              style={{ width: "100%" }}
              startIcon={
                <Image src={iconPlus} alt="iconPlus" width={14} height={14} />
              }
              onClick={handleAddingOption}
            >
              옵션 추가
            </ButtonSecondary>
            <FormControlLabel
              sx={{ marginLeft: 0, height: "18px" }}
              control={<SwitchSecondary />}
              value={selectMultiple}
              onChange={() =>
                handleSwitchToggle(selectMultiple, setSelectMultiple)
              }
              label={
                <span
                  className="caption"
                  style={{
                    marginLeft: "8px",
                    color: selectMultiple
                      ? "var(--color-grey-800)"
                      : "var(--color-grey-400)",
                  }}
                >
                  복수 선택
                </span>
              }
            />
          </div>
        )}
      </div>

      <CustomPopover {...popoverProps} />
    </>
  );
}

function OptionlistDnd() {
  const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null);
  const [items, setItems] = useState(sampleOptionData);
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
        }}
      >
        <SortableContext items={items} strategy={verticalListSortingStrategy}>
          {items.map((item) => (
            <OptionItem
              key={item.id}
              id={item.id}
              handle={true}
              value={item.id}
              title={item.title}
            />
          ))}
          <DragOverlay>
            {activeId ? (
              <OptionItem
                key={activeId}
                id={activeId}
                handle={true}
                value={activeId}
                isDraggingItem={true}
                title={
                  items[items.findIndex((item) => item.id === activeId)].title
                }
              />
            ) : null}
          </DragOverlay>
        </SortableContext>
      </div>
    </DndContext>
  );
}

function OptionItem(props: any) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: props.id });

  const style = {
    borderRadius: "8px",
    overflow: "hidden",
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? "100" : "auto",
    opacity: isDragging ? 0 : 1,
    filter: "none",
  };

  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );

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
        ref={setNodeRef}
        className={
          props.active
            ? `${styles.questionListDndItem} ${styles.active}`
            : isDragging || props.isDraggingItem
            ? `${styles.questionListDndItem} ${styles.dragging}`
            : props.disabled
            ? `${styles.questionListDndItem} ${styles.disabled}`
            : `${styles.questionListDndItem}`
        }
        style={style}
      >
        <div className={`${styles.dndHead} ${styles.option}`}>
          <div className={styles.left}>
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
            <FormControlLabel
              control={
                <Checkbox
                  checked={false}
                  size="small"
                  color="secondary"
                  sx={{ height: "18px", padding: "6px", marginLeft: "4px" }}
                />
              }
              label={props.title}
            />
          </div>
          <div className={styles.right}>
            <IconButton sx={{ width: "20px", height: "20px" }}>
              <Image src={iconCopy} alt="iconCopy" width={14} />
            </IconButton>
            <IconButton sx={{ width: "20px", height: "20px" }}>
              <Image
                src={iconDelete}
                alt="iconDelete"
                width={14}
                style={{ marginTop: "-2px" }}
              />
            </IconButton>
          </div>
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
        <ListItemButton sx={listButtonStyle}>질문 복제하기</ListItemButton>
      </ListItem>
      <ListItem disablePadding>
        <ListItemButton sx={listButtonStyle}>질문 삭제하기</ListItemButton>
      </ListItem>
    </List>
  </Popover>
);
