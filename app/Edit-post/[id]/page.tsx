import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import EditPost from '@/app/Component/EditPost';
import { TPosts } from '@/app/Type';
import { getServerSession } from 'next-auth/next';
import { redirect } from 'next/navigation';

const getPost = async (id: string): Promise<TPosts | null> => {
  try {
    const res = await fetch(`${process.env.NEXTAUTH_URL}/api/posts/${id}`, {
      cache: 'no-store',
    });
    if (res.ok) {
      const post = await res.json();
      return post;
    }
  } catch (error) {
    console.log(error);
  }

  return null;
};
export default async function Edit({ params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/sign-in');
  }

  const id = params.id;
  console.log('id:', id);
  const post = await getPost(id);

  return <>{post ? <EditPost post={post} /> : <div>Invalid Post</div>}</>;
}
