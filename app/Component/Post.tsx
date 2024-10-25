import defaultThumbnail from '../../public/defaultThumbnail.png';
import Image from 'next/image';
import Link from 'next/link';
import DeleteButton from './DeleteButton';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export { postsData } from '../../data';

interface PostProps {
  id: string;
  author: string;
  thumbnail?: string;
  authorEmail?: string;
  date: string;
  title: string;
  content: string;
  links?: string[];
  category?: string;
}

export default async function Post({
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
  const session = await getServerSession(authOptions);

  const dateObject = new Date(date);

  const options: Intl.DateTimeFormatOptions = {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  };

  const formattedDate = dateObject.toLocaleDateString('en-US', options);

  return (
    <div className="m-2">
      <div>
        <>
          {author ? (
            <>
              Posted by : <span className="font-bold">{author}</span> on{' '}
              <span>{formattedDate}</span>
            </>
          ) : (
            <>on {formattedDate}</>
          )}
        </>
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

      <div className=" h-8 bg-slate-400 w-32 rounded-md  flex justify-center items-center mt-2">
        {category}
      </div>
      <div>
        <h2 className="font-bold text-2xl p-2">{title}</h2>
        <h2>{content}</h2>
      </div>

      {links &&
        links.map((link) => (
          <Link key={link} className="text-cyan-500 p-1 mb-6" href={'link'}>
            {link}
          </Link>
        ))}
      <div className="flex justify-start w-24 h-10 bg-slate-200 rounded-md mt-3 items-center gap-2">
        <button className="p-1">
          <Link href={`/Edit-post/${id}`}>Edit</Link>
        </button>

        <DeleteButton id={id} />
      </div>
    </div>
  );
}
