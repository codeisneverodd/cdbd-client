import * as React from "react";
// import Avatar from '@mui/material/Avatar';
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
// import TextField from '@mui/material/TextField';
// import FormControlLabel from '@mui/material/FormControlLabel';
// import Checkbox from '@mui/material/Checkbox';
// import Link from '@mui/material/Link';
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
// import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Select } from "@mui/material";
// import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';
import { redirect } from "next/navigation";
import LanguageSelector from "@/components/util/LanguageSelector";
import EmailSentText from "@/components/text/EmailSentText";

export default function SignInSide() {
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
          // backgroundColor: (t) =>
          //   t.palette.mode === "light"
          //     ? t.palette.grey[50]
          //     : t.palette.grey[900],
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
          <Typography variant="h4" mb={4}>
            이메일 확인하기
          </Typography>

          <EmailSentText />
          {/* <Typography variant='h5'>
                {email}(으)로 비밀번호 재설정 링크를 보냈습니다. 이메일을 확인하고 링크를 클릭해 비밀번호를 재설정하세요.
            </Typography> */}
        </Box>

        <Box p={4} />
        {/* <Copyright sx={{ mt: 5 }} /> */}
      </Grid>
    </Grid>
  );
}
