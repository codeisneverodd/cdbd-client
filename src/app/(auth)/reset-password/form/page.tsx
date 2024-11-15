"use client";
import styles from "../../style.module.scss";

import PasswordResetContinueForm from "@/components/forms/PasswordResetContinueForm";
import LanguageSelector from "@/components/util/LanguageSelector";
import Image from "next/image";
import logo from "/public/images/logo-hybrid.svg";

export default function ContinueSignUp() {
  return (
    <>
      <div className={styles.signInSideWrap}>
        <div className={styles.left}></div>
        <div className={styles.right}>
          <LanguageSelector />

          <div className={styles.formWrap}>
            <ContinueBox />
          </div>
        </div>
      </div>
    </>
  );
}

function ContinueBox() {
  return (
    <div className={styles.formBox}>
      <div className={styles.top} style={{ marginBottom: "92px" }}>
        <Image src={logo} alt="CdBd logo" />
      </div>
      <div className={`${styles.bottom} ${styles.signupBottom}`}>
        <div>
          <p className={`h1-eng ${styles.title}`}>비밀번호 재설정 완료하기</p>

          <PasswordResetContinueForm />
        </div>
      </div>
    </div>
  );
}
