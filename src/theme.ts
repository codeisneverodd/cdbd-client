'use client';
import { createTheme } from '@mui/material/styles';
import "./styles/variables.css";
import localFont from "next/font/local";

const pretendard = localFont({src: '../public/fonts/PretendardVariable.woff2'});

export const theme = createTheme({
  palette: {
    primary: {
      main: "#6C4CFF",
    },
    secondary: {
      main: "#368BF9",
    },
    info: {
      main: "#B3B6B8",
    },
    error: {
      main: "#FC2C19",
    },
  },
  components: {
    MuiFormHelperText: {
      styleOverrides: {
        root: {
          fontSize: "12px",
          fontWeight: "500",
          lineHeight: "150%",
          letterSpacing: "-0.24px"
        }
      }
    },
    MuiTabs: {
      styleOverrides: {
        root: {
          "& .MuiTabs-scrollButtons.Mui-disabled" : {
            opacity: "0.3",
          }
        }
      }
    },
    MuiStack: {
      styleOverrides: {
        root: {
          width: "100%",
        },
      },
    },
    MuiTooltip: {
      styleOverrides: {
        arrow: {
          "&:before": {
            border: "1px solid var(--color-success-medium)",
          },
          fontSize: "18px",
          color: "var(--color-success-pale)",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          fontSize: 14,
          fontWeight: 500,
          lineHeight: 1,
          padding: "12px 24px",
          borderRadius: "8px",
          textTransform: "none",
          "&.MuiButton-outlinedInfo": {
            color: "var(--color-grey-800)",
          },
          "&.Mui-disabled": {
            color: "#fff",
            backgroundColor: "var(--color-primary-pale)",
          },
          
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          height: 34,
          borderRadius: "8px !important",
          backgroundColor: "var(--color-grey-50)",
          borderColor: "var(--color-grey-50)",
          "& .MuiInputBase-input": {
            paddingTop: 0,
            paddingBottom: 0,
            height: 34,
          },
          "& .MuiInputBase-root:focus": {
            width: "max-content",
            padding: "0 8px 0 16px",
          },
          "& fieldset": {
            borderColor: "var(--color-grey-50)",
            transition: "border-color .2s",
          },
          "&:hover fieldset": {
            borderColor: "var(--color-information) !important",
          },
          "&.Mui-focused input": {
            backgroundColor: "var(--color-white) !important",
            transition: "border-color .2s",
          },
          "&.Mui-focused ": {
            backgroundColor: "var(--color-white) !important",
          },
          "&.Mui-focused fieldset": {
            borderWidth: "1px !important",
          },
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          borderRadius: "8px",
        },
      },
    },
    MuiButtonGroup: {
      styleOverrides: {
        root: {
          borderRadius: "8px",
          borderColor: "var(--color-grey-200)",
          "& .MuiButtonBase-root": {
            padding: 0,
          },
          "& .MuiButtonGroup-grouped": {
            minWidth: 34,
          },
        },
      },
    },
    MuiToggleButton: {
      styleOverrides: {
        root: {
          borderLeftColor: "inherit",
          padding: "6px",
          borderRadius: "8px",
          borderColor: "var(--color-grey-200)",
          "&:hover": {
            borderColor: "var(--color-success) !important",
            color: "var(--color-success)",
            backgroundColor: "var(--color-success-light)",
            zIndex: 2,
            "& img,span": {
              filter:
                "invert(44%) sepia(85%) saturate(2067%) hue-rotate(196deg) brightness(100%) contrast(96%)",
            },
          },
          "&.Mui-selected:hover": {
            borderColor: "var(--color-success) !important",
            color: "var(--color-success) !important",
            backgroundColor: "var(--color-success-light)",
            zIndex: 2,
            "& img,span": {
              filter:
                "invert(44%) sepia(85%) saturate(2067%) hue-rotate(196deg) brightness(100%) contrast(96%)",
            },
          },
          "&.Mui-selected": {
            borderColor: "var(--color-success) !important",
            color: "var(--color-success) !important",
            backgroundColor: "var(--color-success-light)",
            zIndex: 2,
            "& img,span": {
              filter:
                "invert(44%) sepia(85%) saturate(2067%) hue-rotate(196deg) brightness(100%) contrast(96%)",
            },
          },
        },
      },
    },
    MuiToggleButtonGroup: {
      styleOverrides: {
        root: {
          height: 34,
        },
      },
    },
    MuiList: {
      styleOverrides: {
        root: {
          padding: "4px 0 !important",
          backgroundColor: "var(--color-success-pale)",
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          "&.Mui-selected": {
            backgroundColor: "var(--color-success-light) !important",
          },
          "&.Mui-selected:hover": {
            backgroundColor: "var(--color-success-light)",
          },
          "&:hover": {
            backgroundColor: "var(--color-success-light)",
          },
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        root: {
          "& .MuiSelect-select": {
            lineHeight: "34px",
          },
          "& .MuiSvgIcon-root": {
            fontSize: 18,
            color: "var(--color-grey-800)",
          },
        },
      },
    },
    MuiCheckbox: {
      styleOverrides: {
        root: {
          paddingRight: "4px",
          "&.Mui-checked .MuiSvgIcon-root": {
            color: "var(--primary)",
          },
          "& .MuiSvgIcon-root": {
            color: "var(--color-grey-300)",
          },
        },
      },
    },
    MuiFormControlLabel: {
      styleOverrides: {
        root: {
          marginRight: 0,
        },
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          borderColor: "var(--color-grey-50)",
        },
      },
    },
    MuiSlider: {
      styleOverrides: {
        root: {
          "& .MuiSlider-mark": {
            backgroundColor: "var(--color-grey-200)",
          },
          "& .MuiSlider-mark[data-index='0']": {
            backgroundColor: "transparent",
          },
          "& .MuiSlider-markActive": {
            backgroundColor: "var(--color-information)",
          },
          "& .MuiSlider-rail": {
            backgroundColor: "var(--color-grey-50)",
          },
        },
      },
    },
  },
  typography: {
    fontFamily: pretendard.style.fontFamily,
    button: {
      textTransform: "none",
    },
  },
});

export default theme;