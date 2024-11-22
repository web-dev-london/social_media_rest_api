import prisma from "@/prisma/client-orm";
import { updateUserSchema } from "@/schema/zod";
import { handleSingleRequest } from "@/utils/handleSingleRequest";
import { NextRequest, NextResponse } from "next/server";


export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
): Promise<NextResponse> {
  const response = await handleSingleRequest(
    request,
    { params },
    async (id) => await prisma.user.findUnique({ where: { id } })
  );

  return response
}


export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
): Promise<NextResponse> {
  const body = await request.json();
  const parsedBody = updateUserSchema.safeParse(body);

  if (!parsedBody.success) {
    return NextResponse.json(parsedBody.error.format(), { status: 400 });
  }

  const response = await handleSingleRequest(
    request,
    { params },
    async (id) => {
      const user = await prisma.user.update({
        where: {
          id,
        },
        data: parsedBody.data,
      });
      return { text: "User updated successfully", user }
    }
  )

  return response
};

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
): Promise<NextResponse> {
  const body = await request.json();
  const parsedBody = updateUserSchema.safeParse(body);

  if (!parsedBody.success) {
    return NextResponse.json(parsedBody.error.format(), { status: 400 });
  }

  const response = await handleSingleRequest(
    request,
    { params },
    async (id) => {
      const user = await prisma.user.update({
        where: {
          id,
        },
        data: parsedBody.data,
      });
      return { text: "User updated successfully", user }
    }
  )

  return response
};


export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
): Promise<NextResponse> {
  const response = await handleSingleRequest(
    request,
    { params },
    async (id) => {
      const user = await prisma.user.delete({ where: { id } });
      return { text: "User deleted successfully", user }
    }
  )

  return response;
}



/* 
  // const { id } = await params;

  // const user = await prisma.user.findUnique({ where: { id } });
  // return NextResponse.json({ success: true, user }, { status: 200 });
 */