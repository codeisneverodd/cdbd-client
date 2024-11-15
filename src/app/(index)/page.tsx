import { Grid } from "@mui/material";
import styles from "./styles.module.scss";
import PreviewFrame from "@/components/layout/PreviewFrame";
import BlockList from "@/components/layout/BlockList";
import DesignBox from "@/components/layout/DesignBox";
import SideBar from "@/components/layout/SideBar";
import Header from "@/components/layout/Header";
import ModalWrapper from "@/components/modal/ModalWrapper";

export default function page() {
  return (
    <div className={styles.wrap}>
      <SideBar />
      <div className={styles.contentWrap}>
        <Header />
        <section className={styles.content}>
          <div className={styles.editorWrap}>
            {/* modal */}
            <ModalWrapper />
            {/* main app */}
            <Grid container spacing={4}>
              <Grid item xs={4}>
                <PreviewFrame />
              </Grid>
              <Grid item xs={4}>
                <BlockList />
              </Grid>
              <Grid item xs={4} sx={{ direction: "rtl" }}>
                <DesignBox />
              </Grid>
            </Grid>
          </div>
        </section>
      </div>
    </div>
  );
}
