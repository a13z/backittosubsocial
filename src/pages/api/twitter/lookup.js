import { getSession } from 'next-auth/react'
import { getToken } from 'next-auth/jwt';

import { TwitterApi } from 'twitter-api-v2';

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req, res) => {

  console.log('lookup req', req);

  const session = await getSession({ req });
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  console.log(token);
  
  const body = JSON.parse(req.body);
  const { tweet } = body;

  const twitterClient = new TwitterApi(token.twitter.access_token);
  // const roClient = twitterClient.readOnly;
  console.log(JSON.stringify(twitterClient));

  try {
    twitterClient.v2.me().then(result => {console.log(result)}).catch(error => {console.error(error);});

    console.log('lookup tweet', tweet);
    const tweetLookupResult = await twitterClient.v2.tweets(tweet, {
      'tweet.fields': ['attachments,id,text,created_at,entities,geo,source,context_annotations,conversation_id,in_reply_to_user_id,lang,possibly_sensitive,referenced_tweets,reply_settings,withheld'],
      'expansions': ['referenced_tweets.id,referenced_tweets.id.author_id,entities.mentions.username,in_reply_to_user_id,attachments.media_keys'],
      'media.fields': ['preview_image_url','type','url'],
    }
    ).then(result => {
      console.log("result", JSON.stringify(result, null, 2));
      return res.status(200).json({
        status: 'Ok',
        data: result.data
      });
    }).catch(error => {console.error(error);});

  } catch(e) {
    return res.status(400).json({
      status: e.message
    });
  }
  }