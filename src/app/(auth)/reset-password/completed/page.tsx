"use client";
import styles from "../../style.module.scss";

import LoadingFormButton from "@/components/buttons/LoadingFormButton";
import LanguageSelector from "@/components/util/LanguageSelector";
import { Stack } from "@mui/material";
import Image from "next/image";
import iconCheck from "/public/images/icon-check.svg";
import logo from "/public/images/logo-hybrid.svg";

export default function ResetPasswordSent() {
  return (
    <div className={styles.signInSideWrap}>
      <div className={styles.left}></div>
      <div className={styles.right}>
        <LanguageSelector />

        <div className={styles.formWrap}>
          <div className={styles.formBox}>
            <div className={styles.top} style={{ marginBottom: "64px" }}>
              <Image src={logo} alt="CdBd logo" />
            </div>
            <div className={`${styles.bottom} ${styles.resetPassword}`}>
              <section>
                <Stack direction="row" alignItems="center" gap="12px">
                  <p className={`h1-eng flex text-information ${styles.title}`}>
                    <Image
                      src={iconCheck}
                      alt="check"
                      width={16}
                      height={16}
                      style={{
                        marginRight: "8px",
                        filter:
                          "invert(44%) sepia(85%) saturate(2067%) hue-rotate(196deg) brightness(100%) contrast(96%)",
                      }}
                    />
                    <span>비밀번호 재설정 완료</span>
                  </p>
                </Stack>
                <span
                  className="p2-eng text-grey-900"
                  style={{
                    marginBottom: "24px",
                    transform: "translate(0, -8px)",
                  }}
                >
                  비밀번호 재설정이 완료되었습니다. 아래 버튼을 눌러 로그인
                  해주세요.
                </span>
              </section>

              <LoadingFormButton
                variant="contained"
                fullWidth
                type="button"
                sx={{ marginTop: "24px", marginBottom: "16px" }}
                href="/sign-in"
              >
                로그인
              </LoadingFormButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
