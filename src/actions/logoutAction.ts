"use server"

import { signOut } from "@/auth"
import { isRedirectError } from "next/dist/client/components/redirect";

export const logout = async (prevState?: any ,formData?: FormData) => {
    try {
        const result = await signOut();

        console.log("Google Sign in result: ", result);
        return { success: true };
    } catch (error) {
        // bypass redirect errors (info: next redirect works by throwing errors, so we need to bypass them here, or they will be caught by the catch block and the error will be returned to the client as a failed login attempt)
        if (isRedirectError(error)) {
            throw error;
        }

        console.log("Google Sign in result error: ", error);
        return { error: "Failed to sign in" };
    }
}