import { Button, IconButton } from "@mui/material";
import React, { ComponentProps } from "react";

const ButtonPrimary = (props: any) => (
  <Button
    variant="contained"
    sx={{
      "&:hover": {
        backgroundColor: "var(--color-primary-shadow)",
      },
      boxShadow: "2px 2px 2px rgba(108, 76, 255, .3)",
    }}
    {...props}
  />
);
ButtonPrimary.muiName = "Button";

const ButtonPrimaryBlack = (props: any) => (
  <Button
    variant="contained"
    sx={{
      backgroundColor: "var(--color-black)",
      "&:hover": {
        backgroundColor: "var(--color-grey-900)",
      },
      boxShadow: "none",
    }}
    {...props}
  />
);
ButtonPrimaryBlack.muiName = "Button";

const ButtonSecondary = (props: any) => (
  <Button
    variant="outlined"
    sx={{
      width: "max-content",
      height: 34,
      padding: "0 16px",
      fontWeight: 600,
      lineHeight: 1.5,
      color: "var(--color-grey-800)",
      letterSpacing: "-0.28px",
      borderColor: "var(--color-grey-200)",
      backgroundColor: "var(--color-white)",
      "&:hover": {
        borderColor: "var(--color-grey-200)",
        backgroundColor: "var(--color-grey-50)",
      },
    }}
    {...props}
  />
);
ButtonSecondary.muiName = "Button";

const IconButtonPrimary = (props: ComponentProps<typeof IconButton>) => (
  <IconButton
    sx={{
      width: 38,
      height: 38,
      padding: 0,
      backgroundColor: "var(--color-primary-pale)",
      borderRadius: "8px",
      border: "1.5px solid var(--color-primary)",
      boxShadow: "2px 2px 2px rgba(108, 76, 255, .3)",
      "&:disabled": {
        backgroundColor: "var(--color-primary-pale)",
        borderColor: "var(--color-primary-light)",
      },
      "&:disabled img": {
        opacity: 0.4,
      },
      "&:hover": {
        backgroundColor: "var(--color-primary-light)",
        borderColor: "var(--color-primary-shadow)",
      },
    }}
    {...props}
  />
);
IconButtonPrimary.muiName = "Button";

export {
  ButtonPrimary,
  ButtonSecondary,
  ButtonPrimaryBlack,
  IconButtonPrimary,
};
