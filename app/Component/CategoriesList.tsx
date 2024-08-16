import Link from '@/node_modules/next/link';
import { data } from '../../data';

export default function CategoriesList() {
  return (
    <div className="flex gap-2 text-sm flex-wrap my-3">
      {data.map((category) => (
        <Link
          className=" px-4 py-1 bg-slate-400 gap-4  rounded-md"
          key={category.id}
          href={`./categories/${category.name}`}
        >
          {category.name}
        </Link>
      ))}
    </div>
  );
}
