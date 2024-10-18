import { NextResponse } from 'next/server';
import prisma from '@/lib/prismadb';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/route';

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  const author = session?.user?.name;
  if (!session) {
    return NextResponse.json({ error: 'not authenticated' }, { status: 401 });
  }
  const { title, content, links, selectedCategory, imageURL, publicId } =
    await req.json();

  const authorEmail = session?.user?.email as string;

  if (!title || !content) {
    return NextResponse.json(
      { error: 'title and content are required' },
      { status: 500 }
    );
  }

  try {
    const newPost = await prisma.post.create({
      data: {
        title,
        content,
        links,

        catName: selectedCategory,
        imageURL,
        publicId,
        authorEmail,
      },
    });
    console.log('post created');
    return NextResponse.json(newPost);
  } catch (error) {
    return NextResponse.json({ message: 'Could not create post' });
  }
}

export async function GET() {
  try {
    const posts = await prisma.post.findMany({
      include: { author: { select: { name: true } } },
      orderBy: {
        createdAt: 'desc',
      },
    });
    return NextResponse.json(posts);
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      { message: 'some error occurred' },
      { status: 500 }
    );
  }
}
