import { api } from '@/service/api.service'
import type { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

export const options: NextAuthOptions = {
	session: {
		strategy: 'jwt',
	},
	secret: process.env.NEXTAUTH_SECRET,
	providers: [
		CredentialsProvider({
			name: 'Credentials',
			credentials: {
				otp: {
					label: 'otp',
					type: 'text',
				},
				token: {
					label: 'token:',
					type: 'text',
				},
			},

			async authorize(credentials) {
				if (!credentials?.otp || !credentials?.token) return null

				return await api
					.verifyPin(credentials.token, credentials.otp)
					.then(res => {
						return {
							id: credentials.token,
							token: credentials.token,
							refresh: credentials.token,
						}
					})
					.catch(err => {
						console.error(err)

						return null
					})
			},
		}),
	],
	pages: {
		signIn: '/auth/pin',
	},
	callbacks: {
		async jwt({ token, user }) {
			if (user) {
				token.token = user.token
			}
			return token
		},

		async session({ session, token }) {
			return {
				...session,
				user: {
					...session.user,
					refresh: token.refresh,
					token: token.token,
				},
			}
		},
	},
	// events: {
	// 	signOut: async session => {
	// 		const authToken = session?.token?.token

	// 		const cookieStore = cookies()
	// 		const ip = cookieStore.get('ip')?.value ?? '127.0.0.1'

	// 		await chbrApi
	// 			.logOut({ authToken, ip })
	// 			.then(res => console.log(res, `${ip} вышел`))
	// 	},
	// },
}
