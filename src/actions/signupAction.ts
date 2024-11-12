"use server";

import prisma from "@/lib/database";
import { sendVerificationEmail } from "@/lib/mail";
import { generateVerificationToken } from "@/lib/token";
// import bcrypt from "bcryptjs";
import { isRedirectError } from "next/dist/client/components/redirect";

export const signup = async (prevState: any, formData: FormData) => {
  try {
    // Validate the input data
    // const validatedData = RegisterSchema.parse(data);

    //  If the data is invalid, return an error
    // if (!validatedData) {
    //   return { error: "Invalid input data" };
    // }

    //  Destructure the validated data
    // const { email, name, password, passwordConfirmation } = validatedData;
    // const { email, name, password, passwordConfirmation } = ;

    const email = formData.get("email") as string | undefined;

    if (!email) {
      return { error: "Invalid input data" };
    }

    // Check to see if user already exists
    const userExists = await prisma.user.findFirst({
      where: {
        email,
      },
    });

    // If the user exists, return an error
    if (userExists) {
      console.log("User already exists: ", userExists);
      //   return { error: "Email already is in use. Please try another one." };
    } else {
      const lowerCaseEmail = email.toLowerCase();

      // Create the user
      const user = await prisma.user.create({
        data: {
          email: lowerCaseEmail,
        },
      });
      console.log("User created: ", user);
    }

    // Generate a verification token
    const verificationToken = await generateVerificationToken(email);

    await sendVerificationEmail(email, verificationToken.token);

    return { success: "Email Verification was sent" };
  } catch (error) {
    // bypass redirect errors (info: next redirect works by throwing errors, so we need to bypass them here, or they will be caught by the catch block and the error will be returned to the client as a failed login attempt)
    if (isRedirectError(error)) {
        throw error;
    }

    // Handle the error, specifically check for a 503 error
    console.error("Database error:", error);

    if ((error as { code: string }).code === "ETIMEDOUT") {
      return {
        error: "Unable to connect to the database. Please try again later.",
      };
    } else if ((error as { code: string }).code === "503") {
      return {
        error: "Service temporarily unavailable. Please try again later.",
      };
    } else {
      return { error: "An unexpected error occurred. Please try again later." };
    }
  }
};
