import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import { Placement } from "@/lib/models/Placement";
import { isAdminAuthorized } from "@/lib/admin-auth";

export async function GET() {
  await connectToDatabase();
  const placements = await Placement.find({}).sort({ createdAt: -1 });
  return NextResponse.json(placements);
}

export async function POST(req: Request) {
  try {
    const authorized = await isAdminAuthorized(req);
    if (!authorized) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectToDatabase();
    const body = await req.json();
    const created = await Placement.create(body);
    return NextResponse.json(created, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to create placement" }, { status: 500 });
  }
}
