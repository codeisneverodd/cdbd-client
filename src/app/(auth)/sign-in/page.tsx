"use client";
import styles from "../style.module.scss";

import EmailLogin from "@/components/forms/EmailLogin";
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
            <div
              className={styles.top}
              style={{ marginBottom: email.length > 0 ? "100px" : "80px" }}
            >
              <Image src={logo} alt="CdBd logo" />
            </div>
            <div className={styles.bottom}>
              <p className={`h1-eng ${styles.title}`}>Sign In</p>

              {/* Google login */}
              {email.length === 0 && (
                <>
                  <GoogleLoginForm />
                  <div className={styles.divider}>
                    <span className="subtitle2-eng">or</span>
                  </div>
                </>
              )}

              {/* Email login */}
              <EmailLogin email={email} setEmail={setEmail}/>
              <div className={styles.signup}>
                <span className="p2-eng">Not registered yet?</span>
                <Link className="subtitle2-eng" href="/sign-up">
                  Sign Up Now
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
