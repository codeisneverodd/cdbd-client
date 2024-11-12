import { Stack } from '@mui/material'
import Image from 'next/image'
import React from 'react'
import iconInfo from '/public/images/icon-info.svg';

export default function InfoText({children}: {children: React.ReactNode}) {
  return (
    <Stack direction="row" gap="4px" mt="12px">
        <Image src={iconInfo} alt="iconInfo" style={{height: 18}}/>
        <span className="caption" style={{color: "var(--color-success)"}}>
            {children}
        </span>
    </Stack>
  )
}
