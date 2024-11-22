import prisma from "@/prisma/client-orm";
import { updateMessageSchema } from "@/schema/zod";
import { handleSingleRequest } from "@/utils/handleSingleRequest";
import { NextRequest, NextResponse } from "next/server";


export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
): Promise<NextResponse> {
  const response = await handleSingleRequest(
    request,
    { params },
    async (id) => await prisma.message.findUnique({ where: { id } })
  );
  return response;
}


export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
): Promise<NextResponse> {
  const body = await request.json();
  const parsedBody = updateMessageSchema.safeParse(body);

  if (!parsedBody.success) {
    return NextResponse.json(parsedBody.error.format(), { status: 400 });
  }

  const response = await handleSingleRequest(
    request,
    { params },
    async (id) => {
      const message = await prisma.message.update({
        where: {
          id,
        },
        data: parsedBody.data,
      });
      return { text: "Message updated successfully", message }
    }
  )

  return response
};

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
): Promise<NextResponse> {
  const body = await request.json();
  const parsedBody = updateMessageSchema.safeParse(body);

  if (!parsedBody.success) {
    return NextResponse.json(parsedBody.error.format(), { status: 400 });
  }

  const response = await handleSingleRequest(
    request,
    { params },
    async (id) => {
      const message = await prisma.message.update({
        where: {
          id,
        },
        data: parsedBody.data,
      });
      return { text: "Message updated successfully", message }
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
      const message = await prisma.message.delete({ where: { id } });
      return { text: "Message deleted successfully", message }
    }
  )

  return response;
};