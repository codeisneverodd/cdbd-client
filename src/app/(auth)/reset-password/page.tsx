"use client";
import styles from "../style.module.scss";

import Link from "next/link";
import Image from "next/image";
import logo from "/public/images/logo-hybrid.svg";

import { useState } from "react";
import LanguageSelector from "@/components/util/LanguageSelector";
import { credentialLogin } from "@/actions/credentialLogin";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import {
  Box,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
  Link as MuiLink,
} from "@mui/material";
import { redirect } from "next/navigation";
import React, { Dispatch, SetStateAction, useEffect } from "react";
import { useFormState } from "react-dom";
import { usePathname } from "next/navigation";
import iconError from "/public/images/icon-error.svg";
import LoadingFormButton from "@/components/buttons/LoadingFormButton";

type Props = {
  email: string;
  setEmail: Dispatch<SetStateAction<string>>;
};

const initialState = {
  error: "",
  message: "",
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
            <div
              className={styles.top}
              style={{ marginBottom: email.length > 0 ? "100px" : "80px" }}
            >
              <Image src={logo} alt="CdBd logo" />
            </div>
            <div className={`${styles.bottom} ${styles.resetPassword}`}>
              <section>
                <p className={`h1-eng ${styles.title}`}>Reset Password</p>
                <span
                  className="p2-eng text-grey-900"
                  style={{ marginBottom: "24px" }}
                >
                  Having trouble signing in? Enter your email account below, and
                  we&rsquo;ll send you a reset link.
                </span>
                {/* Email login */}
                <ResetPasswordForm email={email} setEmail={setEmail} />
              </section>
              <div className={styles.signup}>
                <span className="p2-eng">Remember your password?</span>
                <Link className="subtitle2-eng" href="/sign-in">
                    Sign In
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
  const pathname = usePathname();
  const [state, credentialLoginAction] = useFormState(
    credentialLogin,
    initialState
  );
  const [password, setPassword] = React.useState("");
  const [showPassword, setShowPassword] = React.useState(false);

  const passErrorText = React.useMemo(() => {
    if (!password) return [];

    var errorMessages = [];

    if (password.length < 8)
      errorMessages.push("비밀번호는 최소 8자리 이상이어야 합니다");
    if (!/[A-Z]/.test(password))
      errorMessages.push("비밀번호는 최소 1개 이상의 대문자를 포함해야 합니다");
    if (!/[a-z]/.test(password))
      errorMessages.push("비밀번호는 최소 1개 이상의 소문자를 포함해야 합니다");
    if (!/[0-9]/.test(password))
      errorMessages.push("비밀번호는 최소 1개 이상의 숫자를 포함해야 합니다");
    if (!/[!@#$%^&*]/.test(password))
      errorMessages.push(
        "비밀번호는 최소 1개 이상의 특수문자를 포함해야 합니다"
      );

    return errorMessages;
  }, [password]);

  useEffect(() => {
    if (pathname !== "/sign-in") {
      // alert("You are not on the sign-in page");
      redirect("/sign-in");
    }
  }, [pathname]);

  return (
    <Box
      component="form"
      action={credentialLoginAction}
      className={styles.emailLoginWrap}
    >
      <div>
        <div className="input-box" style={{ marginBottom: "20px" }}>
          <label htmlFor="email" className="subtitle1-eng">
            Email
          </label>
          <TextField
            color="secondary"
            size="small"
            required
            fullWidth
            value={email}
            id="email"
            placeholder="Please enter your email address."
            name="email"
            autoComplete="email"
            autoFocus
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="input-box">
          <label htmlFor="password" className="subtitle1-eng">
            Password
          </label>
          <TextField
            color="secondary"
            size="small"
            required
            fullWidth
            name="password"
            placeholder="Please enter your password."
            type={showPassword ? "text" : "password"}
            id="password"
            autoComplete="current-password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            error={Boolean(passErrorText.length)}
            helperText={
              passErrorText.length > 0 &&
              passErrorText?.map((err) => (
                <div className="helperText" key={err}>
                  <Image src={iconError} alt="error" width={10} height={10} />
                  <span>{err}</span>
                </div>
              ))
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

      <div>
        <LoadingFormButton
          variant="contained"
          fullWidth
          type="submit"
          disabled={Boolean(passErrorText.length) || !email || !password}
          sx={{ marginTop: "24px", marginBottom: "16px" }}
        >
          Get Reset Link
        </LoadingFormButton>

        <Typography variant="body1" color="error">
          {state?.error}
        </Typography>
      </div>
    </Box>
  );
}
