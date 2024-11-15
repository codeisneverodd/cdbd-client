"use client";

import { supaBrowserClient } from "@/lib/supabase/createBrowserClient";
import { Box, TextField } from "@mui/material";
import React from "react";
import LoadingFormButton from "../buttons/LoadingFormButton";
import { useRouter } from "next/navigation";

type Props = {};

export default function SignupContinueForm({}: Props) {
  const [loading, setLoading] = React.useState(false);
  const router = useRouter();
  const [name, setName] = React.useState("");
  const supabase = supaBrowserClient();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setLoading(true);
    e.preventDefault();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      alert("가입을 완료할 수 없습니다.");
      return;
    }

    const { error } = await supabase
      .from("user")
      .update({
        name: name,
      })
      .eq("id", user.id);

    if (error) {
      alert("가입을 완료할 수 없습니다.");
    }
    router.push("/");
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
          <div className="input-box" style={{ marginBottom: "16px" }}>
            <label htmlFor="name" className="subtitle1-eng">
              이름
            </label>
            <TextField
              color="secondary"
              size="small"
              required
              fullWidth
              id="name"
              placeholder="이름을 입력해주세요"
              name="name"
              onChange={(e) => setName(e.target.value)}
            />
          </div>
        </div>

        <LoadingFormButton
          className={
            "opacity-100 visible transition-all duration-1000 ease-in-out subtitle-eng"
          }
          type="submit"
          loading={loading}
          fullWidth
          variant="contained"
          disabled={name.length === 0}
          sx={{ marginTop: "8px" }}
        >
          가입 완료하기
        </LoadingFormButton>
      </Box>
    </>
  );
}
