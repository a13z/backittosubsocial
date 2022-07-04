import { useState } from 'react';

import Link from 'next/link'
import Layout from '../components/layout/Layout';

const AboutPage = () => {
  const [statuses, setStatuses] = useState();

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
// const AboutPage = () => (
//     <Layout title="About | Next.js + TypeScript Example">
//     <h1>About</h1>
//     <p>This is the about page</p>
//     <p>
//       <Link href="/">
//         <a>Go home</a>
//       </Link>
//     </p>
//   </Layout>
// )

export default AboutPage