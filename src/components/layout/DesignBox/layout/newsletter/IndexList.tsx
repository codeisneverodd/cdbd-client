import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import { ButtonSecondary } from "@/components/buttons/Buttons";
import styles from "../../styles.module.scss";

import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import sampleImage from "/public/images/sample-image.jpg";
import iconPlus from "/public/images/icon-plus.svg";
import iconGroup from "/public/images/icon-block-layout.svg";
import iconStar from "/public/images/icon-block-star.svg";
import iconQna from "/public/images/icon-block-qna.svg";
import iconInquiry from "/public/images/icon-block-inquiry.svg";
import iconSns from "/public/images/icon-block-sns.svg";

import Image, { StaticImageData } from "next/image";
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
  Stack,
  TextField,
  Select,
  MenuItem,
  SelectChangeEvent,
} from "@mui/material";

import iconMovable from "/public/images/icon-movable.svg";
import iconMore from "/public/images/icon-more.svg";
import { CSS } from "@dnd-kit/utilities";

export default function IndexList() {
  return (
    <ul className={styles.body}>
      <li className={`${styles.sectionItem} ${styles.questionItem}`}>
        <ButtonSecondary
          style={{ width: "100%" }}
          startIcon={
            <Image src={iconPlus} alt="iconPlus" width={14} height={14} />
          }
        >
          목차 추가
        </ButtonSecondary>

        <div className={styles.indexList}>
          <IndexListDnd />
        </div>
      </li>
    </ul>
  );
}

type IndexListItem = {
  index: number;
  id: string;
  title: string;
  link: string;
  edit: boolean;
  active: boolean;
};

const sampleListData: IndexListItem[] = [
  {
    index: 0,
    id: "0",
    title: "1. CdBd 브랜드 스토리",
    link: "",
    edit: true,
    active: true,
  },
  {
    index: 1,
    id: "1",
    title: "2. CdBd 서비스 소개",
    link: "",
    edit: false,
    active: false,
  },
  {
    index: 2,
    id: "2",
    title: "3. 영상으로 보는 CdBd 페이지 안내",
    link: "",
    edit: false,
    active: false,
  },
  {
    index: 3,
    id: "3",
    title: "4. CdBd 브랜드 북 다운로드",
    link: "",
    edit: false,
    active: false,
  },

];


function IndexListDnd() {
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
              link={item.link}
              edit={item.edit}
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
                link={
                  items[items.findIndex((item) => item.id === activeId)].link
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

  const [select, setSelect] = React.useState<string>("");

  const handleSelectChange = (event: SelectChangeEvent<string>) => {
    const {
      target: { value },
    } = event;
    setSelect(value);
  };
  return (
    <>
      <div
        ref={setNodeRef}
        className={
          props.active
            ? `${styles.indexListDndItem} ${styles.active}`
            : isDragging
            ? `${styles.indexListDndItem} ${styles.dragging}`
            : props.disabled
            ? `${styles.indexListDndItem} ${styles.disabled}`
            : `${styles.indexListDndItem}`
        }
        style={style}
      >
        <div className={styles.dndHead}>
          <div className={styles.left}>
            <div className={styles.grabIcon}>
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
            </div>
          </div>
          <div className={styles.center}>
            <span
              className={
                props.active
                  ? `${styles.title} ${styles.active}`
                  : `${styles.title}`
              }
              suppressContentEditableWarning={true}
            >
              {props.title}
            </span>
            <TextField
              color="secondary"
              select
              SelectProps={{
                IconComponent: KeyboardArrowDownIcon,
              }}
              sx={{
                "& .MuiSvgIcon-root": {
                  fontSize: "18px",
                  color: "var(--color-grey-800)",
                },
                "& .MuiSelect-select": {
                  display: "flex",
                  height: "100%",
                  alignItems: "center"
                },
                "& .MuiSelect-select span::before": {
                  content: "'연결할 카드를 선택해 주세요.'",
                  color: "var(--color-grey-300)",
                },
              }}
            >
              <MenuItem value="empty">
                  <p>(연결 안함)</p>
              </MenuItem>
              <MenuItem value="cover">
                <Stack direction="row" gap="8px" alignItems="center">
                  <Image
                    src={iconStar}
                    alt="iconStar"
                    width={16}
                    height={16}
                  />
                  <p>표지</p>
                </Stack>
              </MenuItem>
              <MenuItem value="text">
                <Stack direction="row" gap="8px" alignItems="center">
                  <Image
                    src={iconGroup}
                    alt="iconGroup"
                    width={16}
                    height={16}
                  />
                  <p>텍스트형</p>
                </Stack>
              </MenuItem>
              <MenuItem value="image">
                <Stack direction="row" gap="8px" alignItems="center">
                  <Image
                    src={iconGroup}
                    alt="iconGroup"
                    width={16}
                    height={16}
                  />
                  <p>이미지형</p>
                </Stack>
              </MenuItem>
              <MenuItem value="video">
                <Stack direction="row" gap="8px" alignItems="center">
                  <Image
                    src={iconGroup}
                    alt="iconGroup"
                    width={16}
                    height={16}
                  />
                  <p>비디오형</p>
                </Stack>
              </MenuItem>
              <MenuItem value="qna">
                <Stack direction="row" gap="8px" alignItems="center">
                  <Image
                    src={iconQna}
                    alt="iconQna"
                    width={16}
                    height={16}
                  />
                  <p>의견 받기</p>
                </Stack>
              </MenuItem>
              <MenuItem value="contact">
                <Stack direction="row" gap="8px" alignItems="center">
                  <Image
                    src={iconInquiry}
                    alt="iconInquiry"
                    width={16}
                    height={16}
                  />
                  <p>발행인 연락처</p>
                </Stack>
              </MenuItem>
              <MenuItem value="sns">
                <Stack direction="row" gap="8px" alignItems="center">
                  <Image
                    src={iconSns}
                    alt="iconSns"
                    width={16}
                    height={16}
                  />
                  <p>추가 채널 안내</p>
                </Stack>
              </MenuItem>
            </TextField>
          </div>

          <div className={styles.right}>
            <IconButton onClick={handleMoreIconClick}>
              <Image src={iconMore} alt="iconMore" width={5} height={16} />
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
        <ListItemButton sx={listButtonStyle}>목차 복제하기</ListItemButton>
      </ListItem>
      <ListItem disablePadding>
        <ListItemButton sx={listButtonStyle}>목차 삭제하기</ListItemButton>
      </ListItem>
    </List>
  </Popover>
);
