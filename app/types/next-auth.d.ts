import NextAuth from "next-auth/next";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
	interface User {
		token: string;
		refresh: string;
	}
	interface Session {
		user: User & {
			token: string;
			refresh: string;
		};
		token: {
			token: string;
			refresh: string;
		};
	}
}

declare module "next-auth/jwt" {
	/** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
	interface JWT {
		/** OpenID ID Token */
		token: string;
		refresh: string;
	}
}
