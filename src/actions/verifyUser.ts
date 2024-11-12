"use server"
import prisma from "@/lib/database"
import { getUserByEmail } from "@/data/user"
import { getVerificationTokenByToken} from "@/data/verification-token"
import { signIn } from "@/auth"
import bcrypt from "bcryptjs";
import { isRedirectError } from "next/dist/client/components/redirect"

export const verifyUser = async (prevState: any, formData: FormData) => {
    try {
        const data = formData;

    const token = data.get("token") as string | undefined;
    const email = data.get("email") as string | undefined;
    const name = data.get("username") as string | undefined;
    const password = data.get("password") as string | undefined;
    const company = data.get("company") as string | undefined;

    if (!token) {
        return { error: "Invalid token" };
    }

    console.log({token, email, name, password, company})

    if (!email || !name || !password || !company) {
        return { error: "Invalid input data" };
      }

    const existingToken = await getVerificationTokenByToken(token)

    if(!existingToken) {
        return { error: "Invalid token" }
    }

    const hasExpired = new Date(existingToken.expires) < new Date()

    if(hasExpired) {
        return { error: "Token has expired" }
    }

    const existingUser = await getUserByEmail(existingToken.email)


    if(!existingUser) {
        return { error: "User not found" }
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    await prisma.user.update({
        where: {
            id: existingUser.id,
        },
        data: {
            emailVerified: new Date(),
            email: existingToken.email,
            name: name,
            companyName: company,
            password: hashedPassword
        }
    })

    await prisma.verificationToken.delete({
        where: {
            id: existingToken.id
        }
    })


    const result = await signIn("credentials", {
        email: email,
        password: password,
        redirectTo: "/"
    });

    console.log("Sign in result: ", result);
    return { success: "Sign up successful" };
    } catch (error) {
        // bypass redirect errors (info: next redirect works by throwing errors, so we need to bypass them here, or they will be caught by the catch block and the error will be returned to the client as a failed login attempt)
        if (isRedirectError(error)) {
            throw error;
        }

        console.log({error})

        return { error: 'Something went wrong'}
    }
}