import { auth } from "./config"

export const roleBasedMiddleware = auth((req) => {
  const { pathname } = req.nextUrl
  const role = req.auth?.user?.role

  // Placeholder middleware logic
  if (!req.auth && pathname !== "/login") {
    const newUrl = new URL("/login", req.nextUrl.origin)
    return Response.redirect(newUrl)
  }

  // Add specific portal role checks here later
})

// Matcher can be exported from the app's middleware.ts
