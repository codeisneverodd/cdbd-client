import styles from "../styles.module.scss";

import React from "react";
import Image from "next/image";
import {
  Stack,
  TextField,
  ToggleButton,
  FormControlLabel,
  Checkbox,
  Divider,
} from "@mui/material";

import iconLink from "/public/images/icon-link.svg";
import IconVideo from "/public/images/block-icon-primary-Video.svg";
import BlockDesign from "../components/BlockDesign";
import DesignBoxHead from "../components/DesignBoxHead";
import SectionItemCorner from "../components/SectionItemCorner";
import InfoText from "@/components/text/InfoText";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { RootState } from "@/redux/store";
import { changeStyle } from "@/redux/features/BlockData/blockDataSlice";
// import InfoText from "@/components/InfoText";

export default function Video({title = "동영상"}: {title?: string}) {
  const dispatch = useAppDispatch();
  const selectedBlockId = useAppSelector((state: RootState) => state.blockData.present.selectedBlockId);
  const selectedBlockStyle = useAppSelector((state: RootState) =>
    state.blockData.present.blocks.find(
      (block) => block.id === state.blockData.present.selectedBlockId
    )?.style
  );

  const [error, setError] = React.useState<string>();

  const checkUrl = (url: string) => {
    if(url.includes("youtu.be") || url.includes("youtube"))
      setError(undefined);
    else
      setError("유튜브 영상만 가져올 수 있어요.");
  }

  return (
    <div className={styles.designBox}>
      <DesignBoxHead
        title={title}
        icon={<Image src={IconVideo} alt="iconVideo" />}
      />

      <ul className={styles.body}>
        <li className={styles.sectionItem}>
          <Stack direction="row">
            <div className={styles.sectionItemTitle}>URL</div>
            <Stack direction="column" width="100%">
              <Stack direction="row" gap="8px" width="100%" mb="2px">
                <TextField color="secondary" fullWidth placeholder="동영상 URL을 입력하세요." onChange={(e) => {

                    checkUrl(e.target.value);
                    // alert("동영상 URL을 입력하세요.");
                    if(e.target.value.includes("youtu.be") || e.target.value.includes("youtube"))
                      dispatch(changeStyle({id: selectedBlockId, style: { ...selectedBlockStyle, url: e.target.value }}));
                    else {
                      dispatch(changeStyle({id: selectedBlockId, style: { ...selectedBlockStyle, url: "" }}));
                    }
                  }}
                  error={error !== undefined}
                  helperText={error}
                  />
                {/* FIX: please delete this button */}
                {/* <ToggleButton
                  value="check"
                  selected={selectedBlockStyle?.url === link && link !== ""}
                  onChange={() => {
                    if(link.includes("youtu.be") || link.includes("youtube"))
                      dispatch(changeStyle({id: selectedBlockId, style: { ...selectedBlockStyle, url: link }}));
                    else {
                      dispatch(changeStyle({id: selectedBlockId, style: { ...selectedBlockStyle, url: "" }}));
                    }
                  }}
                  style={{
                    width: 34,
                    minWidth: 34,
                    height: 34,
                  }}
                >
                  <Image src={iconLink} alt="iconLink" />
                </ToggleButton> */}
              </Stack>
              <Stack direction="row" gap="12px" mt="12px" alignItems="center">
                <FormControlLabel
                  className="caption"
                  control={
                    <Checkbox
                      // defaultChecked
                      checked={selectedBlockStyle?.mute??false}
                      onChange={(e) => dispatch(changeStyle({id: selectedBlockId, style: { ...selectedBlockStyle, mute: e.target.checked }}))}
                      size="small"
                      color="secondary"
                      sx={{ height: "18px" }}
                    />
                  }
                  label="무음"
                />
                <Divider orientation="vertical" sx={{ height: "18px" }} />

                <FormControlLabel
                  className="caption"
                  control={
                    <Checkbox
                      checked={selectedBlockStyle?.autoPlay??false}
                      onChange={(e) => dispatch(changeStyle({id: selectedBlockId, style: { ...selectedBlockStyle, autoPlay: e.target.checked, mute: e.target.checked?true:selectedBlockStyle?.mute }}))}
                      size="small"
                      color="secondary"
                      sx={{ height: "18px" }}
                    />
                  }
                  label="자동재생"
                />
              </Stack>
              <InfoText>유튜브 영상만 가져올 수 있어요.</InfoText>
            </Stack>
          </Stack>
        </li>

        <li className={styles.sectionItem}>
          <SectionItemCorner />
        </li>

        <BlockDesign />
      </ul>
    </div>
  );
}
