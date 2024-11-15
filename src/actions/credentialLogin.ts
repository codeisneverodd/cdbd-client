"use server";

import { Database } from "@/types/supabase";
import { createClient } from "@supabase/supabase-js";
import { redirect } from "next/navigation";

export const emailLogin = async (prevState: any, formData: FormData) => {
  //   try {
  const supabase = createClient<Database>(
    process?.env?.NEXT_PUBLIC_SUPABASE_URL ?? "",
    process?.env?.SUPABASE_SECRET_KEY ?? "",
    {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
        detectSessionInUrl: false,
      },
    }
  );

  const { error } = await supabase.auth.signInWithPassword({
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  });
  // const result = await signIn("credentials", {
  //   email: formData.get("email") as string,
  //   password: formData.get("password") as string,
  //   // redirect: false,
  //   redirectTo: "/",
  // });

  // console.log("Sign in result: ", result);
  if (!error) {
    return { error: "로그인 실패" };
  }
  return redirect("/");
  //   } catch (error: any) {
  //     // bypass redirect errors (info: next redirect works by throwing errors, so we need to bypass them here, or they will be caught by the catch block and the error will be returned to the client as a failed login attempt)
  //     if (isRedirectError(error)) {
  //       throw error;
  //     }

  //     console.log("Sign in result error: ", {
  //       cause: error?.cause?.err?.message,
  //     });
  //     return { error: error?.cause?.err?.message ?? "Invalid credentials" };
  //   }
};
