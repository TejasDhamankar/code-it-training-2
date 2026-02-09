import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import { Course } from "@/lib/models/Course";

interface RouteContext {
  params: Promise<{ slug: string }>;
}

export async function GET(_: Request, context: RouteContext) {
  await connectToDatabase();
  try {
    const { slug } = await context.params;
    const course = await Course.findOne({ slug });
    if (!course) {
      return NextResponse.json({ message: "Course not found" }, { status: 404 });
    }
    return NextResponse.json(course);
  } catch {
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
