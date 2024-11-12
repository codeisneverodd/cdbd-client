"use client";
import { LoadingButton, LoadingButtonTypeMap } from "@mui/lab";
// import { FormEventHandler } from "react";
import { useFormStatus } from "react-dom";

type Props = LoadingButtonTypeMap["props"] & {
  fullWidth?: boolean;
  type?: "submit" | "button" | "reset" | undefined;
  className?: string;
};

export default function LoadingFormButton({
  variant,
  type,
  children,
  ...otherProps
}: Props) {
  const { pending } = useFormStatus();
  return (
    <LoadingButton
      loading={pending}
      variant={variant}
      type={type}
      {...otherProps}
    >
      {children}
    </LoadingButton>
  );
}
