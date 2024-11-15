import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const next = searchParams.get("next") ?? "/";

  if (code) {
    const cookieStore = cookies();

    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() {
            return cookieStore.getAll();
          },
          setAll(cookiesToSet) {
            try {
              cookiesToSet.forEach(({ name, value, options }) =>
                cookieStore.set(name, value, options)
              );
            } catch {
              // The `setAll` method was called from a Server Component.
              // This can be ignored if you have middleware refreshing
              // user sessions.
            }
          },
        },
      }
    );

    const {
      data: { user },
      error: exchangeError,
    } = await supabase.auth.exchangeCodeForSession(code);

    if (exchangeError || !user) {
      return NextResponse.redirect(`${origin}`);
    }

    const { data: prevUser } = await supabase
      .from("user")
      .select("*")
      .eq("id", user.id)
      .maybeSingle();

    const forwardedHost = request.headers.get("x-forwarded-host"); // original origin before load balancer
    const isLocalEnv = process.env.NODE_ENV === "development";

    if (!prevUser) {
      const { error: userError } = await supabase.from("user").insert({
        id: user.id,
        email: user.email ?? null,
        name: user.user_metadata.name ?? null,
        image: user.user_metadata.avatar_url ?? null,
      });

      if (userError) {
        console.error(userError);
        return NextResponse.redirect(`${origin}/auth/auth-code-error`);
      }
      if (isLocalEnv) {
        // we can be sure that there is no load balancer in between, so no need to watch for X-Forwarded-Host
        return NextResponse.redirect(`${origin}/onboarding`);
      } else if (forwardedHost) {
        return NextResponse.redirect(`https://${forwardedHost}/onboarding`);
      } else {
        return NextResponse.redirect(`${origin}/onboarding`);
      }
    }

    if (isLocalEnv) {
      // we can be sure that there is no load balancer in between, so no need to watch for X-Forwarded-Host
      return NextResponse.redirect(`${origin}${next}`);
    } else if (forwardedHost) {
      return NextResponse.redirect(`https://${forwardedHost}${next}`);
    } else {
      return NextResponse.redirect(`${origin}${next}`);
    }
  }

  // return the user to an error page with instructions
  // return NextResponse.redirect(`${origin}/auth/auth-code-error`);

  return NextResponse.redirect(`${origin}`);
}
