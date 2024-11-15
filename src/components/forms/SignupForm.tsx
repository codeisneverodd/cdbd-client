"use client";
import { Button } from "@mui/material";
import styles from "./styles.module.scss";

import LoadingFormButton from "../buttons/LoadingFormButton";
import GoogleLoginForm from "./GoogleLoginForm";

type Props = {};

export default function SignupForm({}: Props) {
  return (
    <>
      <>
        <GoogleLoginForm type="signup" />

        <div className={styles.divider}>
          <span className="subtitle2-eng">또는</span>
        </div>
      </>
      <LoadingFormButton
        className={" transition-all duration-1000 ease-in-out subtitle-eng"}
        href="/sign-up/email"
        type="submit"
        fullWidth
        variant="contained"
        sx={{ marginTop: "8px", marginBottom: "16px" }}
      >
        이메일로 가입하기
      </LoadingFormButton>
      <Button
        variant="outlined"
        color="info"
        className="subtitle1-eng"
        fullWidth
        sx={{ marginBottom: "16px" }}
        onClick={() => {
          alert("아직 구현되지 않았습니다.");
        }}
      >
        가입없이 시작하기
      </Button>
    </>
  );
}
