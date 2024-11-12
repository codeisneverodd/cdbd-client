"use client";
import styles from "../../style.module.scss";

import Image from "next/image";
import logo from "/public/images/logo-hybrid.svg";
import LanguageSelector from "@/components/util/LanguageSelector";
import { Button, Stack } from "@mui/material";
import React from "react";
import iconCheck from "/public/images/icon-check.svg";
import Link from "next/link";

export default function SignUpResult() {
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
                    <span>Verification Email Sent</span>
                  </p>
                </Stack>
                <span
                  className="p2-eng text-grey-900"
                  style={{
                    marginBottom: "24px",
                    transform: "translate(0, -8px)",
                  }}
                >
                  A sign-up link has been sent to id@email.com. Please check
                  your email and click the link to continue signing up.
                </span>
              </section>

              <div style={{ display: "flex", flexDirection: "column", justifyContent: "flex-end" }}>
                <Button
                  variant="outlined"
                  color="info"
                  className="subtitle1-eng"
                  fullWidth
                  sx={{ marginBottom: "16px" }}
                >
                  Start Without Signing Up
                </Button>

                <div className={styles.signup}>
                  <span className="p2-eng">Already have an account?</span>
                  <Link className="subtitle2-eng" href="/sign-in">
                    Sign In
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
