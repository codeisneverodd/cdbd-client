import { Alert, Snackbar } from '@mui/material'
import Image from 'next/image';
import React, { Dispatch, SetStateAction } from 'react'
import iconSuccess from "/public/images/icon-toast-success.svg";
import iconError from "/public/images/icon-toast-error.svg";
import iconWarning from "/public/images/icon-toast-warning.svg";


export const Toast = ({
  open,
  setOpen,
  type = "SUCCESS",
  message,
}: {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  type: "SUCCESS" | "ERROR" | "WARNING";
  message: string;
}) => {

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  return (
    <Snackbar
      open={open}
      onClose={handleClose}
      autoHideDuration={6000}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
    >
      <div
        className={
          type === "SUCCESS"
            ? "toast success"
            : type === "ERROR"
            ? "toast error"
            : type === "WARNING"
            ? "toast warning"
            : "toast"
        }
      >
        <Image src={type === "ERROR"
            ? iconError :type === "WARNING"
            ? iconWarning : iconSuccess} alt="toast icon" width={18} height={18}/>
        <span className='h5'>{message}</span>
      </div>
    </Snackbar>
  );
};
