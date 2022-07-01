import { getSession } from 'next-auth/react'
import { getToken } from 'next-auth/jwt';

import Twitter from 'twitter-lite';


// eslint-disable-next-line import/no-anonymous-default-export
export default async (req, res) => {

  const session = await getSession({ req });
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  
  const body = JSON.parse(req.body);
  const { query } = body;

  console.log('session', session);
  console.log('token', JSON.stringify(token));
  console.log('token.token.token.token.account', JSON.stringify(token.token.token.token.account));
  console.log(body);

  const client = new Twitter({
    subdomain: 'api',
    consumer_key: process.env.TWITTER_CLIENT_ID,
    consumer_secret: process.env.TWITTER_CLIENT_SECRET,
    access_token_key: token.token.token.token.account.oauth_token,
    access_token_secret: token.token.token.token.account.oauth_token_secret,
  });

  try {
    const results = await client.get('statuses/user_timeline', {
      include_rts: false,
      exclude_replies: true,
      since_id: '0',
    });
    console.log(results);

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