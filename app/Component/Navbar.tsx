import Link from '@/node_modules/next/link';

export default function Navbar() {
  return (
    <div className="flex justify-between pb-4 border-b-2 border-slate-100">
      <div>
        <Link href={'/'}>
          <h1 className="text-fuchsia-500 text-4xl font-bold tracking-tighter">
            Tech News
          </h1>
        </Link>
        <p>Exploring tomorrow's Innovation</p>
        <p>One byte at a time</p>
      </div>
      <div className="flex items-center">
        <Link className="btn" href={'/signIn'}>
          Sign In
        </Link>
      </div>
    </div>
  );
}
