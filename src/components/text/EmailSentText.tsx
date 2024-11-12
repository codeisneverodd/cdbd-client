"use client";
import { Typography } from "@mui/material";
import React from "react";

type Props = {};

export default function EmailSentText({}: Props) {
  const emailLocal = typeof window === "undefined" ? '' : localStorage?.getItem('email');
  const [email, setEmail] = React.useState(emailLocal);

  React.useEffect(() => {

    if(typeof window !== "undefined") {
      setEmail(localStorage?.getItem('email'));
    }

    // return () => {
    //   localStorage.removeItem("emailForSignIn");
    // };
  }, []);

  return (
    <Typography variant="h5">
      {email}(으)로 비밀번호 재설정 링크를 보냈습니다. 이메일을 확인하고 링크를
      클릭해 비밀번호를 재설정하세요.
    </Typography>
  );
}
