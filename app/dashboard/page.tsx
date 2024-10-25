import Link from 'next/link';
import { getServerSession } from 'next-auth';

import { redirect } from 'next/navigation';
import { TPosts } from '../Type';
import Post from '../Component/Post';
import { authOptions } from '@/lib/auth';

const getPost = async (email: string) => {
  try {
    const res = await fetch(
      `${process.env.NEXTAUTH_URL}/api/auth/author/${email}`
    );
    const { posts } = await res.json();

    return posts;
  } catch (error) {
    return null;
  }
};

export default async function Dashboard() {
  const session = await getServerSession(authOptions);
  const email = session?.user?.email;
  let postsById: TPosts[] = [];

  if (!session) {
    redirect('/Sign-In');
  }

  if (email) {
    postsById = await getPost(email);
  }

  return (
    <div>
      <h1>My posts</h1>
      {postsById && postsById.length > 0 ? (
        postsById.map((post: TPosts) => (
          <Post
            key={post.id}
            id={post.id}
            author={''}
            date={post.createdAt}
            thumbnail={post.imageURL}
            category={post.catName}
            title={post.title}
            content={post.content}
            links={post.links || []}
          />
        ))
      ) : (
        <div>
          No posts to created
          <div>
            <Link href={`/create-post/`}>Create new</Link>
          </div>
        </div>
      )}
    </div>
  );
}

{
  /* {postsById && postsById.length > 0 ? (
        
        postsById.map((post: TPosts) => (
          <Post
            key={post.id}
            id={post.id}
            author={''}
            date={post.createdAt}
            thumbnail={post.imageURL}
            category={post.catName}
            title={post.title}
            content={post.content}
            links={post.links || []}
          />
        ))
      ) : (
        <div>
          No posts to created
          <div>
            <Link href={`/create-post/`}>Create new</Link>
          </div>
        </div>
      )} */
}
