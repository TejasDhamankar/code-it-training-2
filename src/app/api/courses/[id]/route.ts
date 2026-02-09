import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import { Course } from "@/lib/models/Course";
import { isAdminAuthorized } from "@/lib/admin-auth";
import { isValidObjectId } from "mongoose";

interface RouteContext {
  params: Promise<{ id: string }>;
}

export async function GET(_: Request, context: RouteContext) {
  const { id } = await context.params;
  if (!isValidObjectId(id)) {
    return NextResponse.json({ error: "Invalid course id" }, { status: 400 });
  }

  await connectToDatabase();
  const course = await Course.findById(id);
  if (!course) {
    return NextResponse.json({ error: "Course not found" }, { status: 404 });
  }

  return NextResponse.json(course);
}

export async function DELETE(req: Request, context: RouteContext) {
  const authorized = await isAdminAuthorized(req);
  if (!authorized) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await context.params;
  if (!isValidObjectId(id)) {
    return NextResponse.json({ error: "Invalid course id" }, { status: 400 });
  }

  await connectToDatabase();
  await Course.findByIdAndDelete(id);
  return NextResponse.json({ message: "Course deleted successfully" });
}
