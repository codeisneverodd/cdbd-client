// export { auth as middleware } from "@/auth"

import { auth } from "@/auth";

const publicPaths = ["/sign-in", "/sign-up", "/register-email-sent"];

export default auth((req) => {
    if( req.auth ) {
        if( publicPaths.includes(req.nextUrl.pathname) || req.nextUrl.pathname.startsWith("/register/") || req.nextUrl.pathname.startsWith("/verify-email?")) {
            const newUrl = new URL("/", req.nextUrl.origin);
            return Response.redirect(newUrl);
        }
    } else {
        if (
            !req.auth &&
            !publicPaths.includes(req.nextUrl.pathname) &&
            !req.nextUrl.pathname.startsWith("/register/") &&
            !req.nextUrl.pathname.startsWith("/verify-email/")
        ) {
            const newUrl = new URL("/sign-in", req.nextUrl.origin);
            return Response.redirect(newUrl);
        }
    }
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
