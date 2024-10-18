import prisma from '@/lib/prismadb';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';
import { authOptions } from '../../auth/[...nextauth]/route';

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  // const session = await getServerSession(authOptions);
  // if (!session) {
  //   return NextResponse.json({ error: 'not authenticated' }, { status: 401 });
  // }
  try {
    const id = params.id;
    const post = await prisma.post.findUnique({ where: { id } });
    console.log(id);

    return NextResponse.json(post);
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: 'error occurred' });
  }
}

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
  }
  const { title, content, links, selectedCategory, imageURL, publicId } =
    await req.json();
  const id = params.id;
  try {
    const post = await prisma.post.update({
      where: { id },
      data: {
        title,
        content,
        links,
        catName: selectedCategory,
        imageURL,
        publicId,
      },
    });
    return NextResponse.json(post);
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: 'Error editing the post' });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: 'not authenticated' }, { status: 401 });
  }
  const id = params.id;
  try {
    const post = await prisma.post.delete({ where: { id } });
    return NextResponse.json(post);
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: 'Error in deleting the post' });
  }
}
