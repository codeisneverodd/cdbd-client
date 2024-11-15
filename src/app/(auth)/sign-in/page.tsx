"use client";
import styles from "../style.module.scss";

import EmailSignIn from "@/components/forms/EmailSignIn";
import GoogleLoginForm from "@/components/forms/GoogleLoginForm";
import Link from "next/link";
import Image from "next/image";
import logo from "/public/images/logo-hybrid.svg";

import { useState } from "react";
import LanguageSelector from "@/components/util/LanguageSelector";

export default function SignInSide() {
  const [email, setEmail] = useState<string>("");

  return (
    <div className={styles.signInSideWrap}>
      <div className={styles.left}></div>
      <div className={styles.right}>
        <LanguageSelector />

        <div className={styles.formWrap}>
          <div className={styles.formBox}>
            <div className={styles.top} style={{ marginBottom: "80px" }}>
              <Image src={logo} alt="CdBd logo" />
            </div>
            <div className={styles.bottom}>
              <p className={`h1-eng ${styles.title}`}>로그인하기</p>

              <GoogleLoginForm />
              <div className={styles.divider}>
                <span className="subtitle2-eng">또는</span>
              </div>

              <EmailSignIn email={email} setEmail={setEmail} />
              <div className={styles.signup}>
                <span className="p2-eng">아직 계정이 없으신가요?</span>
                <Link className="subtitle2-eng" href="/sign-up">
                  지금 가입하기
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
