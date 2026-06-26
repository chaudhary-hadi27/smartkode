import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { prisma } from "@smartkode/database"
import bcrypt from "bcryptjs"

export const { handlers, signIn, signOut, auth } = NextAuth({
  pages: {
    signIn: "/login",
  },
  session: { strategy: "jwt" },
  providers: [
    Credentials({
      id: "credentials",
      name: "Email and Password",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        if (!credentials?.email || !credentials?.password) {
          return null
        }
        const email = credentials.email as string
        const password = credentials.password as string

        const user = await prisma.user.findUnique({
          where: { email },
        })

        if (!user || !user.password_hash) {
          return null
        }

        const isValid = await bcrypt.compare(password, user.password_hash)
        if (!isValid) return null

        const agency = await prisma.agency.findUnique({ where: { user_id: user.id } })
        return { id: user.id, email: user.email, role: user.role, is_active: user.is_active, is_rejected: agency?.is_rejected ?? false }
      },
    }),
    Credentials({
      id: "passkey",
      name: "Passkey",
      credentials: {
        userId: { label: "User ID", type: "text" },
        passkeyVerification: { label: "Verification Status", type: "text" },
      },
      authorize: async (credentials) => {
        // This provider expects our custom API route (/api/auth/webauthn/verify)
        // to do the heavy lifting of @simplewebauthn/server verification.
        // If the API route verifies the WebAuthn response, it passes userId and 'success'.
        if (
          credentials?.userId &&
          credentials?.passkeyVerification === "success"
        ) {
          const user = await prisma.user.findUnique({
            where: { id: credentials.userId as string },
          })
          if (user) {
            const agency = await prisma.agency.findUnique({ where: { user_id: user.id } })
            return { id: user.id, email: user.email, role: user.role, is_active: user.is_active, is_rejected: agency?.is_rejected ?? false }
          }
        }
        return null
      },
    }),
  ],
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.role = (user as any).role
        token.is_active = (user as any).is_active
        token.is_rejected = (user as any).is_rejected
      }
      return token
    },
    session({ session, token }) {
      if (session.user) {
        (session.user as any).role = token.role as string
        (session.user as any).is_active = token.is_active as boolean
        (session.user as any).is_rejected = token.is_rejected as boolean
        session.user.id = token.sub as string
      }
      return session
    },
  },
})
