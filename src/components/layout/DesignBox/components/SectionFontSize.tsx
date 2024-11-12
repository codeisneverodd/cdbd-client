import styles from "../styles.module.scss";
import React from "react";
import Image from "next/image";

// import { ButtonSecondary } from '@/components/Buttons'
import {
  Stack,
  Select,
  MenuItem,
  ButtonGroup,
  SelectChangeEvent,
  ToggleButton,
} from "@mui/material";

import iconMinus from "/public/images/icon-minus.svg";
import iconPlus from "/public/images/icon-plus.svg";
import iconBold from "/public/images/icon-bold.svg";
import iconUnderline from "/public/images/icon-underline.svg";

import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { ButtonSecondary } from "@/components/buttons/Buttons";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { RootState } from "@/redux/store";
import { changeStyle } from "@/redux/features/BlockData/blockDataSlice";

export default function SectionFontSize({
  type = "default",
}: {
  type?: "default" | "date" | "document";
}) {
  const dispatch = useAppDispatch();
  const selectedBlockId = useAppSelector(
    (state: RootState) => state.blockData.present.selectedBlockId
  );
  const selectedBlockStyle = useAppSelector((state: RootState) =>
    state.blockData.present.blocks.find(
      (block) => block.id === state.blockData.present.selectedBlockId
    )
  )?.style;

  // const [select, setSelect] = React.useState("10");

  const handleSelectChange = (event: SelectChangeEvent) => {
    dispatch(
      changeStyle({
        id: selectedBlockId,
        style: {
          ...selectedBlockStyle,
          fontSize: Number(event.target.value) ?? 0,
        },
      })
    );
    // setSelect(event.target.value as string);
  };

  return (
    <Stack direction="row">
      <div className={styles.sectionItemTitle}>크기</div>

      {type === "default" ? (
        <Stack direction="row" gap="8px" width="100%">
          <Select
            color="secondary"
            fullWidth
            size="small"
            value={selectedBlockStyle?.fontSize ?? 0}
            onChange={handleSelectChange}
            IconComponent={KeyboardArrowDownIcon}
            className="indivisible"
          >
            <MenuItem value={"16"} className="indivisible">
              16
            </MenuItem>
            <MenuItem value={"20"} className="indivisible">
              20
            </MenuItem>
            <MenuItem value={"30"} className="indivisible">
              30
            </MenuItem>
            <MenuItem value={selectedBlockStyle?.fontSize.toString()} hidden={true} disabled={true} sx={{height:0, p:0, overflow: 'clip'}} className="hidden h-0">{selectedBlockStyle?.fontSize}</MenuItem>
          </Select>
          <ButtonGroup aria-label="Basic button group">
            <ButtonSecondary
              onClick={() => {
                dispatch(
                  changeStyle({
                    id: selectedBlockId,
                    style: {
                      ...selectedBlockStyle,
                      fontSize: selectedBlockStyle.fontSize - 1,
                    },
                  })
                );
              }}
            >
              <Image src={iconMinus} alt="iconMinus" />
            </ButtonSecondary>
            <ButtonSecondary
              onClick={() => {
                dispatch(
                  changeStyle({
                    id: selectedBlockId,
                    style: {
                      ...selectedBlockStyle,
                      fontSize: selectedBlockStyle.fontSize + 1,
                    },
                  })
                );
              }}
            >
              <Image src={iconPlus} alt="iconPlus" />
            </ButtonSecondary>
          </ButtonGroup>
        </Stack>
      ) : type === "date" ? (
        <Stack direction="column" gap="8px" width="100%">
          <Stack direction="row" alignItems="center" gap="12px">
            <span className="subtitle2 text-grey-300">기간</span>
            <Stack direction="row" gap="8px" width="100%">
              <Select
                color="secondary"
                fullWidth
                size="small"
                value={selectedBlockStyle?.fontSize ?? 0}
                onChange={handleSelectChange}
                IconComponent={KeyboardArrowDownIcon}
                className="indivisible"
              >
                <MenuItem value={"10"} className="indivisible">
                  16
                </MenuItem>
                <MenuItem value={"20"} className="indivisible">
                  20
                </MenuItem>
                <MenuItem value={"30"} className="indivisible">
                  30
                </MenuItem>
              </Select>
              <Stack direction="row" gap="4px" width="unset">
            <ToggleButton
              value={"check"}
              // selected={toggleButton}
              selected={selectedBlockStyle?.fontWeight === "bold"}
              onChange={() => {
                dispatch(changeStyle({ id: selectedBlockId, style: { ...selectedBlockStyle, fontWeight: selectedBlockStyle?.fontWeight === "bold" ? "normal" : "bold" } }));
              }}
              style={{
                width: 34,
                height: 34,
              }}
            >
              <Image src={iconBold} alt="iconBold" />
            </ToggleButton>
            <ToggleButton
              value="check"
              selected={selectedBlockStyle?.textDecoration === "underline"}
              onChange={() => {
                dispatch(changeStyle({ id: selectedBlockId, style: { ...selectedBlockStyle, textDecoration: selectedBlockStyle?.textDecoration === "underline" ? "none" : "underline" } }));
              }}
              style={{
                width: 34,
                height: 34,
              }}
            >
              <Image src={iconUnderline} alt="iconUnderline" />
            </ToggleButton>
          </Stack>
            </Stack>
          </Stack>
          <Stack direction="row" alignItems="center" gap="12px">
            <span className="subtitle2 text-grey-300">위치</span>
            <Stack direction="row" gap="8px" width="100%">
              <Select
                color="secondary"
                fullWidth
                size="small"
                value={selectedBlockStyle?.fontSize ?? 0}
                onChange={handleSelectChange}
                IconComponent={KeyboardArrowDownIcon}
                className="indivisible"
              >
                <MenuItem value={"10"} className="indivisible">
                  16
                </MenuItem>
                <MenuItem value={"20"} className="indivisible">
                  20
                </MenuItem>
                <MenuItem value={"30"} className="indivisible">
                  30
                </MenuItem>
              </Select>
              <Stack direction="row" gap="4px" width="unset">
            <ToggleButton
              value={"check"}
              // selected={toggleButton}
              selected={selectedBlockStyle?.fontWeight === "bold"}
              onChange={() => {
                dispatch(changeStyle({ id: selectedBlockId, style: { ...selectedBlockStyle, fontWeight: selectedBlockStyle?.fontWeight === "bold" ? "normal" : "bold" } }));
              }}
              style={{
                width: 34,
                height: 34,
              }}
            >
              <Image src={iconBold} alt="iconBold" />
            </ToggleButton>
            <ToggleButton
              value="check"
              selected={selectedBlockStyle?.textDecoration === "underline"}
              onChange={() => {
                dispatch(changeStyle({ id: selectedBlockId, style: { ...selectedBlockStyle, textDecoration: selectedBlockStyle?.textDecoration === "underline" ? "none" : "underline" } }));
              }}
              style={{
                width: 34,
                height: 34,
              }}
            >
              <Image src={iconUnderline} alt="iconUnderline" />
            </ToggleButton>
          </Stack>
            </Stack>
          </Stack>
        </Stack>
      ) : (
        <Stack direction="column" gap="8px" width="100%">
        <Stack direction="row" alignItems="center" gap="12px">
          <span className="subtitle2 text-grey-300">제목</span>
          <Stack direction="row" gap="8px" width="100%">
            <Select
              color="secondary"
              fullWidth
              size="small"
              value={selectedBlockStyle?.fontSize ?? 0}
              onChange={handleSelectChange}
              IconComponent={KeyboardArrowDownIcon}
              className="indivisible"
            >
              <MenuItem value={"10"} className="indivisible">
                16
              </MenuItem>
              <MenuItem value={"20"} className="indivisible">
                20
              </MenuItem>
              <MenuItem value={"30"} className="indivisible">
                30
              </MenuItem>
            </Select>
            <Stack direction="row" gap="4px" width="unset">
          <ToggleButton
            value={"check"}
            // selected={toggleButton}
            selected={selectedBlockStyle?.fontWeight === "bold"}
            onChange={() => {
              dispatch(changeStyle({ id: selectedBlockId, style: { ...selectedBlockStyle, fontWeight: selectedBlockStyle?.fontWeight === "bold" ? "normal" : "bold" } }));
            }}
            style={{
              width: 34,
              height: 34,
            }}
          >
            <Image src={iconBold} alt="iconBold" />
          </ToggleButton>
          <ToggleButton
            value="check"
            selected={selectedBlockStyle?.textDecoration === "underline"}
            onChange={() => {
              dispatch(changeStyle({ id: selectedBlockId, style: { ...selectedBlockStyle, textDecoration: selectedBlockStyle?.textDecoration === "underline" ? "none" : "underline" } }));
            }}
            style={{
              width: 34,
              height: 34,
            }}
          >
            <Image src={iconUnderline} alt="iconUnderline" />
          </ToggleButton>
        </Stack>
          </Stack>
        </Stack>
        <Stack direction="row" alignItems="center" gap="12px">
          <span className="subtitle2 text-grey-300">본문</span>
          <Stack direction="row" gap="8px" width="100%">
            <Select
              color="secondary"
              fullWidth
              size="small"
              value={selectedBlockStyle?.fontSize ?? 0}
              onChange={handleSelectChange}
              IconComponent={KeyboardArrowDownIcon}
              className="indivisible"
            >
              <MenuItem value={"10"} className="indivisible">
                16
              </MenuItem>
              <MenuItem value={"20"} className="indivisible">
                20
              </MenuItem>
              <MenuItem value={"30"} className="indivisible">
                30
              </MenuItem>
            </Select>
            <Stack direction="row" gap="4px" width="unset">
          <ToggleButton
            value={"check"}
            // selected={toggleButton}
            selected={selectedBlockStyle?.fontWeight === "bold"}
            onChange={() => {
              dispatch(changeStyle({ id: selectedBlockId, style: { ...selectedBlockStyle, fontWeight: selectedBlockStyle?.fontWeight === "bold" ? "normal" : "bold" } }));
            }}
            style={{
              width: 34,
              height: 34,
            }}
          >
            <Image src={iconBold} alt="iconBold" />
          </ToggleButton>
          <ToggleButton
            value="check"
            selected={selectedBlockStyle?.textDecoration === "underline"}
            onChange={() => {
              dispatch(changeStyle({ id: selectedBlockId, style: { ...selectedBlockStyle, textDecoration: selectedBlockStyle?.textDecoration === "underline" ? "none" : "underline" } }));
            }}
            style={{
              width: 34,
              height: 34,
            }}
          >
            <Image src={iconUnderline} alt="iconUnderline" />
          </ToggleButton>
        </Stack>
          </Stack>
        </Stack>
      </Stack>
      )}
    </Stack>
  );
}
