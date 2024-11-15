import {
  changePageStyle,
  changeStyle,
} from "@/redux/features/BlockData/blockDataSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { RootState } from "@/redux/store";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Stack, Tab, ToggleButton, ToggleButtonGroup } from "@mui/material";
import {
  Abril_Fatface,
  Anton,
  Bebas_Neue,
  EB_Garamond,
  Lato,
  Libre_Baskerville,
  Montserrat,
  Playfair_Display,
  Poiret_One,
  Poppins,
  PT_Sans,
  PT_Serif,
  Quicksand,
  Tienne,
  Zeyada,
} from "next/font/google";
import React from "react";
import Modal from "../Modal";
import styles from "./index.module.scss";

const lato = Lato({
  subsets: ["latin"],
  weight: ["400", "700"],
});

const ptSans = PT_Sans({
  subsets: ["latin"],
  weight: ["400", "700"],
});

const ptSerif = PT_Serif({
  subsets: ["latin"],
  weight: ["400", "700"],
});

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "700"],
});

const quicksand = Quicksand({
  subsets: ["latin"],
  weight: ["400", "700"],
});

const libreBaskerville = Libre_Baskerville({
  subsets: ["latin"],
  weight: ["400", "700"],
});

const ebGaramond = EB_Garamond({
  subsets: ["latin"],
  weight: ["400", "700"],
});

const playfairDisplay = Playfair_Display({
  subsets: ["latin"], //, "cyrillic", "vietnamese", "latin-ext", "latin-ext"],
  weight: ["400", "700"],
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "700"],
});

const abrilFatface = Abril_Fatface({
  subsets: ["latin"],
  weight: ["400"],
});

const bebasNeue = Bebas_Neue({
  subsets: ["latin"],
  weight: ["400"],
});

const anton = Anton({
  subsets: ["latin"],
  weight: ["400"],
});

const poiretOne = Poiret_One({
  subsets: ["latin"],
  weight: ["400"],
});

const zeyada = Zeyada({
  subsets: ["latin"],
  weight: ["400"],
});

const tienne = Tienne({
  subsets: ["latin"],
  weight: ["400"],
});

export default function PageThemeFontModal() {
  const pageStyle = useAppSelector(
    (state: RootState) => state.blockData.present.style
  );
  // const selectedBlockId = useAppSelector(state=>state.blockData.present.selectedBlockId)
  const fieldToSet = useAppSelector((state) => state.modal.fieldToSet);
  const forBlockId = useAppSelector((state) => state.modal.forBlockId);
  const styleForBlockId = useAppSelector(
    (state) =>
      state.blockData.present.blocks.find((v) => v.id === forBlockId)?.style
  );
  const [initialFontFamily, setInitialFontFamily] = React.useState(
    forBlockId
      ? styleForBlockId?.[fieldToSet ?? "fontFamily"]
      : pageStyle?.[fieldToSet ?? "fontFamily"]
  );

  const dispatch = useAppDispatch();

  const [value, setValue] = React.useState("ko_KR");

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  const handleSelect = (
    event: React.MouseEvent<HTMLElement>,
    newValue: string
  ) => {
    if (newValue === null) return;
    if (forBlockId) {
      dispatch(
        changeStyle({
          id: forBlockId,
          style: { ...styleForBlockId, [fieldToSet ?? "fontFamily"]: newValue },
        })
      );
    } else {
      dispatch(
        changePageStyle({
          ...pageStyle,
          [fieldToSet ?? "fontFamily"]: newValue,
        })
      );
    }
  };

  const handleModalClose = () => {
    // alert(initialFontFamily);
    if (forBlockId) {
      dispatch(
        changeStyle({
          id: forBlockId,
          style: {
            ...styleForBlockId,
            [fieldToSet ?? "fontFamily"]: initialFontFamily,
          },
        })
      );
    } else {
      dispatch(
        changePageStyle({
          ...pageStyle,
          [fieldToSet ?? "fontFamily"]: initialFontFamily,
        })
      );
    }
  };

  // useEffect(
  //   ()=>{
  //     setInitialFontFamily(forBlockId ? styleForBlockId?.[fieldToSet ?? "fontFamily"] : pageStyle?.[fieldToSet ?? "fontFamily"])
  //   }, [forBlockId, fieldToSet, styleForBlockId, pageStyle]
  // )

  return (
    <Modal
      title="서체 선택하기"
      closeButton={false}
      onSubmit={() => {}}
      onClose={handleModalClose}
    >
      <TabContext value={value}>
        <TabList
          onChange={handleChange}
          sx={{
            borderBottom: "1px solid var(--color-grey-100)",
            minHeight: "36px",
          }}
        >
          <Tab
            label="한국어"
            value="ko_KR"
            className="h2"
            sx={{ padding: "6px 16px", minHeight: "unset" }}
          />
          <Tab
            label="ENG"
            value="en_US"
            className="h2"
            sx={{ padding: "6px 16px", minHeight: "unset" }}
          />
        </TabList>

        <Stack
          direction="row"
          gap="32px"
          sx={{
            paddingTop: "32px",
            maxHeight: 728,
            overflowY: "auto",
            mb: "32px",
            paddingLeft: "1px",
          }}
        >
          <TabPanel value="ko_KR" sx={{ padding: 0, flex: 1 }}>
            <Korean
              select={
                forBlockId
                  ? styleForBlockId?.[fieldToSet ?? "fontFamily"]
                  : pageStyle?.[fieldToSet ?? "fontFamily"]
              }
              handleSelect={handleSelect}
            />
          </TabPanel>
          <TabPanel value="en_US" sx={{ padding: 0, flex: 1 }}>
            <English
              select={
                forBlockId
                  ? styleForBlockId?.[fieldToSet ?? "fontFamily"]
                  : pageStyle?.[fieldToSet ?? "fontFamily"]
              }
              handleSelect={handleSelect}
            />
          </TabPanel>
        </Stack>
      </TabContext>
    </Modal>
  );
}

