"use client";

import { supaBrowserClient } from "@/lib/supabase/createBrowserClient";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import { Box, IconButton, InputAdornment, TextField } from "@mui/material";
import { useRouter } from "next/navigation";
import React from "react";
import LoadingFormButton from "../buttons/LoadingFormButton";
import iconCheck from "/public/images/icon-check.svg";
import iconError from "/public/images/icon-error.svg";

import Image from "next/image";

type Props = {};

export default function PasswordResetContinueForm({}: Props) {
  const [loading, setLoading] = React.useState(false);
  const router = useRouter();
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
  const supabase = supaBrowserClient();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setLoading(true);
    e.preventDefault();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      alert("비밀번호 재설정을 완료할 수 없습니다.");
      return;
    }
    const { error } = await supabase.auth.updateUser({
      password: password,
    });

    if (error) {
      return alert("비밀번호 재설정을 완료할 수 없습니다.");
    }
    router.push("/reset-password/completed");
    setLoading(false);
  };

  return (
    <>
      <Box
        component="form"
        noValidate
        sx={{
          display: "flex",
          flexDirection: "column",
          flexGrow: "1",
          height: "100%",
          justifyContent: "space-between",
        }}
        onSubmit={handleSubmit}
      >
        <div>
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
          </div>
        </div>

        <LoadingFormButton
          className={" transition-all duration-1000 ease-in-out subtitle-eng "}
          type="submit"
          fullWidth
          variant="contained"
          disabled={helperTexts.some((h) => h.error)}
          sx={{ marginTop: "8px", marginBottom: "16px" }}
          loading={loading}
        >
          재설정 완료하기
        </LoadingFormButton>
      </Box>
    </>
  );
}
