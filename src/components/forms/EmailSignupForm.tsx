"use client";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import { Box, IconButton, InputAdornment, TextField } from "@mui/material";
import iconCheck from "/public/images/icon-check.svg";
import iconError from "/public/images/icon-error.svg";

import { supaBrowserClient } from "@/lib/supabase/createBrowserClient";
import Image from "next/image";
import React from "react";
import LoadingFormButton from "../buttons/LoadingFormButton";
import { useRouter } from "next/navigation";

type Props = {};

export default function EmailSignupForm({}: Props) {
  const supabase = supaBrowserClient();
  const [loading, setLoading] = React.useState(false);
  const router = useRouter();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const [showPassword, setShowPassword] = React.useState(false);

  const helperTexts = [
    {
      msg: "비밀번호는 최소 8자리 이상이어야 합니다",
      error: password.length < 8,
    },
    {
      msg: "비밀번호는 최소 1개 이상의 대문자를 포함해야 합니다",
      error: !/[A-Z]/.test(password),
    },
    {
      msg: "비밀번호는 최소 1개 이상의 숫자를 포함해야 합니다",
      error: !/[0-9]/.test(password),
    },
    {
      msg: "비밀번호는 최소 1개 이상의 특수문자를 포함해야 합니다",
      error: !/[!@#$%^&*]/.test(password),
    },
  ];

  const handleSignUp = async () => {
    setLoading(true);
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/sign-up/verified`,
      },
    });
    setLoading(false);
    if (error) {
      return alert("회원가입을 진행할 수 없습니다. 다시 시도해주세요.");
    }

    return router.push(`/register-email-sent?email=${email}`);
  };

  return (
    <>
      <Box
        component="form"
        noValidate
        onSubmit={(e) => {
          e.preventDefault();
          handleSignUp();
        }}
      >
        <div className="input-box" style={{ marginBottom: "16px" }}>
          <label htmlFor="email" className="subtitle1-eng">
            이메일
          </label>
          <TextField
            color="secondary"
            size="small"
            required
            fullWidth
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            id="email"
            placeholder="이메일 주소를 입력해주세요."
            name="email"
            autoComplete="email"
          />
        </div>
        <div className="input-box">
          <label htmlFor="password" className="subtitle1-eng">
            비밀번호
          </label>
          <TextField
            color="secondary"
            size="small"
            required
            fullWidth
            name="password"
            placeholder="비밀번호를 입력해주세요."
            type={showPassword ? "text" : "password"}
            id="password"
            autoComplete="current-password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            error={
              Boolean(helperTexts.some((h) => h.error)) && password.length > 0
            }
            helperText={
              password.length > 0
                ? helperTexts.map((h) => (
                    <span key={h.msg} className="helperText block">
                      <Image
                        src={h.error ? iconError : iconCheck}
                        alt="error"
                        width={10}
                        height={10}
                      />
                      <span className={h.error ? "" : "text-primary"}>
                        {h.msg}
                      </span>
                    </span>
                  ))
                : ""
            }
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword(!showPassword)}
                    sx={{ opacity: 0.5, width: "20px", height: "20px" }}
                  >
                    {showPassword ? (
                      <VisibilityOffOutlinedIcon />
                    ) : (
                      <VisibilityOutlinedIcon />
                    )}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <LoadingFormButton
            className={
              // (email ? "opacity-100 visible" : "opacity-0 invisible") +
              " transition-all duration-1000 ease-in-out subtitle-eng "
            }
            type="submit"
            fullWidth
            variant="contained"
            disabled={email.length === 0 || helperTexts.some((h) => h.error)}
            sx={{ marginTop: "8px", marginBottom: "16px" }}
            loading={loading}
          >
            가입하기
          </LoadingFormButton>
        </div>

        <span className="caption-eng text-grey-400">
          가입함으로써 CdBd의 서비스 약관 및 개인정보 보호정책에 동의합니다.
        </span>
      </Box>
    </>
  );
}
