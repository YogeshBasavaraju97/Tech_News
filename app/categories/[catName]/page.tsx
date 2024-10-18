import Post from '@/app/Component/Post';
import { TPosts } from '@/app/Type';

const getPosts = async (catName: string): Promise<TPosts[] | null> => {
  try {
    const res = await fetch(
      `${process.env.NEXTAUTH_URL}/api/categories/${catName}`,
      { cache: 'no-store' }
    );

    if (res.ok) {
      const categories = await res.json();
      const posts = categories.posts;
      return posts;
    }
    return null;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export default async function category({
  params,
}: {
  params: { catName: string };
}) {
  const catname = params.catName;
  const posts = await getPosts(catname);

  return (
    <div>
      {catname && <h1> Category: {decodeURIComponent(catname)}</h1>}
      {posts && posts.length > 0 ? (
        posts.map((post: TPosts) => (
          <Post
            key={post.id}
            id={post.id}
            author={post.author.name}
            date={post.createdAt}
            thumbnail={post.imageURL}
            category={post.catName}
            title={post.title}
            content={post.content}
            links={post.links || []}
          />
        ))
      ) : (
        <div>No posts to display</div>
      )}
    </div>
  );
}
