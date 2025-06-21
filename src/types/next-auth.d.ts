import { DefaultSession } from "next-auth"

declare module "next-auth" {
  /**
   * Extends the built-in session type
   */
  interface Session {
    idToken?: string;
    user: DefaultSession["user"];
  }
} 