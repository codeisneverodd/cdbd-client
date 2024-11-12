import styles from "../styles.module.scss";
import React from "react";
import Image from "next/image";

import {
  Checkbox,
  Divider,
  FormControlLabel,
  List,
  ListItem,
  ListItemButton,
  Popover,
  Stack,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";

import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { changeStyle } from "@/redux/features/BlockData/blockDataSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";

export default function SectionItemRatio() {
  const dispatch = useAppDispatch();
  const selectedBlockId = useAppSelector((state) => state.blockData.present.selectedBlockId);
  const selectedBlockStyle = useAppSelector((state) => state.blockData.present.blocks.find((block) => block.id === selectedBlockId)?.style);
  // const [ratio, setRatio] = React.useState("origin");
  

  const handleAlignment = (
    event: React.MouseEvent<HTMLElement>,
    newRatio: string
  ) => {
    if (newRatio !== null) {
      dispatch(changeStyle({
        id: selectedBlockId,
        style: {
          ...selectedBlockStyle,
          aspectRatio: newRatio,
        },
      }));
      // setRatio(newRatio);
    }
  };

  // control popover (... more button)
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );

  const handleCustomClick = (event: any) => {
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
    <Stack direction="row">
      <div className={styles.sectionItemTitle}>비율</div>
      <Stack direction="row" gap="8px" width="100%">
        <ToggleButtonGroup
          value={selectedBlockStyle?.aspectRatio}
          exclusive
          onChange={handleAlignment}
          aria-label="text alignment"
          fullWidth
        >
          <ToggleButton value="unset" aria-label="origin">
            <span
              className="subtitle2"
              style={{ color: "var(--color-grey-500)" }}
            >
              원본
            </span>
          </ToggleButton>
          <ToggleButton value="1/1" aria-label="1/1">
            <span
              className="subtitle2"
              style={{ color: "var(--color-grey-500)" }}
            >
              1:1
            </span>
          </ToggleButton>
          <ToggleButton value="3/4" aria-label="3/4">
            <span
              className="subtitle2"
              style={{ color: "var(--color-grey-500)" }}
            >
              3:4
            </span>
          </ToggleButton>
          <ToggleButton
            value="custom"
            aria-label="custom"
            onClick={handleCustomClick}
          >
            {selectedBlockStyle?.aspectRatio === "custom" ? <>16:9 <KeyboardArrowDownIcon /></> : <KeyboardArrowDownIcon />}
          </ToggleButton>
        </ToggleButtonGroup>
      </Stack>

      <CustomPopover {...popoverProps} />
    </Stack>
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

const CustomPopover = ({ id, anchorEl, handleClose, open }: PopoverProps) => {
  const dispatch = useAppDispatch();
  const selectedBlockId = useAppSelector((state) => state.blockData.present.selectedBlockId);
  const selectedBlockStyle = useAppSelector((state) => state.blockData.present.blocks.find((block) => block.id === selectedBlockId)?.style);

  const handleListItemClick = (newRatio:string) => {
    dispatch(changeStyle({
      id: selectedBlockId,
      style: {
        ...selectedBlockStyle,
        aspectRatio: newRatio,
      },
    }));
    handleClose();
  };

  return (
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
          <ListItemButton sx={listButtonStyle} onClick={()=>handleListItemClick("4/3")}>
            4:3
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton sx={listButtonStyle} onClick={()=>handleListItemClick("9/16")}>
            9:16
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton sx={listButtonStyle} onClick={()=>handleListItemClick("16/9")}>
            16:9
          </ListItemButton>
        </ListItem>
      </List>
    </Popover>
  );
};

export function SectionItemRatioCover() {
  const [ratio, setRatio] = React.useState("origin");

  const handleAlignment = (
    event: React.MouseEvent<HTMLElement>,
    newRatio: string
  ) => {
    if (newRatio !== null) {
      setRatio(newRatio);
    }
  };

  // control popover (... more button)
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );

  const handleCustomClick = (event: any) => {
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
    <Stack direction="row">
      <div className={styles.sectionItemTitle}>비율</div>
      <Stack direction="column" width="100%">
        <ToggleButtonGroup
          value={ratio}
          exclusive
          onChange={handleAlignment}
          aria-label="text alignment"
          fullWidth
        >
          <ToggleButton value="origin" aria-label="origin">
            <span
              className="subtitle2"
              style={{ color: "var(--color-grey-500)" }}
            >
              원본
            </span>
          </ToggleButton>
          <ToggleButton value="1/1" aria-label="1/1">
            <span
              className="subtitle2"
              style={{ color: "var(--color-grey-500)" }}
            >
              1:1
            </span>
          </ToggleButton>
          <ToggleButton value="3/4" aria-label="3/4">
            <span
              className="subtitle2"
              style={{ color: "var(--color-grey-500)" }}
            >
              3:4
            </span>
          </ToggleButton>
          <ToggleButton
            value="custom"
            aria-label="custom"
            onClick={handleCustomClick}
          >
            {ratio === "custom" ? (
              <>
                16:9 <KeyboardArrowDownIcon />
              </>
            ) : (
              <KeyboardArrowDownIcon />
            )}
          </ToggleButton>
        </ToggleButtonGroup>
        <Stack direction="row" gap="8px" mt="12px" alignItems="center">
          <FormControlLabel
            className="caption"
            control={
              <Checkbox
                value={true}
                // onChange={(e) => dispatch(changeStyle({id: selectedBlockId, style: { ...selectedBlockStyle, mute: e.target.checked }}))}
                size="small"
                color="secondary"
                sx={{ height: "18px" }}
              />
            }
            label="배경으로 사용"
          />
        </Stack>
      </Stack>

      <CustomPopover {...popoverProps} />
    </Stack>
  );
}

export function SectionItemRatioLogo() {
  const [ratio, setRatio] = React.useState("origin");

  const handleAlignment = (
    event: React.MouseEvent<HTMLElement>,
    newRatio: string
  ) => {
    if (newRatio !== null) {
      setRatio(newRatio);
    }
  };

  // control popover (... more button)
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );

  const handleCustomClick = (event: any) => {
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
    <Stack direction="row">
      <div className={styles.sectionItemTitle}>비율</div>
      <Stack direction="row" gap="8px" width="100%">
        <ToggleButtonGroup
          value={ratio}
          exclusive
          onChange={handleAlignment}
          aria-label="text alignment"
          fullWidth
        >
          <ToggleButton value="origin" aria-label="origin">
            <span
              className="subtitle2"
              style={{ color: "var(--color-grey-500)" }}
            >
              원본
            </span>
          </ToggleButton>
          <ToggleButton value="1/1" aria-label="1/1">
            <span
              className="subtitle2"
              style={{ color: "var(--color-grey-500)" }}
            >
              1:1
            </span>
          </ToggleButton>
        </ToggleButtonGroup>
      </Stack>
    </Stack>
  );
}
