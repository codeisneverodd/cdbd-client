import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import MuiLink from "@mui/material/Link"
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { IconButton, InputAdornment, Select } from "@mui/material";
// import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';
import { redirect, useRouter } from "next/navigation";
// import { defaultTheme } from '@/theme';
// import { hash } from 'bcrypt';
import formData from "form-data";
import jwt from "jsonwebtoken";
import axios from "axios";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import LanguageSelector from "@/components/util/LanguageSelector";
import EmailVerificationForm from "@/components/forms/EmailVerificationForm";

export default async function SignInSide({
  params,
}: {
  params: { token: string };
}) {
  const result = jwt.verify(params.token, process.env.SECRET!);

  if (!result || typeof result !== "object") {
    redirect("/404");
  }

  const email = result?.email;

  return (
    <Grid container component="main" sx={{ height: "100vh" }}>
      <CssBaseline />
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
          //   backgroundColor: (t) =>
          //     t.palette.mode === "light"
          //       ? t.palette.grey[50]
          //       : t.palette.grey[900],
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
        justifyContent={"space-between"}
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

          <EmailVerificationForm token={params.token} email={email} />
        </Box>
        
        {/* sign up link */}
        <Box display={"flex"} justifyContent={"space-between"}>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ my: 2, mx: 4, mt: 5 }}
          >
            아직 계정이 없으신가요?{" "}
            <MuiLink component={Link} href="/sign-up" variant="body2">
              가입하러 가기
            </MuiLink>
          </Typography>
        </Box>
      </Grid>
    </Grid>
  );
}
