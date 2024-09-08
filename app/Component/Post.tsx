import { postsData } from '@/data';
import defaultThumbnail from '../../public/defaultThumbnail.png';
import Image from 'next/Image';
import Link from 'next/link';
import DeleteButton from './DeleteButton';

export { postsData } from '../../data';

interface PostProps {
  id: string;
  author: string;
  thumbnail?: string;
  authorEmail?: string;
  date?: string;
  title: string;
  content: string;
  links?: string[];
  category: string;
}

export default function Post({
  id,
  author,
  date,
  thumbnail,
  authorEmail,
  title,
  content,
  links,
  category,
}: PostProps) {
  return (
    <div className="m-2">
      <div>
        Posted by : <span className="font-bold">{author}</span> on :
        <span>{date}</span>
      </div>

      <div className="w-full h-72 relative">
        {thumbnail ? (
          <Image
            src={thumbnail}
            alt={title}
            fill
            className="object-cover rounded-md object-center"
          />
        ) : (
          <Image src={defaultThumbnail} alt={title} fill />
        )}
      </div>
      <p>
        Category: <span>{category}</span>
      </p>
      <h2>{title}</h2>
      <Link href={`/edit-post/${id}`}>Edit</Link>
      <Link href={`/delete/${id}`}>
        <DeleteButton />
      </Link>
    </div>
  );
}
