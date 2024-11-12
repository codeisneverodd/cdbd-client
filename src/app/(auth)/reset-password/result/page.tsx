"use client";
import styles from "../../style.module.scss";

import Image from "next/image";
import logo from "/public/images/logo-hybrid.svg";
import LanguageSelector from "@/components/util/LanguageSelector";
import { Button, Stack } from "@mui/material";
import React from "react";
import iconCheck from "/public/images/icon-check.svg";

export default function ResetPasswordResult() {
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
                  <p className={`h1-eng text-information ${styles.title}`}>
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
                    <span>Password Reset Complete</span>
                  </p>
                </Stack>
                <span
                  className="p2-eng text-grey-900"
                  style={{
                    marginBottom: "24px",
                    transform: "translate(0, -8px)",
                  }}
                >
                  Having trouble signing in? Enter your email account below, and
                  we&rsquo;ll send you a reset link.
                </span>
              </section>

              <Button variant="contained" fullWidth href="/sign-in">
                Sign In
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
