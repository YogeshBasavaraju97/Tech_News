'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Tcategories as Categories, TPosts } from '../Type';

export default function EditPost({ post }: { post: TPosts }) {
  const [links, setLinks] = useState<String[]>([]);
  const [linkInput, setLinkInput] = useState('');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [categories, setCategories] = useState<Categories[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [imageURL, setImageURL] = useState('');
  const [publicId, setPublicID] = useState('');
  const [error, setError] = useState('');

  const router = useRouter();

  useEffect(() => {
    const fetchAllCategories = async () => {
      const res = await fetch('/api/categories');
      const catNames = await res.json();
      setCategories(catNames);
    };
    fetchAllCategories();

    const initialValues = () => {
      setTitle(post.title);
      setContent(post.content);
      setPublicID(post.publicId || '');
      setImageURL(post.imageURL || '');
      setLinks(post.links || []);
      setSelectedCategory(post.catName || ' ');
    };
    initialValues();

    console.log('hello');
  }, [post.title, post.content, post.publicId, post.imageURL, post.catName]);

  const addLink = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    if (linkInput.trim() !== '') {
      setLinks((prev) => [...prev, linkInput]);
      setLinkInput('');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !content) {
      setError('title and content are required');
      return;
    }
    try {
      const res = await fetch(`/api/posts/${post.id}`, {
        method: 'PUT',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify({
          title,
          content,
          links,
          selectedCategory,
          imageURL,
          publicId,
        }),
      });
      if (res.ok) {
        console.log('post edit successfully');

        router.push('/dashboard');
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <h2> Create Post</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          className="p-1 border border-slate-400 w-full rounded-md m-1"
          placeholder="Title"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
        />
        <textarea
          className="p-1 border border-slate-400 w-full h-56 rounded-md m-1 "
          placeholder="Content"
          onChange={(e) => setContent(e.target.value)}
          value={content}
        ></textarea>
        {links &&
          links.map((item, i) => (
            <div key={i}>
              <Link href={'item'} className="flex gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m13.35-.622 1.757-1.757a4.5 4.5 0 0 0-6.364-6.364l-4.5 4.5a4.5 4.5 0 0 0 1.242 7.244"
                  />
                </svg>
                {'    '}
                {item}{' '}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="red"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                  />
                </svg>
              </Link>
            </div>
          ))}
        <div className="flex gap-2 m-1 ">
          <input
            type="text"
            className="w-9/12 flex-1 border border-slate-400 p-1 rounded-md"
            placeholder="Paste the link and click add"
            value={linkInput}
            onChange={(e) => setLinkInput(e.target.value)}
          ></input>
          <button
            onClick={addLink}
            className="btn w-2/12  p-1 flex justify-center  "
          >
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="size-5"
              >
                <path d="M10.75 4.75a.75.75 0 0 0-1.5 0v4.5h-4.5a.75.75 0 0 0 0 1.5h4.5v4.5a.75.75 0 0 0 1.5 0v-4.5h4.5a.75.75 0 0 0 0-1.5h-4.5v-4.5Z" />
              </svg>
            </span>
            Add
          </button>
        </div>
        <select
          className="p-1 border border-slate-400 w-full rounded-md m-1"
          onChange={(e) => setSelectedCategory(e.target.value)}
          value={selectedCategory}
        >
          <option value=""> select a category</option>

          {categories &&
            categories.map((category: any) => (
              <option key={category.id}>{category.catName}</option>
            ))}
        </select>
        <button
          className="p-1 border border-slate-400 w-full rounded-md m-1"
          type="submit"
        >
          Create Post
        </button>
        {error && <div className="text-red-700">{error}</div>}
      </form>
    </>
  );
}
