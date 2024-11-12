"use server"

import { signIn } from "@/auth"
import { isRedirectError } from "next/dist/client/components/redirect";

export const credentialLogin = async (prevState: any ,formData: FormData) => {
    try {
        const result = await signIn("credentials", {
            email: formData.get("email") as string,
            password: formData.get("password") as string,
            // redirect: false,
            redirectTo: "/",
        });

        console.log("Sign in result: ", result);
        return { success: true };
    } catch (error: any) {
        // bypass redirect errors (info: next redirect works by throwing errors, so we need to bypass them here, or they will be caught by the catch block and the error will be returned to the client as a failed login attempt)
        if (isRedirectError(error)) {
            throw error;
        }
        
        console.log("Sign in result error: ", {cause: error?.cause?.err?.message});
        return { error: error?.cause?.err?.message??"Invalid credentials" };
    }
}