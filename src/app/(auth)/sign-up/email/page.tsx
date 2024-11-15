"use client";

import styles from "../../style.module.scss";

import LanguageSelector from "@/components/util/LanguageSelector";
import Link from "@mui/material/Link";

import EmailSignupForm from "@/components/forms/EmailSignupForm";
import Image from "next/image";
import logo from "/public/images/logo-hybrid.svg";

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
          <p className={`h1-eng ${styles.title}`}>이메일로 가입하기</p>

          <EmailSignupForm />
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end",
          }}
        >
          <div className={styles.signup}>
            <span className="p2-eng">이미 계정을 가지고 계신가요?</span>
            <Link className="subtitle2-eng" href="/sign-in">
              로그인하기
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
