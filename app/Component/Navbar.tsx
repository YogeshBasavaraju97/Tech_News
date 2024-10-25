'use client';

import Link from '@/node_modules/next/link';
import Image from 'next/image';
import { signOut, useSession } from 'next-auth/react';
import { useEffect, useRef, useState } from 'react';

export default function Navbar() {
  const { status, data: session } = useSession();
  const [isPopVisible, setIsPopVisible] = useState(false);

  const popupRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (popupRef.current && !popupRef.current.contains(e.target as Node)) {
        setIsPopVisible(false);
      }
    };
    document.addEventListener('click', handleClickOutside);

    if (!isPopVisible) {
      document.removeEventListener('click', handleClickOutside);
    }

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isPopVisible]);

  return (
    <div className="flex justify-between pb-4 border-b-2 border-slate-100 relative">
      <div>
        <Link href={'/'}>
          <h1 className="text-fuchsia-500 text-4xl font-bold tracking-tighter">
            Tech News
          </h1>
        </Link>
        <p>Exploring tomorrow&apos;s Innovation</p>
        <p>One byte at a time</p>
      </div>
      {status === 'authenticated' ? (
        <>
          <div
            ref={popupRef}
            className={`absolute z-40 right-0 top-20 bg-white p-5 shadow-lg
          rounded-md  flex-col gap-2 text-right min-w-[160px] ${
            isPopVisible ? 'flex' : 'hidden'
          }  `}
          >
            <div className="font-bold">{session?.user?.name}</div>
            <div>{session?.user?.email}</div>

            <Link href="/dashboard">Dashboard</Link>
            <Link href="/create-post">Create post</Link>

            <button onClick={() => signOut()} className="btn">
              sign out
            </button>
          </div>
          <div className="flex items-center gap-2">
            <Link
              href={'/create-post'}
              className="flex gap-2 items-center mr-6"
            >
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
                  d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>
              <span>create new</span>
            </Link>
            <Image
              src={session?.user?.image || ''}
              width={30}
              height={30}
              alt="profile Image"
              className="rounded-full"
              onClick={() => setIsPopVisible((prev) => !prev)}
            />
          </div>
        </>
      ) : (
        <div className="flex items-center">
          <Link className="btn" href={'/Sign-In'}>
            Sign In
          </Link>
        </div>
      )}
    </div>
  );
}
