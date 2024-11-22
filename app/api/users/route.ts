import prisma from "@/prisma/client-orm";
import { createUserSchema } from "@/schema/zod";
import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";



export async function POST(request: NextRequest) {
  const body = await request.json();
  const parsedBody = createUserSchema.safeParse(body);

  if (!parsedBody.success) {
    return NextResponse.json(parsedBody.error, { status: 400 });
  }

  const { username, email, bio, image } = parsedBody.data;

  try {
    const user = await prisma.user.create({
      data: {
        username,
        email,
        bio,
        image,
      },
    });

    return NextResponse.json(user, { status: 201 });
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json(error, { status: 400 });
    }
    return NextResponse.json(error, { status: 500 });
  }
}


export async function GET(request: NextRequest) {
  const { search, bio, sort, order = 'asc', page = '1', limit = '10' } = Object.fromEntries(
    request.nextUrl.searchParams.entries()
  );

  const pageNumber = parseInt(page);
  const limitNumber = parseInt(limit);


  const filters: {
    username?: { contains: string; mode: 'insensitive' };
    bio?: { equals: string };
  } = {};

  if (search) {
    filters.username = { contains: search, mode: 'insensitive' };
  }

  if (bio) {
    filters.bio = { equals: bio };
  }

  const sortOrder = sort ? { [sort]: order } : {};


  const users = await prisma.user.findMany({
    where: filters,
    orderBy: sortOrder,
    skip: (pageNumber - 1) * limitNumber,
    take: limitNumber,
  });


  const totalUsers = await prisma.user.count({
    where: filters,
  });


  return NextResponse.json({
    data: users,
    pagination: {
      total: totalUsers,
      page: pageNumber,
      limit: limitNumber,
      totalPages: Math.ceil(totalUsers / limitNumber),
    },
  });
}

