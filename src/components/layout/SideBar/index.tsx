"use client";
import styles from "./styles.module.scss";

import {
  IconButton,
  List,
  ListItem,
  ListItemButton,
  Popover,
} from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import React from "react";

import { supaBrowserClient } from "@/lib/supabase/createBrowserClient";
import { User } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";
import iconHelp from "/public/images/icon-help.svg";
import iconUser from "/public/images/icon-user.svg";
import logo from "/public/images/logo-symbol.svg";

const iconButtonStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: 32,
  height: 32,
  borderRadius: "8px",
  "&:hover": {
    backgroundColor: "var(--color-grey-800)",
  },
};

export default function Sidebar({ user }: { user: User | null }) {
  const router = useRouter();
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );

  const handleUserIconClick = async (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    if (!user) {
      alert("비로그인 모달이 구현되지 않았습니다. 로그인 페이지로 이동합니다.");
      return router.push("/sign-in");
    }
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const popoverProps = {
    id: id,
    open,
    anchorEl,
    handleClose: handlePopoverClose,
  };

  return (
    <aside className={styles.sidebar}>
      <div className={styles.logo}>
        <Link href="/">
          <Image src={logo} alt="logo" />
        </Link>
      </div>
      <div className={styles.bottom}>
        <IconButton onClick={handleUserIconClick} sx={iconButtonStyle}>
          <Image src={iconUser} alt="user" width={24} height={24} />
        </IconButton>
        <IconButton href="/help" sx={iconButtonStyle}>
          <Image src={iconHelp} alt="help" width={24} height={24} />
        </IconButton>
      </div>
      <CustomPopover {...popoverProps} />
    </aside>
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
  const supabase = supaBrowserClient();
  const router = useRouter();

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      alert("로그아웃에 실패했습니다.");
    }
    return router.push("/sign-in");
  };

  return (
    <Popover
      id={id}
      open={open}
      anchorEl={anchorEl}
      onClose={handleClose}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      transformOrigin={{
        vertical: "center",
        horizontal: "left",
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
          <ListItemButton sx={listButtonStyle}>계정 정보</ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton sx={listButtonStyle}>대시보드</ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton sx={listButtonStyle}>페이지 분석</ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton sx={listButtonStyle} onClick={handleLogout}>
            로그아웃
          </ListItemButton>
        </ListItem>
      </List>
    </Popover>
  );
};
