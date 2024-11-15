"use client";
import styles from "../style.module.scss";

import Image from "next/image";
import logo from "/public/images/logo-hybrid.svg";
import LanguageSelector from "@/components/util/LanguageSelector";
import { Button, Stack } from "@mui/material";
import React from "react";
import iconCheck from "/public/images/icon-check.svg";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

export default function SignUpResult() {
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
                  가입 완료 이메일이 {searchParam.get("email") ?? ""} 로
                  전송되었습니다. 이메일을 확인하고 링크를 클릭하여 가입을
                  완료해주세요.
                </span>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
