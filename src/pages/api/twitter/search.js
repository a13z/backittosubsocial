import { getSession } from 'next-auth/react'
import { getToken } from 'next-auth/jwt';

import Twitter from 'twitter-lite';


// eslint-disable-next-line import/no-anonymous-default-export
export default async (req, res) => {

  // console.log('req', req);

  const session = await getSession({ req });
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  console.log(token);
  
  const body = JSON.parse(req.body);
  const { query } = body;

  // console.log('session', session);
  // console.log('token', JSON.stringify(token));
  // console.log('token.token.token.token', JSON.stringify(token.token.token.token));
  // console.log(body);

  const client = new Twitter({
    subdomain: 'api',
    // version: "2", // version "1.1" is the default (change for other subdomains)
    // extension: false,
    consumer_key: process.env.TWITTER_CLIENT_ID,
    consumer_secret: process.env.TWITTER_CLIENT_SECRET,
    access_token_key: token.twitter.oauth_token,
    access_token_secret: token.twitter.oauth_token_secret,
  });

  // console.log(client);

  try {
    
    client
    .get("statuses/user_timeline", {
      // screen_name: 'twitterapi',
      count: 1000,
      trim_user: true,
      include_rts: false,
      exclude_replies: true,
    })
    .then(results => {
      console.log("results", results);
    })
    .catch(console.error);

  //   client.get('account/verify_credentials').then(tweets => {
  //   console.log(tweets);
  // }).catch(error => {
  //   console.error(error);
  // });

    return res.status(200).json({
      status: 'Ok',
      data: results.statuses
    });

  } catch(e) {
    return res.status(400).json({
      status: e.message
    });
  }
  }