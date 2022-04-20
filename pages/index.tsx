import Layout from '../components/Layout';
import path from 'path';
import fs from 'fs';

export default function Home({ files }) {
  return (
    <Layout>
      <h1 className="">This is working</h1>
      {console.log(files)}
    </Layout>
  )
}

export async function getStaticProps() {
  // Get files from the posts dir
  const files = fs.readdirSync(path.join('notes'))

  return {
    props: {
      files,
    },
  }
}
