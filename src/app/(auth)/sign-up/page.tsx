"use client";

import * as React from "react";
import styles from "../style.module.scss";

import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import SignupForm from "@/components/forms/SignupForm";
import LanguageSelector from "@/components/util/LanguageSelector";

import Image from "next/image";
import logo from "/public/images/logo-hybrid.svg";
import SignupContinueForm from "@/components/forms/SignupContinueForm";

function Copyright(props: any) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      {...props}
      sx={{ my: 2, mx: 4 }}
    >
      이미 가입하셨나요?{" "}
      <Link href="/sign-in" variant="body2">
        로그인
      </Link>
    </Typography>
  );
}

export default function SignInSide() {
  return (
    <>
      <div className={styles.signInSideWrap}>
        <div className={styles.left}></div>
        <div className={styles.right}>
          <LanguageSelector />

          <div className={styles.formWrap}>
            <SignUpBox />
          </div>
        </div>
      </div>
    </>
  );
}

function SignUpBox() {
  return (
    <div className={styles.formBox}>
      <div className={styles.top} style={{ marginBottom: "92px" }}>
        <Image src={logo} alt="CdBd logo" />
      </div>
      <div className={`${styles.bottom} ${styles.signupBottom}`}>
        <div>
          <p className={`h1-eng ${styles.title}`}>지금 가입하기</p>

          <SignupForm />
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end",
          }}
        >
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
  );
}
