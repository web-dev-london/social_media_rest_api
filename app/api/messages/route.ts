import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client-orm";
import { sendMessageSchema } from "@/schema/zod";
import { ZodError } from "zod";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const parsedBody = sendMessageSchema.safeParse(body);

  if (!parsedBody.success) {
    return NextResponse.json(parsedBody.error.format(), { status: 400 });
  }

  const { senderId, receiverId, content } = parsedBody.data;

  // Validate sender and receiver exist
  const sender = await prisma.user.findUnique({ where: { id: senderId } });
  const receiver = await prisma.user.findUnique({ where: { id: receiverId } });

  console.log('Sender:', sender);  // Log sender data
  console.log('Receiver:', receiver);  // Log receiver data

  if (!sender || !receiver) {
    return NextResponse.json(
      { error: "Invalid senderId or receiverId" },
      { status: 400 }
    );
  }


  try {
    const message = await prisma.message.create({
      data: {
        senderId,
        receiverId,
        content,
      },
    });

    return NextResponse.json(message, { status: 201 });
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json(error, { status: 400 });
    }
    return NextResponse.json(error, { status: 500 });
  }
}


export async function GET(request: NextRequest) {
  const { senderId, receiverId, search, sort, order = 'asc', page = '1', limit = '10' } = Object.fromEntries(
    request.nextUrl.searchParams.entries()
  );

  const pageNumber = parseInt(page);
  const limitNumber = parseInt(limit);

  if (isNaN(pageNumber) || isNaN(limitNumber)) {
    return NextResponse.json({ error: "Invalid page or limit" }, { status: 400 });
  }

  const filters: {
    senderId?: string;
    receiverId?: string;
    content?: { contains: string; mode: 'insensitive' };
  } = {};

  if (search) {
    filters.content = {
      contains: search,
      mode: 'insensitive',
    };
  }

  if (senderId) {
    filters.senderId = senderId;
  }

  if (receiverId) {
    filters.receiverId = receiverId;
  }


  const sortOrder: { [key: string]: 'asc' | 'desc' } = sort ? { [sort]: order as 'asc' | 'desc' } : { createdAt: order as 'asc' | 'desc' };

  const messages = await prisma.message.findMany({
    where: filters,
    orderBy: sortOrder,
    skip: (pageNumber - 1) * limitNumber,
    take: limitNumber,
  });

  const totalMessages = await prisma.message.count({
    where: filters,
  });

  if (!messages) {
    return NextResponse.json({ error: "Messages not found" }, { status: 404 });
  }

  return NextResponse.json({
    data: messages,
    total: totalMessages,
    page: pageNumber,
    limit: limitNumber,
    totalPages: Math.ceil(totalMessages / limitNumber),
  }, { status: 200 });
}