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
    version: "2", // version "1.1" is the default (change for other subdomains)
    extension: false,
    consumer_key: process.env.TWITTER_CLIENT_ID,
    consumer_secret: process.env.TWITTER_CLIENT_SECRET,
    // access_token_key: token.twitter.access_token,
    // access_token_secret: token.twitter.refresh_token,
    bearer_token: token.twitter.access_token,
  });

  console.log(JSON.stringify(client));

  try {
    
    client
    .get(`users/${token.sub}/tweets`, {
      // 'media.fields': 'url',
      // 'tweet.fields':'attachments,author_id,context_annotations,conversation_id,created_at,entities,geo,id,in_reply_to_user_id,lang,non_public_metrics,public_metrics,organic_metrics,promoted_metrics,possibly_sensitive,referenced_tweets,reply_settings,source,text,withheld',
      'tweet.fields':'attachments,id,text,created_at,entities,geo,source,context_annotations,conversation_id,in_reply_to_user_id,lang,possibly_sensitive,referenced_tweets,reply_settings,withheld',
      'exclude': 'retweets,replies',
      // 'expansions': 'attachments.poll_ids,attachments.media_keys,author_id,entities.mentions.username,geo.place_id,in_reply_to_user_id,referenced_tweets.id,referenced_tweets.id.author_id',
      // 'media.fields': 'duration_ms,height,media_key,preview_image_url,type,url,width,public_metrics,non_public_metrics,organic_metrics,promoted_metrics,alt_text,variants',
      // 'place.fields': 'contained_within,country,country_code,full_name,geo,id,name,place_type',
      // 'user.fields': 'id,name,profile_image_url,url,username',
      'expansions': 'referenced_tweets.id,referenced_tweets.id.author_id,entities.mentions.username,in_reply_to_user_id,attachments.media_keys',
      'media.fields': 'preview_image_url,type,url',
      'max_results': 100,
      'pagination_token': 'zldjwdz3w6sba13nqqw4knz8raczc5dpl6n4ailktv7',
      // id: 41083053,
      // screen_name: 'twitterapi',
      // count: 1000,
      // trim_user: true,
      // include_rts: false,
      // exclude_replies: true,
    })
    .then(results => {
      console.log("results", JSON.stringify(results, null, 2));

      return res.status(200).json({
        status: 'Ok',
        data: results.data
      });
    })
    .catch(console.error);   

  } catch(e) {
    return res.status(400).json({
      status: e.message
    });
  }
  }