import CategoriesList from './Component/CategoriesList';

import Post from './Component/Post';

import { TPosts } from './Type';

const getposts = async (): Promise<TPosts[] | null> => {
  try {
    const res = await fetch(`${process.env.NEXTAUTH_URL}/api/posts`, {
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
export default async function Home() {
  const posts = await getposts();

  return (
    <>
      <CategoriesList />
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
    </>
  );
}
