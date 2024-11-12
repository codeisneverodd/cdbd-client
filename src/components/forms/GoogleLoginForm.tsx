"use client";

import styles from "./styles.module.scss";
import React from "react";
import LoadingFormButton from "../buttons/LoadingFormButton";
import { useFormState } from "react-dom";
import { googleLogin } from "@/actions/googleLogin";
import iconGoogle from "/public/images/icon-google-login.svg";
import Image from "next/image";

type Props = {};

const initialState = {
  error: "",
  message: "",
};

export default function GoogleLoginForm({}: Props) {
  const [state, googleLoginAction] = useFormState(googleLogin, initialState);

  return (
    <form action={googleLoginAction}>
      <LoadingFormButton
        fullWidth
        variant="outlined"
        color="info"
        type="submit"
        className={styles.googleButton}
      >
        <Image src={iconGoogle} alt="google logo" />
        Sign up with Google
      </LoadingFormButton>
      {state?.error && <p className="text-red-500">{state.error}</p>}
    </form>
  );
}
