import Layout from '../components/Layout';
import { v4 as uuidv4 } from 'uuid';
import path from 'path';
import fs from 'fs';

export default function Home({ name }) {
  return (
    <Layout>
      <div className='flex flex-row justify-center'>
          <ul className='mt-8'>
          {name.map(each => {
            return(
              <li key={uuidv4()}
                  className="mt-4 font-biz border-b-2 border-white hover:border-gray-300"
              >
                  <button
                    key={uuidv4()}
                    onClick={() => {console.log(`${each} is clicked`)}}
                  >
                    {each}
                  </button>
              </li>
            )
          })}
          </ul>
      </div>
    </Layout>
  )
}

export async function getStaticProps() {
  // Get files from the posts dir
  const files = fs.readdirSync(path.join('notes'));
  const notes = files.map(each => {
    const markdownDoc = fs.readFileSync(path.join('notes', each), 'utf-8');
    return(markdownDoc.split('\n')[0])
  });
  const valid = notes.filter(each => each.charAt(2) === "L");
  const name = valid.map(each => each.substring(2));
  return {
    props: {
      name,
    },
  }
}
