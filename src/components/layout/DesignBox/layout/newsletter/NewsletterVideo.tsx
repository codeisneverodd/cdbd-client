import styles from "../../styles.module.scss";

import React from "react";
import {
  Checkbox,
  Divider,
  FormControlLabel,
  Slider,
  Stack,
  TextField,
} from "@mui/material";
import Image from "next/image";
import iconGroup from "/public/images/block-icon-primary-Group.svg";

import BlockDesign from "../../components/BlockDesign";
import SectionItemFont from "../../components/SectionItemFont";
import SectionItemColor from "../../components/SectionItemColor";
import SectionItemAlignment from "../../components/SectionItemAlignment";
import DesignBoxHead from "../../components/DesignBoxHead";
import SectionFontSize from "../../components/SectionFontSize";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import SectionItemCorner from "../../components/SectionItemCorner";
import InfoText from "@/components/text/InfoText";
import { changeStyle } from "@/redux/features/BlockData/blockDataSlice";
import SectionItemSpace from "../../components/SectionItemSpace";


export default function NewsletterVideo() {

  const dispatch = useDispatch();
  const selectedBlockId = useSelector((state: RootState) => state.blockData.present.selectedBlockId);
  const selectedBlockStyle = useSelector((state: RootState) =>
    state.blockData.present.blocks.find(
      (block) => block.id === state.blockData.present.selectedBlockId
    )
  )?.style;

  const [link, setLink] = React.useState("");


  return (
    <div className={styles.designBox}>
      <DesignBoxHead
        title="동영상형"
        icon={<Image src={iconGroup} alt="icon" />}
      />

      <ul className={styles.body}>
        <li className={styles.sectionItem}>
          <SectionItemAlignment type="default" />
          <hr className="hr" />

          <SectionItemSpace />

        </li>

        <li className={styles.sectionItem}>
          <div className="h5" style={{ marginBottom: "20px" }}>
            텍스트
          </div>

          <SectionItemFont disableOption />
          <hr className="hr" />

          <SectionFontSize type="document" />
          <hr className="hr" />

          <SectionItemColor />
        </li>

        <li className={styles.sectionItem}>
          <div className="h5" style={{ marginBottom: "20px" }}>
            동영상
          </div>

          <Stack direction="row">
            <div className={styles.sectionItemTitle}>URL</div>
            <Stack direction="column" width="100%">
              <Stack direction="row" gap="8px" width="100%" mb="2px">
                <TextField color="secondary" fullWidth placeholder="동영상 URL을 입력하세요." value={link} onChange={e=>setLink(e.target.value)} />
              </Stack>
              <Stack direction="row" gap="12px" mt="12px" alignItems="center">
                <FormControlLabel
                  className="caption"
                  control={
                    <Checkbox
                      // defaultChecked
                      value={selectedBlockStyle?.mute}
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
                      value={selectedBlockStyle?.autoPlay}
                      onChange={(e) => dispatch(changeStyle({id: selectedBlockId, style: { ...selectedBlockStyle, autoPlay: e.target.checked }}))}
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

          <hr className="hr" />
          
          <SectionItemCorner />

        </li>


        <BlockDesign />
      </ul>
    </div>
  );
}
