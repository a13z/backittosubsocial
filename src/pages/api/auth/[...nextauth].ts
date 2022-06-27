import NextAuth, { NextAuthOptions } from "next-auth"
import MediumProvider from "next-auth/providers/medium"
import TwitterProvider from "next-auth/providers/twitter"

export const authOptions: NextAuthOptions = {
    providers: [
      MediumProvider({
        clientId: process.env.MEDIUM_CLIENT_ID as string,
        clientSecret: process.env.MEDIUM_CLIENT_SECRET as string,
        // checks: "state",
      }),
      TwitterProvider({
        clientId: process.env.TWITTER_CLIENT_ID as string,
        clientSecret: process.env.TWITTER_CLIENT_SECRET as string,
      }),
      TwitterProvider({
        clientId: process.env.TWITTER_CLIENT_ID as string,
        clientSecret: process.env.TWITTER_CLIENT_SECRET as string,
        version: "2.0", //
      }),
      ],
      // callbacks: {
      //   async jwt({ token, account }) {
      //       // Persist the OAuth access_token to the token right after signin
      //       if (account) {
      //       token.accessToken = account.access_token
      //       }
      //       return token
      //   },
      //   async session({ session, token, user }) {
      //       // Send properties to the client, like an access_token from a provider.
      //       session.accessToken = token.accessToken
      //       return session
      //   }
      // },
      debug: true,
}
// export default NextAuth({
//   // Configure one or more authentication providers
//   providers: [
//     MediumProvider({
//       clientId: process.env.MEDIUM_ID,
//       clientSecret: process.env.MEDIUM_SECRET,
//     }),
//     // ...add more providers here
//   ],
//   callbacks: {
//     async jwt({ token, account }) {
//         // Persist the OAuth access_token to the token right after signin
//         if (account) {
//         token.accessToken = account.access_token
//         }
//         return token
//     },
//     async session({ session, token, user }) {
//         // Send properties to the client, like an access_token from a provider.
//         session.accessToken = token.accessToken
//         return session
//     }
//   },
// })

export default NextAuth(authOptions)