type FontProps = {
  select: string;
  handleSelect: (
    event: React.MouseEvent<HTMLElement>,
    newValue: string
  ) => void;
};

function Korean({ select, handleSelect }: FontProps) {
  return (
    <div className={styles.listWrap}>
      <ToggleButtonGroup
        value={select}
        exclusive
        onChange={handleSelect}
        aria-label="text alignment"
        className={styles.list}
      >
        <ToggleButton
          value="pretendard"
          aria-label="pretendard"
          className={
            select === "pretendard"
              ? `${styles.selected} pretendard`
              : "pretendard"
          }
        >
          프리텐다드
        </ToggleButton>
        <ToggleButton
          value="notoSansKr"
          aria-label="notoSansKr"
          className={
            select === "notoSansKr"
              ? `${styles.selected} notoSansKr`
              : "notoSansKr"
          }
        >
          본고딕
        </ToggleButton>
        <ToggleButton
          value="notoSerifKr"
          aria-label="notoSerifKr"
          className={
            select === "notoSerifKr"
              ? `${styles.selected} notoSerifKr`
              : "notoSerifKr"
          }
        >
          본명조
        </ToggleButton>

        <ToggleButton
          value="nanumGothic"
          aria-label="nanumGothic"
          className={
            select === "nanumGothic"
              ? `${styles.selected} nanumGothic`
              : "nanumGothic"
          }
        >
          나눔고딕
        </ToggleButton>
        <ToggleButton
          value="nanumSerif"
          aria-label="nanumSerif"
          className={
            select === "nanumSerif"
              ? `${styles.selected} nanumSerif`
              : "nanumSerif"
          }
        >
          나눔명조
        </ToggleButton>
        <ToggleButton
          value="bukkGothic"
          aria-label="bukkGothic"
          className={
            select === "bukkGothic"
              ? `${styles.selected} bukkGothic`
              : "bukkGothic"
          }
        >
          부크크고딕
        </ToggleButton>

        <ToggleButton
          value="bukkSerif"
          aria-label="bukkSerif"
          className={
            select === "bukkSerif"
              ? `${styles.selected} bukkSerif`
              : "bukkSerif"
          }
        >
          부크크명조
        </ToggleButton>
        <ToggleButton
          value="kopubDotum"
          aria-label="kopubDotum"
          className={
            select === "kopubDotum"
              ? `${styles.selected} kopubDotum`
              : "kopubDotum"
          }
        >
          KoPub돋움
        </ToggleButton>
        <ToggleButton
          value="kopubBatang"
          aria-label="kopubBatang"
          className={
            select === "kopubBatang"
              ? `${styles.selected} kopubBatang`
              : "kopubBatang"
          }
        >
          KoPub바탕
        </ToggleButton>

        <ToggleButton
          value="gounDotum"
          aria-label="gounDotum"
          className={
            select === "gounDotum"
              ? `${styles.selected} gounDotum`
              : "gounDotum"
          }
        >
          고운돋움
        </ToggleButton>
        <ToggleButton
          value="gounBatang"
          aria-label="gounBatang"
          className={
            select === "gounBatang"
              ? `${styles.selected} gounBatang`
              : "gounBatang"
          }
        >
          고운바탕
        </ToggleButton>
        <ToggleButton
          value="ChosunilboNM"
          aria-label="ChosunilboNM"
          className={
            select === "ChosunilboNM"
              ? `${styles.selected} ChosunilboNM`
              : "ChosunilboNM"
          }
        >
          조선일보명조
        </ToggleButton>

        <ToggleButton
          value="taebaekMilkyway"
          aria-label="taebaekMilkyway"
          className={
            select === "taebaekMilkyway"
              ? `${styles.selected} taebaekMilkyway`
              : "taebaekMilkyway"
          }
        >
          태백 은하수체
        </ToggleButton>
        <ToggleButton
          value="mapoFlowerIsland"
          aria-label="mapoFlowerIsland"
          className={
            select === "mapoFlowerIsland"
              ? `${styles.selected} mapoFlowerIsland`
              : "mapoFlowerIsland"
          }
        >
          마포꽃섬
        </ToggleButton>
        <ToggleButton
          value="escoreDream"
          aria-label="escoreDream"
          className={
            select === "escoreDream"
              ? `${styles.selected} escoreDream`
              : "escoreDream"
          }
        >
          에스코어드림
        </ToggleButton>

        <ToggleButton
          value="gmarketSans"
          aria-label="gmarketSans"
          className={
            select === "gmarketSans"
              ? `${styles.selected} gmarketSans`
              : "gmarketSans"
          }
        >
          G마켓 산스
        </ToggleButton>
        <ToggleButton
          value="pyongchang"
          aria-label="pyongchang"
          className={
            select === "pyongchang"
              ? `${styles.selected} pyongchang`
              : "pyongchang"
          }
        >
          평창평화체
        </ToggleButton>
        <ToggleButton
          value="hsSantokki"
          aria-label="hsSantokki"
          className={
            select === "hsSantokki"
              ? `${styles.selected} hsSantokki`
              : "hsSantokki"
          }
        >
          HS산토끼체
        </ToggleButton>

        <ToggleButton
          value="hakgyoansimMagician"
          aria-label="hakgyoansimMagician"
          className={
            select === "hakgyoansimMagician"
              ? `${styles.selected} hakgyoansimMagician`
              : "hakgyoansimMagician"
          }
        >
          학교안심 마법사
        </ToggleButton>
        <ToggleButton
          value="hakgyoansimDotbogi"
          aria-label="hakgyoansimDotbogi"
          className={
            select === "hakgyoansimDotbogi"
              ? `${styles.selected} hakgyoansimDotbogi`
              : "hakgyoansimDotbogi"
          }
        >
          학교안심 돋보기
        </ToggleButton>
        <ToggleButton
          value="cafe24ClassicType"
          aria-label="cafe24ClassicType"
          className={
            select === "cafe24ClassicType"
              ? `${styles.selected} cafe24ClassicType`
              : "cafe24ClassicType"
          }
        >
          카페24 클래식타입
        </ToggleButton>

        <ToggleButton
          value="cafe24Moyamoya"
          aria-label="cafe24Moyamoya"
          className={
            select === "cafe24Moyamoya"
              ? `${styles.selected} cafe24Moyamoya`
              : "cafe24Moyamoya"
          }
        >
          카페24 모야모야
        </ToggleButton>
        <ToggleButton
          value="bagleFat"
          aria-label="bagleFat"
          className={
            select === "bagleFat" ? `${styles.selected} bagleFat` : "bagleFat"
          }
        >
          베이글팻
        </ToggleButton>
        <ToggleButton
          value="waguri"
          aria-label="waguri"
          className={
            select === "waguri" ? `${styles.selected} waguri` : "waguri"
          }
        >
          와구리체
        </ToggleButton>

        <ToggleButton
          value="changwonDangamAsac"
          aria-label="changwonDangamAsac"
          className={
            select === "changwonDangamAsac"
              ? `${styles.selected} changwonDangamAsac`
              : "changwonDangamAsac"
          }
        >
          창원단감아삭체
        </ToggleButton>
        <ToggleButton
          value="partialSans"
          aria-label="partialSans"
          className={
            select === "partialSans"
              ? `${styles.selected} partialSans`
              : "partialSans"
          }
        >
          파셜산스
        </ToggleButton>
      </ToggleButtonGroup>
    </div>
  );
}

