import type { NextAuthConfig } from 'next-auth';

// This object will contain the configuration options for NextAuth.js.
export const authConfig = {
  pages: {
    signIn: '/login',
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnDashboard = nextUrl.pathname.startsWith('/dashboard');
      if (isOnDashboard) {
        if (isLoggedIn) return true;
        else return false;
      } else if (isLoggedIn) {
        return Response.redirect(new URL('/dashboard', nextUrl));
      } else {
        return true;
      }
    },
  },
  providers: [],
} satisfies NextAuthConfig;
