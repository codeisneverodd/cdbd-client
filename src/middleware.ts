import { CookieOptions, createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { NextResponse, type NextRequest } from 'next/server';

const publicPaths = ['/sign-in'];

export async function middleware(request: NextRequest) {
  const cookieStore = await cookies();

  let supabaseResponse = NextResponse.next({
    request,
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
          supabaseResponse = NextResponse.next({
            request,
          });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options),
          );
        },
      },
    },
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  // if (user) {
  //   if (publicPaths.includes(request.nextUrl.pathname)) {
  //     const newUrl = new URL('/', request.nextUrl.origin);
  //     return Response.redirect(newUrl);
  //   }
  // } else {
  //   if (!user && !publicPaths.includes(request.nextUrl.pathname)) {
  //     const newUrl = new URL('/sign-in', request.nextUrl.origin);
  //     return Response.redirect(newUrl);
  //   }
  // }

  return supabaseResponse;
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