function English({ select, handleSelect }: FontProps) {
  return (
    <div className={styles.listWrap}>
      <ToggleButtonGroup
        value={select}
        exclusive
        onChange={handleSelect}
        aria-label="text alignment"
        className={styles.list}
      >
        <ToggleButton
          value={"lato"}
          aria-label="lato"
          className={select === "lato" ? `${styles.selected} lato` : "lato"}
        >
          Lato
        </ToggleButton>
        <ToggleButton
          value={"ptSans"}
          aria-label="ptSans"
          className={
            select === "ptSans" ? `${styles.selected} ptSans` : "ptSans"
          }
        >
          PT Sans
        </ToggleButton>
        <ToggleButton
          value={"ptSerif"}
          aria-label="ptSerif"
          className={
            select === "ptSerif" ? `${styles.selected} ptSerif` : "ptSerif"
          }
        >
          PT Serif
        </ToggleButton>

        <ToggleButton
          value={"montserrat"}
          aria-label="montserrat"
          className={
            select === "montserrat"
              ? `${styles.selected} montserrat`
              : "montserrat"
          }
        >
          Montserrat
        </ToggleButton>
        <ToggleButton
          value={"quicksand"}
          aria-label="quicksand"
          className={
            select === "quicksand"
              ? `${styles.selected} quicksand`
              : "quicksand"
          }
        >
          Quicksand
        </ToggleButton>
        <ToggleButton
          value={"libreBaskerville"}
          aria-label="libreBaskerville"
          className={
            select === "libreBaskerville"
              ? `${styles.selected} libreBaskerville`
              : "libreBaskerville"
          }
        >
          Libre Baskerville
        </ToggleButton>

        <ToggleButton
          value={"ebGaramond"}
          aria-label="ebGaramond"
          className={
            select === "ebGaramond"
              ? `${styles.selected} ebGaramond`
              : "ebGaramond"
          }
        >
          EB Garamond
        </ToggleButton>
        <ToggleButton
          value={"playfairDisplay"}
          aria-label="playfairDisplay"
          className={
            select === "playfairDisplay"
              ? `${styles.selected} playfairDisplay`
              : "playfairDisplay"
          }
        >
          Playfair Display
        </ToggleButton>
        <ToggleButton
          value={"poppins"}
          aria-label="poppins"
          className={
            select === "poppins" ? `${styles.selected} poppins` : "poppins"
          }
        >
          Poppins
        </ToggleButton>

        <ToggleButton
          value={"abrilFatface"}
          aria-label="abrilFatface"
          className={
            select === "abrilFatface"
              ? `${styles.selected} abrilFatface`
              : "abrilFatface"
          }
        >
          Abril Fatface
        </ToggleButton>
        <ToggleButton
          value={"bebasneue"}
          aria-label="bebasneue"
          className={
            select === "bebasneue"
              ? `${styles.selected} bebasneue`
              : "bebasneue"
          }
        >
          Bebas Neue
        </ToggleButton>
        <ToggleButton
          value={"anton"}
          aria-label="anton"
          className={select === "anton" ? `${styles.selected} anton` : "anton"}
        >
          Anton
        </ToggleButton>

        <ToggleButton
          value={"poiretone"}
          aria-label="poiretone"
          className={
            select === "poiretone"
              ? `${styles.selected} poiretone`
              : "poiretone"
          }
        >
          Poiret One
        </ToggleButton>
        <ToggleButton
          value={"zeyada"}
          aria-label="zeyada"
          className={
            select === "zeyada" ? `${styles.selected} zeyada` : "zeyada"
          }
        >
          Zeyada
        </ToggleButton>
        <ToggleButton
          value={"tiquitaca"}
          aria-label="tiquitaca"
          className={
            select === "tiquitaca"
              ? `${styles.selected} tiquitaca`
              : "tiquitaca"
          }
        >
          tiquitaca
        </ToggleButton>
      </ToggleButtonGroup>
    </div>
  );
}
