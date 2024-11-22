import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client-orm";
import { updateUserSchema } from "@/schema/zod";
import { ZodError } from "zod";

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;
  const body = await request.json();
  const parsedBody = updateUserSchema.safeParse(body);

  if (!parsedBody.success) {
    return NextResponse.json(parsedBody.error.format(), { status: 400 });
  }

  try {
    const user = await prisma.user.update({
      where: {
        id,
      },
      data: parsedBody.data,
    });

    return NextResponse.json(user, { status: 200 });
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
  const parsedBody = updateUserSchema.safeParse(body);

  if (!parsedBody.success) {
    return NextResponse.json(parsedBody.error.format(), { status: 400 });
  }

  try {
    const user = await prisma.user.update({
      where: {
        id,
      },
      data: parsedBody.data,
    });

    return NextResponse.json(user, { status: 200 });
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
    const user = await prisma.user.delete({
      where: {
        id,
      },
    });

    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
}