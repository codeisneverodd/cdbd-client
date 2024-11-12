import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import { ButtonSecondary } from "@/components/buttons/Buttons";
import styles from "../../styles.module.scss";

import sampleImage from "/public/images/sample-image.jpg";
import iconPlus from "/public/images/icon-plus.svg";
import iconLink from "/public/images/icon-link-white.svg";
import iconEdit from "/public/images/icon-edit-blue.svg";
import iconImage from "/public/images/icon-image.svg";

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
} from "@mui/material";

import iconMovable from "/public/images/icon-movable.svg";
import iconMore from "/public/images/icon-more.svg";
import { CSS } from "@dnd-kit/utilities";

export default function ProductList() {
  return (
    <ul className={styles.body}>
      <li className={`${styles.sectionItem} ${styles.questionItem}`}>
        <Stack>
          <div className="subtitle2">상품 추가하기</div>
        </Stack>
        <Stack sx={{gap:"12px", backgroundColor: "var(--color-information-pale)", borderRadius: "8px", padding: "16px"}}>
          <div className="h5">URL 연결</div>
          <div className="p2" style={{marginBottom: "4px"}}>
          상품 상세페이지의 URL을 연결하면 상품 정보가 자동으로 채워져요.
          </div>
          <Button
            variant="contained"
            color="secondary"
            startIcon={
              <Image src={iconLink} alt="iconLink" width={18} height={18} />
            }
            sx={{ boxShadow: "none" }}
          >
            URL 연결
          </Button>
        </Stack>
        <Stack sx={{gap:"12px", backgroundColor: "var(--color-information-pale)", borderRadius: "8px", padding: "16px"}}>
          <div className="h5">직접 입력</div>
          <div className="p2" style={{marginBottom: "4px"}}>
          상세페이지가 없어도 괜찮아요. 상품 정보를 직접 입력할 수 있어요.
          </div>
          <Button
            variant="outlined"
            color="secondary"
            startIcon={
              <Image src={iconEdit} alt="iconEdit" width={18} height={18} />
            }
            sx={{ boxShadow: "none", backgroundColor: "#fff" }}
          >
            직접 입력
          </Button>
        </Stack>
      </li>
      <li className={`${styles.sectionItem} ${styles.questionItem}`}>
        <ButtonSecondary
          style={{ width: "100%" }}
          startIcon={
            <Image src={iconPlus} alt="iconPlus" width={14} height={14} />
          }
        >
          상품 추가
        </ButtonSecondary>

        <div className={styles.selectType}>
        <Button
            variant="contained"
            color="secondary"
            startIcon={
              <Image src={iconLink} alt="iconLink" width={18} height={18} />
            }
            sx={{ boxShadow: "none", padding: "12px" }}
          >
            URL 연결
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            startIcon={
              <Image src={iconEdit} alt="iconEdit" width={18} height={18} />
            }
            sx={{ boxShadow: "none", backgroundColor: "#fff", padding: "12px" }}
          >
            직접 입력
          </Button>
        </div>

        <div className={styles.productList}>
          <ProductListDnd />
        </div>
      </li>
    </ul>
  );
}

type ProductListItem = {
  index: number;
  id: string;
  title: string;
  link: string;
  thumbnail?: string | StaticImageData | null;
  edit: boolean;
  active: boolean;
};

const sampleListData: ProductListItem[] = [
  {
    index: 0,
    id: "0",
    title: "[상품명]",
    link: "버튼 URL 없음",
    thumbnail: null,
    edit: false,
    active: false,
  },
  {
    index: 1,
    id: "1",
    title: "테스트 상품명",
    link: "https://www.abc.abc",
    thumbnail: null,
    edit: true,
    active: false,
  },
  {
    index: 2,
    id: "2",
    title: "KITTYCAT 피그먼트 반팔티 DUSTY PINK",
    link: "https://www.shopping.mall/product-detail",
    thumbnail: sampleImage,
    edit: false,
    active: true,
  },
  {
    index: 3,
    id: "3",
    title: "KITTYCAT 피그먼트 반팔티 DUSTY PINK",
    link: "https://www.shopping.mall/product-detail",
    thumbnail: null,
    edit: false,
    active: false,
  },
  {
    index: 4,
    id: "4",
    title: "",
    link: "",
    thumbnail: null,
    edit: true,
    active: false,
  },
];


function ProductListDnd() {
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
              thumbnail={item.thumbnail}
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
                thumbnail={
                  items[items.findIndex((item) => item.id === activeId)].thumbnail
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

  return (
    <>
      <div
        ref={setNodeRef}
        className={
          props.active
            ? `${styles.productListDndItem} ${styles.active}`
            : isDragging
            ? `${styles.productListDndItem} ${styles.dragging}`
            : props.disabled
            ? `${styles.productListDndItem} ${styles.disabled}`
            : `${styles.productListDndItem}`
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
            {/* NOTE: if title not loaded, hide thumbnail */}
            {props.title.length > 0 && props.title !== null && (
              <div className={props.active ? `${styles.thumbnail} ${styles.active}` : `${styles.thumbnail}`}>
                {props.thumbnail !== null ? (
                  <Image className={styles.image} src={props.thumbnail} alt="thumbnail" />
                ) : (
                  <Image className={styles.default} src={iconImage} alt="thumbnail" width={16} height={16} />
                )}
              </div>
            )}
          </div>
          <div
            className={
              props.title.length === 0 || props.title === null
                ? `${styles.center} ${styles.unsetMaxWidth}`
                : `${styles.center}`
            }
          >
            <span
              className={props.active ? `${styles.title} ${styles.active}` : `${styles.title}`}
              suppressContentEditableWarning={true}
            >
              {props.title}
            </span>
            {props.edit ? (
              <TextField color="secondary" size="small" value={props.link} placeholder="상품 상세페이지 URL" />
            ) : (
              <span className={`caption ${styles.link}`}>{props.link}</span>
            )}
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
        <ListItemButton sx={listButtonStyle}>상품 복제하기</ListItemButton>
      </ListItem>
      <ListItem disablePadding>
        <ListItemButton sx={listButtonStyle}>상품 삭제하기</ListItemButton>
      </ListItem>
      <ListItem disablePadding>
        <ListItemButton sx={listButtonStyle}>URL 편집하기</ListItemButton>
      </ListItem>
    </List>
  </Popover>
);
