import Link from '@/node_modules/next/link';
import { data } from '../../data';
import { Tcategories } from '../Type';

const getCategories = async (): Promise<Tcategories[] | null> => {
  try {
    const res = await fetch(`${process.env.NEXTAUTH_URL}/api/categories`);

    if (res.ok) {
      const categories = res.json();
      return categories;
    }
  } catch (error) {
    console.log(error);
  }
  return null;
};

export default async function CategoriesList() {
  const categories = await getCategories();
  return (
    <div className="flex gap-2 text-sm flex-wrap my-3">
      {categories &&
        categories.map((category: Tcategories) => (
          <Link
            className=" px-4 py-1 bg-slate-400 gap-4  rounded-md"
            key={category.id}
            href={`./categories/${category.catName}`}
          >
            {category.catName}
          </Link>
        ))}
    </div>
  );
}
