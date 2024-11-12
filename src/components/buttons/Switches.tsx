"use client";
import { Switch, styled } from "@mui/material";


const commonStyle = {
        padding: 0,
        "& .MuiSwitch-switchBase": {
          padding: 0,
          margin: 2,
          transitionDuration: "300ms",
          top: "1px",
          left: "1px",
          "&.Mui-checked": {
            transform: "translateX(10px)",
            color: "#fff",
            "& + .MuiSwitch-track": {
              backgroundColor: "var(--color-information)",
              opacity: 1,
              border: 0
            },
            "&.Mui-disabled + .MuiSwitch-track": {
              opacity: 0.5
            }
          },
          "&.Mui-focusVisible .MuiSwitch-thumb": {
            color: "#33cf4d",
            border: "6px solid #fff"
          },
          "&.Mui-disabled .MuiSwitch-thumb": {
            color: "#ff0",
          },
          "&.Mui-disabled + .MuiSwitch-track": {
            opacity: .7
          }
        },
        "& .MuiSwitch-thumb": {
          boxSizing: "border-box",
        },
        "& .MuiSwitch-track": {
          borderRadius: 26 / 2,
          backgroundColor: "var(--color-grey-300)",
          opacity: 1,
        }

}


export const SwitchPrimary = styled((props: any) => (
    <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple checked={props.checked} {...props} />
  ))(() => ({...commonStyle,
    width: 28,
    height: 18,
    "& .MuiSwitch-switchBase": {
          padding: 0,
          margin: 2,
          transitionDuration: "300ms",
          top: "1px",
          left: "1px",
          "&.Mui-checked": {
            transform: "translateX(10px)",
            color: "#fff",
            "& + .MuiSwitch-track": {
              backgroundColor: "var(--color-primary)",
              opacity: 1,
              border: 0
            },
            "&.Mui-disabled + .MuiSwitch-track": {
              opacity: 0.5
            }
          },
          "&.Mui-focusVisible .MuiSwitch-thumb": {
            color: "#33cf4d",
            border: "6px solid #fff"
          },
          "&.Mui-disabled .MuiSwitch-thumb": {
            color: "#ff0",
          },
          "&.Mui-disabled + .MuiSwitch-track": {
            opacity: .7
          }
        },
    "& .MuiSwitch-thumb": {
        width: 12,
        height: 12
    },
  }));


export const SwitchSecondary = styled((props: any) => (
    <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple checked={props.checked} {...props} />
  ))(() => ({...commonStyle,
    width: 22,
    height: 14,
    "& .MuiSwitch-switchBase": {
          padding: 0,
          margin: "2px",
          transitionDuration: "300ms",
          top: "0px",
          left: "0px",
          "&.Mui-checked": {
            transform: "translateX(8px)",
            color: "#fff",
            "& + .MuiSwitch-track": {
              backgroundColor: "var(--color-success)",
              opacity: 1,
              border: 0
            },
            "&.Mui-disabled + .MuiSwitch-track": {
              opacity: 0.5
            }
          },
          "&.Mui-focusVisible .MuiSwitch-thumb": {
            color: "#33cf4d",
            border: "6px solid #fff"
          },
          "&.Mui-disabled .MuiSwitch-thumb": {
          },
          "&.Mui-disabled + .MuiSwitch-track": {
            opacity: .7
          }
        },
    "& .MuiSwitch-thumb": {
        width: 10,
        height: 10
    },
  }));
