"use client";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Box,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import React, { use, useEffect } from "react";
import LoadingFormButton from "../buttons/LoadingFormButton";
import { useFormState } from "react-dom";
import { verifyUser } from "@/actions/verifyUser";
import { redirect, RedirectType } from "next/navigation";

type Props = {};

const initialState = {
  error: "",
  message: "",
};

export default function EmailVerificationForm({
  token,
  email,
}: {
  token: string;
  email: string;
}) {
  const [state, verifyUserAction] = useFormState(verifyUser, initialState);
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
    if (state.success) {
      console.log({success: state.success})
    } else if (state.error) {
      alert(state.error);
    }
  }, [state]);

  return (
    <Box component="form" noValidate action={verifyUserAction} sx={{ mt: 1 }}>
      <TextField hidden={true} sx={{display: 'none'}} name="token" value={token} />
      {/* as email text field is disabled, need to add hidden one */}
      <TextField hidden={true} sx={{display: 'none'}} name="email" value={email} />
      <TextField
        size="small"
        margin="normal"
        required
        fullWidth
        // onChange={(e) => setEmail(e.target.value)}
        value={email}
        id="email"
        label="Email Address"
        name="email-show"
        aria-readonly
        disabled
        // autoComplete="email"
        autoFocus
      />
      <TextField
        size="small"
        margin="normal"
        required
        fullWidth
        id="username"
        label="Username"
        name="username"
        autoComplete="username"
      />
      {/* <TextField
                size="small"
                margin="normal"
                required
                fullWidth
                name="password_verification"
                label="Password Verification"
                type="password"
                id="password_verification"
                autoComplete="current-password"
              /> */}
      <TextField
        size="small"
        margin="normal"
        required
        fullWidth
        name="company"
        label="Company"
        id="company"
        autoComplete="company"
      />
      <TextField
        size="small"
        margin="normal"
        required
        fullWidth
        name="password"
        label="Password"
        type={showPassword ? "text" : "password"}
        id="password"
        autoComplete="current-password"
        onChange={(e) => {
          setPassword(e.target.value);
        }}
        error={Boolean(passErrorText.length)}
        helperText={passErrorText?.map((err) => (
          <React.Fragment key={err}>
            <span>{err}</span>
            <br />
          </React.Fragment>
        ))}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
      <LoadingFormButton
        className={
          (email ? "opacity-100 visible" : "opacity-0 invisible") +
          " transition-all duration-1000 ease-in-out"
        }
        type="submit"
        fullWidth
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
      >
        이메일로 가입하기
      </LoadingFormButton>
      {/* <Typography variant="body2" my={2}>
                가입과 동시에 CdBd의{" "}
                <Link href="#" variant="body2">
                  이용약관
                </Link>{" "}
                및{" "}
                <Link href="#" variant="body2">
                  개인정보 처리방침
                </Link>
                에 동의함을 승인하게 됩니다
              </Typography> */}
    </Box>
  );
}
