"use client";
import styles from "../../style.module.scss";

import LanguageSelector from "@/components/util/LanguageSelector";
import { Stack } from "@mui/material";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import iconCheck from "/public/images/icon-check.svg";
import logo from "/public/images/logo-hybrid.svg";

export default function ResetPasswordSent() {
  const searchParam = useSearchParams();

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
                    <span>이메일 전송됨</span>
                  </p>
                </Stack>
                <span
                  className="p2-eng text-grey-900"
                  style={{
                    marginBottom: "24px",
                    transform: "translate(0, -8px)",
                  }}
                >
                  비밀번호 재설정 이메일이 {searchParam.get("email") ?? ""} 로
                  전송되었습니다. 이메일을 확인하고 링크를 클릭하여 비밀번호
                  재설정을 완료해주세요.
                </span>
              </section>

              {/* <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
                <Button
                  variant="outlined"
                  color="info"
                  className="subtitle1-eng"
                  fullWidth
                  sx={{ marginBottom: '16px' }}
                >
                  Start Without Signing Up
                </Button>

                <div className={styles.signup}>
                  <span className="p2-eng">Already have an account?</span>
                  <Link className="subtitle2-eng" href="/sign-in">
                    Sign In
                  </Link>
                </div>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
