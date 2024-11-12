import NextAuth, { CredentialsSignin } from "next-auth"
import credentials from "next-auth/providers/credentials"
import Google from "next-auth/providers/google"
import { comparePasswordToHash } from "./util.ts/saltAndHashPassword"
import { PrismaAdapter } from "@auth/prisma-adapter"
import prisma from "./lib/database"
import { getUserByEmail, getUserFromDb } from "./data/user"
 
export const { handlers, signIn, signOut, auth } = NextAuth({
  session: {
    strategy: "jwt",
    maxAge: 10 * 60 * 60, // 10 hours
  },
  adapter: PrismaAdapter(prisma),
  providers: [
    credentials({
      credentials: {
        email: {},
        password: {},
        redirect: {},
      },
      authorize: async (credentials) => {
        let user = null
        
        // console.log("credentials :", {credentials, pass: credentials.password, email: credentials.email})

        // logic to verify if user exists
        user = await getUserByEmail(credentials.email as string)

        console.log("user 234:", user)

        if (!user || !user.password) {
          // throw new CredentialsSignin()
          throw new Error("User not found")
        }

        // logic to salt and hash password
        const passwordsMatch = await comparePasswordToHash(credentials.password as string, user.password as string)

        console.log("passwordsMatch :", passwordsMatch)

        if (passwordsMatch) {
          return user;
        }
 
        // throw new CredentialsSignin()
        console.log("credentials 234:", credentials)
        throw new Error("Invalid credentials")
      },
    }),
    Google
  ],
  callbacks: {
    async session({ session, token }) {
      session.user.id = token.sub ?? ''
      return session
    },
    async signIn({profile, account, user}) { 
      if (account?.provider === "google") {
        return profile?.email_verified === true
      }
      return true // Do different verification for other providers that don't have `email_verified`
    },
  },
})