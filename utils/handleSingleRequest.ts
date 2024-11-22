import { NextRequest, NextResponse } from "next/server";
import { handleErrors } from "./errorHandler";

type FetchItemCallback<T> = (id: string) => Promise<T | null>;

export async function handleSingleRequest<T>(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
  fetchItemCallback: FetchItemCallback<T> = async () => null
): Promise<NextResponse> {
  try {
    const { id } = await params;
    if (!id) {
      return NextResponse.json({ error: "Missing or invalid ID" }, { status: 400 });
    }

    const item = await fetchItemCallback(id);
    if (!item) {
      return NextResponse.json({ error: "Item not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, ...item }, { status: 200 });
  } catch (error) {
    return handleErrors(error);
  }
}

