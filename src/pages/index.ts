import { signIn, signOut, useSession } from 'next-auth/react';
// import { Client, auth } from "twitter-api-sdk";

import HomePage from '../components/home/HomePage';

export default HomePage;

export async function getServerSideProps({ query }: any) {
//   const { data: session, status } = useSession();
//   const authClient = new auth.OAuth2User({
//     client_id: process.env.CLIENT_ID,
//     client_secret: process.env.CLIENT_SECRET,
//     callback: "http://127.0.0.1:3000/callback",
//     scopes: ["tweet.read", "users.read", "offline.access"],
//   });
  

  if (query.tab) {
      return {
          props: {
              router: {
                  query
              },
          },
      };
  }

  return { props: {}}
}
