import prisma from '@/lib/prismadb';
import { NextResponse } from 'next/server';

export async function GET(
  req: Request,
  { params }: { params: { catName: string } }
) {
  try {
    const catName = params.catName;
    console.log(catName);

    const posts = await prisma.category.findUnique({
      where: { catName },
      include: {
        posts: { include: { author: true }, orderBy: { createdAt: 'desc' } },
      },
    });
    return NextResponse.json(posts);
  } catch (error) {
    console.log(error);
    return NextResponse.json('something went wrong');
  }
}
