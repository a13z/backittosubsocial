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
      // TwitterProvider({
      //   clientId: process.env.TWITTER_CLIENT_ID as string,
      //   clientSecret: process.env.TWITTER_CLIENT_SECRET as string,
      //   version: "2.0", //
      // }),
      ],
      callbacks: {
        async jwt({token, account = {}}: {token: any, account: any}) {
          console.log('neaxtauth....callbacks:')
          console.log(token)
          console.log(JSON.stringify(token), JSON.stringify(account));
          if ( account.provider && !token[account.provider] ) {
            token[account.provider] = {};
          }
          if (account.provider === 'twitter') {
            if (account.oauth_token) {
              token[account.provider].oauth_token = account.oauth_token;
            }
            if (account.oauth_token_secret) {
              token[account.provider].oauth_token_secret = account.oauth_token_secret;
            }
          } else 
          {
            if ( account.accessToken ) {
              token[account.provider].accessToken = account.accessToken;
            }
      
            if ( account.refreshToken ) {
              token[account.provider].refreshToken = account.refreshToken;
            }
        }
    
          return token;
        },
      },
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
      secret: process.env.NEXTAUTH_SECRET as string,
      debug: true,
}

export default NextAuth(authOptions)