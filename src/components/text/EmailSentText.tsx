'use client';
import { Typography } from '@mui/material';
import { useSearchParams } from 'next/navigation';
import React from 'react';

type Props = {};

export default function EmailSentText({}: Props) {
  const searchParam = useSearchParams();

  return (
    <Typography variant="h5">
      {searchParam.get('email')}
      (으)로 비밀번호 재설정 링크를 보냈습니다. 이메일을 확인하고 링크를 클릭해 비밀번호를
      재설정하세요.
    </Typography>
  );
}
