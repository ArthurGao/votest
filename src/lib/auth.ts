import NextAuth from "next-auth"
import ZitadelProvider from "next-auth/providers/zitadel"
import { Issuer } from "openid-client"
import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"
import { getSession } from "next-auth/react"
import type { NextAuthOptions, Session } from "next-auth"
import type { JWT } from "next-auth/jwt"

interface ZitadelUser {
    id?: string;
    email?: string;
    image?: string;
    name?: string;
    loginName?: string;
    organization?: { name?: string };
}

interface ZitadelJWT extends JWT {
    accessToken?: string;
    idToken?: string;
    refreshToken?: string;
    tokenType?: string;
    expiresIn?: number;
    expiresAt?: number;
    user?: ZitadelUser;
    error?: unknown;
}
interface ZitadelSession extends Session {
    accessToken?: string;
    idToken?: string;
    refreshToken?: string;
    tokenType?: string;
    expiresIn?: number;
    error?: unknown;
}

export const authOptions: NextAuthOptions = {
    pages: {
        signIn: "/auth/signin",
        error: "/auth/signin",
    },
    debug: process.env.NODE_ENV === "development",
    secret: process.env.NEXTAUTH_SECRET,
    session: {
        strategy: "jwt",
        maxAge: 30 * 24 * 60 * 60,
        updateAge: 24 * 60 * 60,
    },
    cookies: {
        sessionToken: {
            name: process.env.NODE_ENV === "production"
                ? "__Secure-next-auth.session-token"
                : "next-auth.session-token",
            options: {
                httpOnly: true,
                sameSite: "lax",
                path: "/",
                secure: process.env.NODE_ENV === "production",
            },
        },
    },
    providers: [
        ZitadelProvider({
            issuer: process.env.ZITADEL_API as string,
            clientId: process.env.ZITADEL_CLIENT_ID as string,
            clientSecret: process.env.ZITADEL_CLIENT_SECRET as string,
            authorization: {
                params: {
                    scope: `openid email profile offline_access urn:zitadel:iam:user:resourceowner urn:zitadel:iam:org:project:id:zitadel:aud urn:zitadel:iam:user:metadata `,
                },
            },
            async profile(profile: unknown) {
                const p = profile as Record<string, unknown>;
                return {
                    id: p.sub as string,
                    name: p.name as string,
                    firstName: p.given_name as string,
                    lastName: p.family_name as string,
                    email: p.email as string,
                    loginName: p.preferred_username as string,
                    image: p.picture as string,
                    organization: {
                        id: p["urn:zitadel:iam:user:resourceowner:id"] as string,
                        name: p["urn:zitadel:iam:user:resourceowner:name"] as string,
                        primaryDomain: p["urn:zitadel:iam:user:resourceowner:primary_domain"] as string,
                    },
                }
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user, account }: { token: JWT; user?: unknown; account?: unknown }) {
            if (user) token.user ??= user;
            if (account) {
                const acc = account as Record<string, unknown>;
                token.accessToken ??= acc.access_token as string;
                token.idToken ??= acc.id_token as string;
                token.refreshToken ??= acc.refresh_token as string;
                token.tokenType ??= acc.token_type as string;
                token.expiresIn ??= acc.expires_in as number;
                token.expiresAt ??= ((acc.expires_at as number) ?? 0) * 1000;
            }
            token.error = undefined;
            if (Date.now() < (token.expiresAt as number)) {
                return token;
            }
            return refreshAccessToken(token);
        },
        async session({ session, token }: { session: Session; token: JWT }) {
            const { user, error: tokenError } = token as { user?: ZitadelUser; error?: unknown };
            return {
                ...session,
                user: {
                    id: user?.id,
                    email: user?.email,
                    image: user?.image,
                    name: user?.name,
                    loginName: user?.loginName,
                    orgName: user?.organization?.name,
                },
                clientId: process.env.ZITADEL_CLIENT_ID,
                accessToken: (token as ZitadelJWT).accessToken,
                idToken: (token as ZitadelJWT).idToken,
                refreshToken: (token as ZitadelJWT).refreshToken,
                tokenType: (token as ZitadelJWT).tokenType,
                expiresIn: (token as ZitadelJWT).expiresIn,
                error: tokenError,
            };
        },
        async redirect({ baseUrl }) {
            // 登录成功后统一跳转到 /dashboard
            return `${baseUrl}/dashboard`;
        },
    },
};

async function refreshAccessToken(token: JWT): Promise<JWT> {
    try {
        const issuer = await Issuer.discover(process.env.ZITADEL_API as string);
        const client = new issuer.Client({
            client_id: process.env.ZITADEL_CLIENT_ID as string,
            client_secret: process.env.ZITADEL_CLIENT_SECRET as string,
            token_endpoint_auth_method: "client_secret_basic",
        });
        const { refresh_token, access_token, expires_at } = await client.refresh((token as ZitadelJWT).refreshToken as string);
        return {
            ...token,
            accessToken: access_token,
            expiresAt: (expires_at ?? 0) * 1000,
            refreshToken: refresh_token ?? (token as ZitadelJWT).refreshToken,
        };
    } catch (error) {
        console.error("Error during refreshAccessToken", error);
        return {
            ...token,
            error: "RefreshAccessTokenError",
        };
    }
}

export async function requireAuth() {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
        redirect("/auth/signin");
    }
    return session;
}

export async function checkAuth() {
    const session = await getSession();
    return session;
}

export async function getAccessToken() {
    const session = await getSession();
    return (session as ZitadelSession)?.accessToken || null;
}

export function isTokenExpiringSoon() {
    const sessionPromise = getSession();
    if (!sessionPromise) return true;
    const fiveMinutes = 5 * 60; // 5 minutes in seconds
    return sessionPromise.then((s: Session | null) => {
        if (!s) return true;
        const expiresIn = (s as ZitadelSession).expiresIn || 0;
        return expiresIn < fiveMinutes;
    });
}

export async function handleAuthError(error: unknown) {
    if (error === "RefreshAccessTokenError") {
        const { signOut } = await import("next-auth/react");
        await signOut({ callbackUrl: "/auth/signin" });
    }
}

export const { handlers, auth, signIn, signOut } = NextAuth(authOptions)
