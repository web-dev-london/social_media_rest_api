import { NextRequest, NextResponse } from "next/server";
import { updateMessageSchema } from "@/schema/zod";
import prisma from "@/prisma/client-orm";
import { ZodError } from "zod";

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;

  const message = await prisma.message.findUnique({
    where: {
      id,
    },
  });

  if (!message) {
    return NextResponse.json({ error: "Message not found" }, { status: 404 });
  }

  return NextResponse.json(message, { status: 200 });
};


export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;
  const body = await request.json();
  const parsedBody = updateMessageSchema.safeParse(body);

  if (!parsedBody.success) {
    return NextResponse.json(parsedBody.error.format(), { status: 400 });
  }

  try {
    const message = await prisma.message.update({
      where: {
        id,
      },
      data: parsedBody.data,
    });

    return NextResponse.json(message, { status: 200 });
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json(error, { status: 400 });
    }
    return NextResponse.json(error, { status: 500 });
  }
};

export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;
  const body = await request.json();
  const parsedBody = updateMessageSchema.safeParse(body);

  if (!parsedBody.success) {
    return NextResponse.json(parsedBody.error.format(), { status: 400 });
  }

  try {
    const message = await prisma.message.update({
      where: {
        id,
      },
      data: parsedBody.data,
    });

    return NextResponse.json(message, { status: 200 });
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json(error, { status: 400 });
    }
    return NextResponse.json(error, { status: 500 });
  }
};

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;

  try {
    const message = await prisma.message.delete({
      where: {
        id,
      },
    });

    return NextResponse.json(message, { status: 200 });
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
};