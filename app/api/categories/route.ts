import prisma from '@/lib/prismadb';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const categories = await prisma.category.findMany();
    return NextResponse.json(categories)

    
  } catch (error) {
    console.log(error);
    return NextResponse.json( "something went wrong")
    
    
  }
}
