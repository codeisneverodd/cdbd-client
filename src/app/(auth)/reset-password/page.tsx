"use client";
import styles from "../style.module.scss";

import Image from "next/image";
import Link from "next/link";
import logo from "/public/images/logo-hybrid.svg";

import LoadingFormButton from "@/components/buttons/LoadingFormButton";
import LanguageSelector from "@/components/util/LanguageSelector";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import { Box, IconButton, InputAdornment, TextField } from "@mui/material";
import { usePathname, useRouter } from "next/navigation";
import React, { Dispatch, SetStateAction, useState } from "react";
import iconCheck from "/public/images/icon-check.svg";
import iconError from "/public/images/icon-error.svg";
import { supaBrowserClient } from "@/lib/supabase/createBrowserClient";

type Props = {
  email: string;
  setEmail: Dispatch<SetStateAction<string>>;
};

export default function ResetPassword() {
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
            <div className={`${styles.bottom} ${styles.resetPassword}`}>
              <section>
                <p className={`h1-eng ${styles.title}`}>비밀번호 재설정</p>
                <span
                  className="p2-eng text-grey-900"
                  style={{ marginBottom: "24px" }}
                >
                  로그인에 어려움을 겪고있나요? 아래 이메일을 적어주시면
                  비밀번호 재설정 링크를 보내드릴게요.
                </span>
                <ResetPasswordForm email={email} setEmail={setEmail} />
              </section>
              <div className={styles.signup}>
                <span className="p2-eng">비밀번호가 기억나셨나요?</span>
                <Link className="subtitle2-eng" href="/sign-in">
                  로그인하기
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ResetPasswordForm({ email, setEmail }: Props) {
  const supabase = supaBrowserClient();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/reset-password/form`,
    });
    setLoading(false);

    if (error) {
      alert("링크 전송에 실패했습니다.");
      return;
    }

    router.push(`/reset-password/sent?email=${email}`);
  };

  return (
    <Box
      component="form"
      className={styles.emailLoginWrap}
      onSubmit={handleSubmit}
    >
      <div>
        <div className="input-box" style={{ marginBottom: "20px" }}>
          <label htmlFor="email" className="subtitle1-eng">
            이메일
          </label>
          <TextField
            color="secondary"
            size="small"
            required
            fullWidth
            value={email}
            id="email"
            placeholder="이메일을 입력해주세요"
            name="email"
            autoComplete="email"
            autoFocus
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
      </div>

      <div>
        <LoadingFormButton
          variant="contained"
          fullWidth
          type="submit"
          disabled={email.length <= 0}
          sx={{ marginTop: "24px", marginBottom: "16px" }}
          loading={loading}
        >
          재설정 링크 받기
        </LoadingFormButton>
      </div>
    </Box>
  );
}
