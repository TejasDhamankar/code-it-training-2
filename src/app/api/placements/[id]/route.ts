import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import { Placement } from "@/lib/models/Placement";
import { isAdminAuthorized } from "@/lib/admin-auth";

interface RouteContext {
  params: Promise<{ id: string }>;
}

export async function DELETE(req: Request, context: RouteContext) {
  const authorized = await isAdminAuthorized(req);
  if (!authorized) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await context.params;
  await connectToDatabase();
  await Placement.findByIdAndDelete(id);

  return NextResponse.json({ message: "Placement deleted successfully" });
}
