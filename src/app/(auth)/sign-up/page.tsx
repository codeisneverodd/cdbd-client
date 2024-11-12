// "use client";
import * as React from "react";
import styles from "../style.module.scss";

import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import SignupForm from "@/components/forms/SignupForm";
import LanguageSelector from "@/components/util/LanguageSelector";

import Image from "next/image";
import logo from "/public/images/logo-hybrid.svg";
import SignupContinueForm from "@/components/forms/SignupContinueForm";

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

export default function SignInSide() {
  // const [user, setUser] = React.useState(null);
  // const [isEmailSent, setIsEmailSent] = React.useState(false);
  // const [email, setEmail] = React.useState("");

  // const router = useRouter();

  // const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //   const targetEmail = e.currentTarget?.email.value;
  //   axios
  //     .post("api/signup", {
  //       email: e.currentTarget?.email.value,
  //     })
  //     .then(
  //       (response) => {
  //         if (response.status !== 200) return alert("Error sending email");
  //         setIsEmailSent(true);
  //         console.log(response);
  //         localStorage.setItem("email", targetEmail);
  //         router.push("/register-email-sent");
  //       },
  //       (error) => {
  //         if (error.response.status === 409)
  //           return alert("Email is already in use");
  //         console.log(error);
  //       }
  //     );
  // };

  // const handleSuccess = (response: any) => {
  //   console.log("Login Success:", response);
  //   // setUser(response.profile);

  //   axios
  //     .post("/api/loginWithGoogle", { response }, { withCredentials: true })
  //     .then(
  //       (response) => {
  //         if (response.status !== 200) return alert("Error logging in");
  //         router.push("/dashboard");
  //         // setUserToken(response.data)
  //         console.log(response);
  //       },
  //       (error) => {
  //         console.log(error);
  //       }
  //     );
  // };

  const handleFailure = () => {
    console.log("Login Failed:");
    alert("Login Failed");
  };

  return (
    <>
      <div className={styles.signInSideWrap}>
        <div className={styles.left}></div>
        <div className={styles.right}>
          <LanguageSelector />

          <div className={styles.formWrap}>
            {/* FIX: toggle below annotation */}
            {true ? <SignUpBox /> : <ContinueBox />}
          </div>
        </div>
      </div>
    </>
  );
}

function SignUpBox () {
  return (
    <div className={styles.formBox}>
    <div className={styles.top} style={{ marginBottom: "92px" }}>
      <Image src={logo} alt="CdBd logo" />
    </div>
    <div className={`${styles.bottom} ${styles.signupBottom}`}>
      <div>
        <p className={`h1-eng ${styles.title}`}>Sign Up Now</p>

        <SignupForm />
      </div>

      <div style={{display: "flex", flexDirection: "column", justifyContent: "flex-end"}}>
        <Button
          variant="outlined"
          color="info"
          className="subtitle1-eng"
          fullWidth
          sx={{ marginBottom: "16px" }}
        >
          Start Without Signing Up
        </Button>

        <div className={styles.signup}>
          <span className="p2-eng">Already have an account?</span>
          <Link className="subtitle2-eng" href="/sign-in">
            Sign In
          </Link>
        </div>
      </div>
    </div>
  </div>
  )
}

function ContinueBox () {

return (
<div className={styles.formBox}>
    <div className={styles.top} style={{ marginBottom: "92px" }}>
      <Image src={logo} alt="CdBd logo" />
    </div>
    <div className={`${styles.bottom} ${styles.signupBottom}`}>
      <div>
        <p className={`h1-eng ${styles.title}`}>Continue Signing Up</p>

        <SignupContinueForm />
      </div>
    </div>
  </div>
)
}