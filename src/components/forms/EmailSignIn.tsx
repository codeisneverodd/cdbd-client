"use client";
import { supaBrowserClient } from "@/lib/supabase/createBrowserClient";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import {
  Box,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { Dispatch, SetStateAction } from "react";
import LoadingFormButton from "../buttons/LoadingFormButton";
import styles from "./styles.module.scss";

type Props = {
  email: string;
  setEmail: Dispatch<SetStateAction<string>>;
};

export default function EmailSignIn({ email, setEmail }: Props) {
  const supabase = supaBrowserClient();
  const router = useRouter();
  const [password, setPassword] = React.useState("");
  const [showPassword, setShowPassword] = React.useState(false);
  const [error, setError] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  const handleLogin = async () => {
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    setLoading(false);

    if (error) {
      return setError("로그인에 실패했습니다.");
    }
    router.push("/");
  };

  return (
    <Box
      component="form"
      onSubmit={(e) => {
        e.preventDefault();
        handleLogin();
      }}
      className={styles.emailLoginWrap}
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
            placeholder="이메일 주소를 입력해주세요."
            name="email"
            autoComplete="email"
            autoFocus
            onChange={(e) => setEmail(e.target.value)}
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

        <Link
          href="/reset-password"
          className={`caption text-primary ${styles.forgotPassword}`}
        >
          비밀번호를 잊으셨나요?
        </Link>
      </div>

      <div>
        <LoadingFormButton
          loading={loading}
          variant="contained"
          fullWidth
          type="submit"
          disabled={!email || !password}
          sx={{ marginTop: "24px", marginBottom: "16px" }}
        >
          로그인
        </LoadingFormButton>
      </div>
      <Typography variant="body1" color="error">
        {error}
      </Typography>
    </Box>
  );
}
