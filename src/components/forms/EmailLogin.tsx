"use client";
import styles from "./styles.module.scss";
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
import Link from "next/link";
import { redirect } from "next/navigation";
import React, { Dispatch, SetStateAction, useEffect } from "react";
import { useFormState } from "react-dom";
import LoadingFormButton from "../buttons/LoadingFormButton";
import { usePathname } from "next/navigation";
import Image from "next/image";
import iconError from "/public/images/icon-error.svg";

type Props = {
  email: string;
  setEmail: Dispatch<SetStateAction<string>>;
};

const initialState = {
  error: "",
  message: "",
};

export default function EmailLogin({ email, setEmail }: Props) {
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

        <Link
          href="/reset-password"
          className={`caption text-primary ${styles.forgotPassword}`}
        >
          비밀번호를 잊으셨나요?
        </Link>
      </div>

      <div>
        {email?.length > 0 && (
          <LoadingFormButton
            variant="contained"
            fullWidth
            type="submit"
            disabled={Boolean(passErrorText.length) || !email || !password}
            sx={{ marginTop: "24px", marginBottom: "16px" }}
          >
            Sign In
          </LoadingFormButton>
        )}

        <Typography variant="body1" color="error">
          {state?.error}
        </Typography>
      </div>

      {/* <Typography variant="body2" my={2}>
        가입과 동시에 CdBd의{" "}
        <MuiLink component={Link} href="#" variant="body2">
          이용약관
        </MuiLink>{" "}
        및{" "}
        <MuiLink component={Link} href="#" variant="body2">
          개인정보 처리방침
        </MuiLink>
        에 동의함을 승인하게 됩니다
      </Typography> */}
    </Box>
  );
}
