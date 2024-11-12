'use client'
import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { IconButton, InputAdornment, Select } from '@mui/material';
// import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';
import { redirect, useRouter } from 'next/navigation'
// import { defaultTheme } from '@/theme';
// import { hash } from 'bcrypt';
import formData from 'form-data'
// import jwt from "jsonwebtoken";
import axios from 'axios';
import { Visibility, VisibilityOff } from '@mui/icons-material';

function Copyright(props: any) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      {...props}
      sx={{ my: 2, mx: 4 }}
    >
      이미 가입하셨나요?{" "}
      <Link href="/sign-in" variant="body2">
        로그인
      </Link>
    </Typography>
  );
}

function LanguageSelector() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        bgcolor: 'background.paper',
        p: 2,
      }}
    >
      <Select
        native
        size='small'
        value={'en'}
        onChange={() => {}}
        inputProps={{
          name: 'language',
          id: 'language-selector',
        }}
      >
        <option value={'en'}>English</option>
        <option value={'ko'}>한국어</option>
      </Select>
    </Box>
  );
}

export default function SignInSide({ params }: { params: { token: string } }) {
  // const [user, setUser] = React.useState(null);
  const [isEmailSent, setIsEmailSent] = React.useState(false);
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [showPassword, setShowPassword] = React.useState(false);

  const router = useRouter();

  const passErrorText = React.useMemo(() => {
    if(!password)
      return [];
    
    var errorMessages = [];

    if(password.length < 8)
      errorMessages.push('비밀번호는 최소 8자리 이상이어야 합니다');
    if(!/[A-Z]/.test(password))
      errorMessages.push('비밀번호는 최소 1개 이상의 대문자를 포함해야 합니다');
    if(!/[a-z]/.test(password))
      errorMessages.push('비밀번호는 최소 1개 이상의 소문자를 포함해야 합니다');
    if(!/[0-9]/.test(password))
      errorMessages.push('비밀번호는 최소 1개 이상의 숫자를 포함해야 합니다');
    if(!/[!@#$%^&*]/.test(password))
      errorMessages.push('비밀번호는 최소 1개 이상의 특수문자를 포함해야 합니다');

    return errorMessages;
  }, [password])

  
  React.useEffect(() => {
    axios.get(`/api/register/${params.token}`).then(
      (response) => {
        console.log(response)
        response.data.email && setEmail(response.data.email)
      },
      (error) => {
        console.log(error)
        // alert('invalid token')
      }
    )
  }, [params.token])

  const handleSubmit = (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // if(e.currentTarget?.password.value !== e.currentTarget?.password_verification.value)
    //   return alert('Passwords do not match');

    axios.post(`/api/register/${params.token}`, {
      userName: e.currentTarget?.username.value,
      password: e.currentTarget?.password.value,
      companyName: e.currentTarget?.company.value
    }).then(
      (response) => {
        if(response.status !== 200)
          return alert('Error registering');
        // setUserToken(response.data)
        console.log(response)
        // redirect('/dashboard')
        router.push('/dashboard')
      },
      (error) => {
        if(error.response.status === 409)
          return alert('Username is already in use');
        alert('Error registering')
        console.log(error)
      }
    )
  }

  return (
      <Grid container component="main" sx={{ height: "100vh" }}>
        <Grid
          item
          xs={false}
          sm={4}
          md={6}
          sx={{
            display: "flex",
            flexDirection: "column",
            backgroundImage:
              "url(https://www.notion.so/image/https%3A%2F%2Fimages.unsplash.com%2Fphoto-1582642017153-e36e8796b3f8%3Fixlib%3Drb-1.2.1%26q%3D80%26cs%3Dtinysrgb%26fm%3Djpg%26crop%3Dentropy?table=block&id=d895f4ee-e586-4d3a-b83e-f8b70555dbc1&cache=v2)",
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "left",
          }}
        >
          <Box flex={1} />
          <Typography variant="body2" align="center" sx={{ color: "#fff" }}>
            가입없이 시작하기/ Getting Started Without signing up
          </Typography>
          <Box
            sx={{
              mb: 8,
              mt: 2,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              color: "#fff",
            }}
          >
            <Button
              variant="text"
              fullWidth
              color="inherit"
              sx={{ bgcolor: "#9747FF55" }}
            >
              지금 바로 CdBd 에디터를 경험하세요
            </Button>
          </Box>
        </Grid>
        <Grid
          item
          xs={12}
          sm={8}
          md={6}
          component={Paper}
          display={"flex"}
          flexDirection={"column"}
          justifyContent={"center"}
          elevation={6}
          square
        >
          <LanguageSelector />
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "left",
              justifyContent: "center",
            }}
          >
            <Typography component="h1" variant="h5">
                이어서 가입하기
            </Typography>

            {/* {!email && (
              <>
                <Box sx={{ mt: 3, mb: 2 }}>
                  <GoogleOAuthProvider clientId={clientId}>
                    <GoogleLogin
                      width={"100%"}
                      size="large"
                      onSuccess={handleSuccess}
                      onError={handleFailure}
                    />
                  </GoogleOAuthProvider>
                </Box>

                <Typography component="h1" variant="body1" alignSelf={"center"}>
                  Or
                </Typography>
              </>
            )} */}

            <Box
              component="form"
              noValidate
              // action={createUser}
              onSubmit={handleSubmit}
              sx={{ mt: 1 }}
            >
              <TextField
                size="small"
                margin="normal"
                required
                fullWidth
                // onChange={(e) => setEmail(e.target.value)}
                value={email}
                id="email"
                label="Email Address"
                name="email"
                aria-readonly
                disabled
                autoComplete="email"
                autoFocus
              />
              <TextField
                size="small"
                margin="normal"
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                autoComplete="username"
              />
              {/* <TextField
                size="small"
                margin="normal"
                required
                fullWidth
                name="password_verification"
                label="Password Verification"
                type="password"
                id="password_verification"
                autoComplete="current-password"
              /> */}
              <TextField
                size="small"
                margin="normal"
                required
                fullWidth
                name="company"
                label="Company"
                id="company"
                autoComplete="company"
              />
              <TextField
                size="small"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type={showPassword ? 'text' : 'password'}
                id="password"
                autoComplete="current-password"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                error={Boolean(passErrorText.length)}
                helperText={passErrorText?.map(err=><React.Fragment key={err}><span>{err}</span><br/></React.Fragment>)}
                InputProps={
                  {
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    )
                  }
                }
              />
              <Button
                className={
                  (email ? "opacity-100 visible" : "opacity-0 invisible") +
                  " transition-all duration-1000 ease-in-out"
                }
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                이메일로 가입하기
              </Button>
              {/* <Typography variant="body2" my={2}>
                가입과 동시에 CdBd의{" "}
                <Link href="#" variant="body2">
                  이용약관
                </Link>{" "}
                및{" "}
                <Link href="#" variant="body2">
                  개인정보 처리방침
                </Link>
                에 동의함을 승인하게 됩니다
              </Typography> */}
            </Box>
          </Box>
          {/* <Copyright sx={{ mt: 5 }} /> */}
        </Grid>
      </Grid>
  );
}