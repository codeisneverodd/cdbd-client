import styles from "../styles.module.scss";
import React from 'react'
import Image from 'next/image';

import iconError from "/public/images/icon-error.svg";

import { Stack, TextField, ToggleButton, FormControlLabel, Checkbox, Divider } from '@mui/material';
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { RootState } from "@/redux/store";
import { changeStyle } from "@/redux/features/BlockData/blockDataSlice";

export default function SectionItemLink({underline=true}: {underline?: boolean}) {
  const dispatch = useAppDispatch();
  const selectedBlockId = useAppSelector((state: RootState) => state.blockData.present.selectedBlockId);
  const selectedBlockStyle = useAppSelector((state: RootState) =>
    state.blockData.present.blocks.find(
      (block) => block.id === state.blockData.present.selectedBlockId
    )
  )?.style;

  const [toggleButton, setToggleButton] = React.useState(false);
  // const [url, setUrl] = React.useState(selectedBlockStyle?.url)

  const handleChange = (e: any) => {
    // setUrl(e.target.value);
    dispatch(changeStyle({id:selectedBlockId, style:{...selectedBlockStyle, link:e.target.value}}));
  }

  const validateUrl = (url: string) => {
    if (!url) return false;
    // eg:
    // google.com
    // www.google.com
    // http://www.google.com


    const urlRegex = new RegExp(
      // "^(https?:\\/\\/)?" + // protocol
      "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
      "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
      "(\\:\\d+)?" + // port
      "(\\/[-a-z\\d%_.~+]*)*" + // path
      "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
      "(\\#[-a-z\\d_]*)?$", // fragment locator
      "i"
    );
    
    return !urlRegex.test(url);
  }

  return (
    <Stack direction="row">
      <div className={styles.sectionItemTitle}>링크</div>
      <Stack direction="column" width="100%">
        <Stack direction="row" gap="8px" width="100%" mb="2px">
          <TextField
            // onChange={handleChange}
            onBlur={handleChange}
            // value={selectedBlockStyle?.link}
            color="secondary"
            fullWidth
            placeholder="URL을 입력하세요."
            // FIX: NOTE: helpertext with error
            helperText={
              !selectedBlockStyle?.link ? <div className="helperText">
                <Image src={iconError} alt="error" width={10} height={10}/>
                <span>URL을 정확히 입력해 주세요</span>
              </div> : null
            }
            error={validateUrl(selectedBlockStyle?.link)}
          />
          {/* //FIX: I deleted the link button due to client request, please check. */}
          {/* <ToggleButton
            value="check"
            selected={toggleButton}
            onChange={() => {
              setToggleButton(!toggleButton);
            }}
            style={{
              width: 34,
              minWidth: 34,
              height: 34,
            }}
          >
            <Image src={iconLink} alt="iconLink" onClick={()=>dispatch(changeStyle({id:selectedBlockId, style: {...selectedBlockStyle, url}}))} />
          </ToggleButton> */}
        </Stack>
        <Stack direction="row" gap="8px" mt="12px" alignItems="center">
          <FormControlLabel
            className="caption"
            control={
              <Checkbox
                value={selectedBlockStyle?.openInNewTab}
                size="small"
                color="secondary"
                sx={{ height: "18px" }}
                onChange={(e)=>dispatch(changeStyle({id:selectedBlockId,style:{...selectedBlockStyle, openInNewTab:e.target.checked}}))}
                // value={selectedBlockStyle?.openNewTab}
              />
            }
            label="새 창에서 열기"
          />
          {underline && (
            <>
              <Divider orientation="vertical" sx={{ height: "18px" }} />
              <FormControlLabel
                className="caption"
                control={
                  <Checkbox
                    size="small"
                    color="secondary"
                    sx={{ height: "18px" }}
                    value={selectedBlockStyle?.textDecoration}
                    onChange={(e)=>dispatch(changeStyle({id:selectedBlockId,style:{...selectedBlockStyle, textDecoration:e.target.checked ? "underline" : "none"}}))}
                  />
                }
                label="밑줄"
              />
            </>
          )}
        </Stack>
      </Stack>
    </Stack>
  );
}
