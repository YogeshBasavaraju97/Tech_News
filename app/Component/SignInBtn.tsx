'use client';

import nextAuth from 'next-auth';

import { signIn } from 'next-auth/react';

export default function SignInBtn() {
  return (
    <>
      <div>
        <h1 className="text-center m-8">Sign In</h1>
      </div>

      <div className="px-2 flex flex-col items-center justify-center gap-4">
        <button
          onClick={() => signIn('github')}
          className="flex items-center gap-2 justify-center p-2 rounded-full border border-slate-400 hover:bg-slate-100/50 transition font-normal  text-base"
        >
          <span>
            <img
              src={'/github-logo.svg'}
              className="w-9 "
              alt="github log"
            ></img>
          </span>
          Sign in with github
        </button>
        <button
          onClick={() => signIn('google')}
          className="flex items-center gap-2  justify-center p-2 rounded-full border border-slate-400 hover:bg-slate-100/50 transition font-normal text-base"
        >
          <span>
            <img
              src={'/google-logo.svg'}
              className="w-9"
              alt="google log"
            ></img>
          </span>
          Sign in with google
        </button>
      </div>
    </>
  );
}
