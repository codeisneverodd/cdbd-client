"use client";

import { Button } from "@mui/material";
import { useRouter } from "next/navigation";

export default function NotFound() {
  const router = useRouter();
  return (
    <div>
      잘못된 페이지입니다.{" "}
      <Button
        onClick={() => {
          router.back();
        }}
      >
        이전 페이지로
      </Button>
    </div>
  );
}
