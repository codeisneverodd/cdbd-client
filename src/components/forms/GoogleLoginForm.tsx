"use client";

import styles from "./styles.module.scss";
import React, { useState } from "react";
import LoadingFormButton from "../buttons/LoadingFormButton";
import iconGoogle from "/public/images/icon-google-login.svg";
import Image from "next/image";
import { supaBrowserClient } from "@/lib/supabase/createBrowserClient";

export default function GoogleLoginForm({
  type = "signin",
}: {
  type?: "signup" | "signin";
}) {
  const supabase = supaBrowserClient();
  const [error, setError] = useState<string>();

  const handleGoogleLogin = async () => {
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback`,
        },
      });

      if (error) {
        setError(
          "구글 로그인을 불러오는데 오류가 발생했습니다. 다시 시도해주세요."
        );
        throw error;
      }

      return { success: true };
    } catch (error) {
      return { error: "Failed to sign in" };
    }
  };

  return (
    <form onSubmit={handleGoogleLogin}>
      <LoadingFormButton
        fullWidth
        variant="outlined"
        color="info"
        type="submit"
        className={styles.googleButton}
      >
        <Image src={iconGoogle} alt="google logo" />
        구글로 {type === "signin" ? "로그인하기" : "가입하기"}
      </LoadingFormButton>
      {error && <p className="text-red-500">{error}</p>}
    </form>
  );
}
