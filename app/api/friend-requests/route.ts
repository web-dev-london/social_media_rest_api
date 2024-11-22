import { NextRequest, NextResponse } from "next/server";
import { createFriendshipSchema } from "@/schema/zod";
import prisma from "@/prisma/client-orm";
import { ZodError } from "zod";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const parsedBody = createFriendshipSchema.safeParse(body);

  if (!parsedBody.success) {
    return NextResponse.json(parsedBody.error.format(), { status: 400 });
  }

  const { requesterId, addresseeId } = parsedBody.data;

  try {
    const friendship = await prisma.friendship.create({
      data: {
        requesterId,
        addresseeId,
        status: "PENDING",
      },
    });

    return NextResponse.json(friendship, { status: 201 });
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json(error, { status: 400 });
    }
    return NextResponse.json(error, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  const { senderId, receiverId, search, status, sort, order = 'asc', page = '1', limit = '10' } = Object.fromEntries(
    request.nextUrl.searchParams.entries()
  );

  const pageNumber = parseInt(page);
  const limitNumber = parseInt(limit);

  const filters: {
    senderId?: string;
    receiverId?: string;
    search?: { contains: string; mode: 'insensitive' };
    content?: { contains: string; mode: 'insensitive' };
    status?: string;
  } = {};

  if (search) {
    filters.content = { contains: search, mode: 'insensitive' };
  }

  if (senderId) {
    filters.senderId = senderId;
  }

  if (receiverId) {
    filters.receiverId = receiverId;
  }

  if (status) {
    filters.status = status;
  }

  if (!senderId || !receiverId) {
    return NextResponse.json({ error: "Missing senderId or receiverId" }, { status: 400 });
  }


  const orderBy: Record<string, 'asc' | 'desc'> = {};

  if (sort) {
    if (['asc', 'desc'].includes(order)) {
      orderBy[sort] = order as 'asc' | 'desc';
    } else {
      return NextResponse.json({ error: "Invalid sort order" }, { status: 400 });
    }
  }

  try {
    const friendRequests = await prisma.message.findMany({
      where: filters,
      orderBy,
      skip: (pageNumber - 1) * limitNumber,
      take: limitNumber,
    });

    const totalRequests = await prisma.message.count({
      where: filters,
    });

    return NextResponse.json({
      data: friendRequests,
      pagination: {
        total: totalRequests,
        page: pageNumber,
        limit: limitNumber,
        totalPages: Math.ceil(totalRequests / limitNumber),
      },
    });
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json(error, { status: 400 });
    }
    return NextResponse.json(error, { status: 500 });
  }
}