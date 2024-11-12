"use client";
import styles from "./styles.module.scss";
import { Box, Link as MuiLink, TextField, Typography } from "@mui/material";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import GoogleLoginForm from "./GoogleLoginForm";
import { useFormState } from "react-dom";
import { signup } from "@/actions/signupAction";
import { redirect, RedirectType } from "next/navigation";
import LoadingFormButton from "../buttons/LoadingFormButton";

type Props = {};

const initialState = {
  error: "",
  message: "",
};

export default function SignupForm({}: Props) {
  const [email, setEmail] = React.useState("");
  const [state, signupAction] = useFormState(signup, initialState);

  useEffect(() => {
    if (state?.success) {
      console.log(state.success);
      // add email to local storage
      window.localStorage.setItem("emailForSignIn", email);

      // redirect to email verification page
      redirect("/register-email-sent", RedirectType.push);
    }
    if (state?.error) {
      console.log(state.error);
    }
  }, [email, state]);

  return (
    <>
      {email.length === 0 && (
        <>
          {/* Google login */}
          <GoogleLoginForm />

          <div className={styles.divider}>
            <span className="subtitle2-eng">or</span>
          </div>
        </>
      )}
      <Box
        component="form"
        noValidate
        action={signupAction}
        //   onSubmit={handleSubmit}
      >
        <div className="input-box" style={{ marginBottom: "16px" }}>
          <label htmlFor="email" className="subtitle1-eng">
            Email
          </label>
          <TextField
            color="secondary"
            size="small"
            required
            fullWidth
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            id="email"
            placeholder="Please enter your email address."
            name="email"
            autoComplete="email"
          />
        </div>
        {email.length > 0 && (
          <LoadingFormButton
            className={
              (email ? "opacity-100 visible" : "opacity-0 invisible") +
              " transition-all duration-1000 ease-in-out subtitle-eng"
            }
            type="submit"
            fullWidth
            variant="contained"
            disabled={email.length === 0}
            sx={{ marginTop: "8px", marginBottom: "16px" }}
          >
            Sign Up
          </LoadingFormButton>
        )}
        <span className="caption-eng text-grey-400">
          By signing up, you agree to CdBd&rsquo;s Terms of Service and Privacy
          Policy.
        </span>
      </Box>
    </>
  );
}
