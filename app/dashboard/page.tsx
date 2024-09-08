import Post from '../Component/Post';
import { postsData } from '../../data';
import Link from 'next/link';
import { getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]/route';
import { redirect } from 'next/navigation';

export default async function Dashboard() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/Sign-In');
  }
  return (
    <div>
      <h1>My posts</h1>
      {postsData && postsData.length > 0 ? (
        postsData.map((post) => (
          <Post
            key={post.id}
            id={post.id}
            author={post.author}
            date={post.datepublished}
            thumbnail={post.thumbnail}
            category={post.category}
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
