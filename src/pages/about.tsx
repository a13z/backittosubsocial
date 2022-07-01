import { useState } from 'react';

import Link from 'next/link'
import Layout from '../components/layout/Layout';

import Twitter from 'twitter-lite';

const client = new Twitter({
  subdomain: 'api',
  consumer_key: process.env.TWITTER_CLIENT_ID,
  consumer_secret: process.env.TWITTER_CLIENT_SECRET,
  access_token_key: token.token.token.token.account.oauth_token,
  access_token_secret: token.token.token.token.account.oauth_token_secret,
});

const AboutPage = () => {
  const [statuses, setStatuses] = useState();

  const tweetsByUser = (user: string) => {
    return statuses.filter(status => status.user === user);
  }


  async function handleOnSearchSubmit(e) {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const query = formData.get('query');

    const results = await fetch('/api/twitter/search', {
      method: 'POST',
      body: JSON.stringify({
        query
      })
    }).then(res => res.json());

    setStatuses(results.data); 
  }

  return (
    <Layout title="About | Next.js + TypeScript Example">
      <h1>About</h1>
      <form onSubmit={handleOnSearchSubmit}>
        <h2>Search</h2>
        <input type="search" name="query" />
        <button>Search</button>
       </form>

      {statuses && (
        <ul>
          { statuses.map(({ id, text, user }) => {
            return (
              <li key={id}>
                <p>{ text }</p>
                <p>By { user.name } ({ user.screen_name })</p>
              </li>
            );
          })}
        </ul>
    )}
    </Layout>
  )
}


export default AboutPage