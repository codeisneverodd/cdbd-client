'use client';

import { Box, IconButton, InputAdornment, TextField } from '@mui/material';
import React, { useEffect } from 'react';
import LoadingFormButton from '../buttons/LoadingFormButton';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import Image from 'next/image';
import iconError from '/public/images/icon-error.svg';
import { useSearchParams } from 'next/navigation';
import { supaBrowserClient } from '@/lib/supabase/createBrowserClient';

type Props = {};

const initialState = {
  error: '',
  message: '',
};

const getAccessTokenFromHash = () => {
  const hash = window.location.hash;
  const params = new URLSearchParams(hash.replace('#', ''));
  return params.get('access_token') ?? '';
};

export default function SignupContinueForm({}: Props) {
  // const searchParams = useSearchParams();
  // const [email, setEmail] = React.useState(searchParams.get('email'));
  const [password, setPassword] = React.useState('');
  const [showPassword, setShowPassword] = React.useState(false);

  const supabase = supaBrowserClient();

  const passErrorText = React.useMemo(() => {
    if (!password) return [];

    var errorMessages = [];

    if (password.length < 8) errorMessages.push('비밀번호는 최소 8자리 이상이어야 합니다');
    if (!/[A-Z]/.test(password))
      errorMessages.push('비밀번호는 최소 1개 이상의 대문자를 포함해야 합니다');
    if (!/[a-z]/.test(password))
      errorMessages.push('비밀번호는 최소 1개 이상의 소문자를 포함해야 합니다');
    if (!/[0-9]/.test(password))
      errorMessages.push('비밀번호는 최소 1개 이상의 숫자를 포함해야 합니다');
    if (!/[!@#$%^&*]/.test(password))
      errorMessages.push('비밀번호는 최소 1개 이상의 특수문자를 포함해야 합니다');

    return errorMessages;
  }, [password]);

  useEffect(() => {
    console.log(getAccessTokenFromHash());
    const getUser = async () => {
      const { data, error } = await supabase.auth.signInWithIdToken({
        provider: 'email',
        token: getAccessTokenFromHash(),
      });

      // const { data, error } = await supabase.auth.getUser();
      console.log(data);
      console.log(error);
    };

    getUser();
  });

  return (
    <>
      <Box
        component="form"
        noValidate
        sx={{
          display: 'flex',
          flexDirection: 'column',
          flexGrow: '1',
          height: '100%',
          justifyContent: 'space-between',
        }}
      >
        <div>
          <div className="input-box" style={{ marginBottom: '16px' }}>
            <label htmlFor="firstName" className="subtitle1-eng">
              First Name
            </label>
            <TextField
              color="secondary"
              size="small"
              required
              fullWidth
              id="firstName"
              placeholder="Please enter your firstName address."
              name="firstName"
            />
          </div>
          <div className="input-box" style={{ marginBottom: '16px' }}>
            <label htmlFor="lastName" className="subtitle1-eng">
              Last Name
            </label>
            <TextField
              color="secondary"
              size="small"
              required
              fullWidth
              id="lastName"
              placeholder="Please enter your lastName address."
              name="lastName"
            />
          </div>
          <div className="input-box">
            <label htmlFor="password" className="subtitle1-eng">
              Password
            </label>
            <TextField
              color="secondary"
              size="small"
              required
              fullWidth
              name="password"
              placeholder="Please enter your password."
              type={showPassword ? 'text' : 'password'}
              id="password"
              autoComplete="current-password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              error={Boolean(passErrorText.length)}
              helperText={
                passErrorText.length > 0 &&
                passErrorText?.map((err) => (
                  <div className="helperText" key={err}>
                    <Image src={iconError} alt="error" width={10} height={10} />
                    <span>{err}</span>
                  </div>
                ))
              }
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      sx={{ opacity: 0.5, width: '20px', height: '20px' }}
                    >
                      {showPassword ? <VisibilityOffOutlinedIcon /> : <VisibilityOutlinedIcon />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </div>
        </div>

        <LoadingFormButton
          className={'opacity-100 visible transition-all duration-1000 ease-in-out subtitle-eng'}
          type="submit"
          fullWidth
          variant="contained"
          // disabled={email.length === 0}
          sx={{ marginTop: '8px' }}
        >
          Sign Up
        </LoadingFormButton>
      </Box>
    </>
  );
}
