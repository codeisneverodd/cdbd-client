import React, { useContext } from "react";
import styles from "./index.module.scss";
import { Button, Divider, Stack, Tab } from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";

import Default from "./components/Default";
import LinkInBio from "./components/LinkInBio";
import Invitation from "./components/Invitation";
import Catalog from "./components/Catalog";
import Newsletter from "./components/Newsletter";
import Namecard from "./components/Namecard";
import PreviewListDnd from "./components/PreviewListDnd";

export default function AddBlockModal() {
  const [value, setValue] = React.useState("default");

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  function getTabInfoText (value: string) {
    switch (value) {
      case "linkInBio":
        return "브랜드의 미디어를 하나의 페이지에 모두 모아 소개하는 페이지"
      case "invitation":
        return "온라인과 오프라인 등 다양한 행사 안내를 할 때 사용하는 페이지"
      case "catalog":
        return "브랜드의 미디어를 하나의 페이지에 모두 모아 소개하는 페이지"
      case "newsletter":
        return "상품 소개 중심의 이미지와 관련 정보를 전달하기 좋은 페이지"
      case "namecard":
        return "트렌드 뉴스 등 다양한 정보와 소식을 전하는 매거진 형태의 페이지"
    
      default:
        return "";
    }
  }
  return (
    <TabContext value={value}>
      <TabList
        onChange={handleChange}
        variant="scrollable"
        scrollButtons="auto"
        sx={{
          minHeight: "36px",
        }}
      >
        <Tab
          label="기본 카드"
          value="default"
          className="h2"
          sx={{ padding: "6px 16px", minHeight: "unset" }}
        />
        <Tab
          label="링크인바이오"
          value="linkInBio"
          className="h2"
          sx={{ padding: "6px 16px", minHeight: "unset" }}
        />
        <Tab
          label="초청장"
          value="invitation"
          className="h2"
          sx={{ padding: "6px 16px", minHeight: "unset" }}
        />
        <Tab
          label="카탈로그"
          value="catalog"
          className="h2"
          sx={{ padding: "6px 16px", minHeight: "unset" }}
        />
        <Tab
          label="정보 소식지"
          value="newsletter"
          className="h2"
          sx={{ padding: "6px 16px", minHeight: "unset" }}
        />
        <Tab
          label="비지니스 명함"
          value="namecard"
          className="h2"
          sx={{ padding: "6px 16px", minHeight: "unset" }}
        />
      </TabList>
      <hr
        className="hr"
        style={{
          height: "1px",
          width: "calc(100% + 64px)",
          borderColor: "var(--color-grey-100)",
          margin: "0 -32px",
          transform: "translate(0, -1px)",
        }}
      />
      {value !== "default" && (
        <div className={`subtitle2 ${styles.tabInfo}`}>
          {getTabInfoText(value)}
        </div>
      )}

      <Stack
        direction="row"
        gap="32px"
        sx={{ paddingTop: "24px", marginBottom: "32px", flex: 1 }}
      >
        <TabPanel value="default" sx={{ padding: 0, flex: 1 }}>
          <Default />
        </TabPanel>
        <TabPanel value="linkInBio" sx={{ padding: 0, flex: 1 }}>
          <LinkInBio />
        </TabPanel>
        <TabPanel value="invitation" sx={{ padding: 0, flex: 1 }}>
          <Invitation />
        </TabPanel>
        <TabPanel value="catalog" sx={{ padding: 0, flex: 1 }}>
          <Catalog />
        </TabPanel>
        <TabPanel value="newsletter" sx={{ padding: 0, flex: 1 }}>
          <Newsletter />
        </TabPanel>
        <TabPanel value="namecard" sx={{ padding: 0, flex: 1 }}>
          <Namecard />
        </TabPanel>
        <Divider orientation="vertical" variant="middle" flexItem />

        <Stack className={styles.previewListWrap}>
          <div className={styles.previewList}>
            <div className={styles.box}>
              {true ? (
                <PreviewListDnd />
              ) : (
                <div className={styles.defaultMessage}>
                  카드를 추가해서
                  <br />
                  멋진 페이지를 만들어 보세요!
                </div>
              )}
            </div>
          </div>
          <Button variant="contained" disableElevation>
            이대로 추가하기
          </Button>
        </Stack>
      </Stack>
    </TabContext>
  );
}
