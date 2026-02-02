import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import { Course } from "@/lib/models/Course";

export async function GET() {
  await connectToDatabase();
  const courses = await Course.find({}).sort({ updatedAt: -1 });
  return NextResponse.json(courses);
}

export async function POST(req: Request) {
  try {
    await connectToDatabase();
    const body = await req.json();
    
    // Minimal Security: Check for a secret header
    const authHeader = req.headers.get("authorization");
    if (authHeader !== `Bearer ${process.env.JWT_SECRET}`) {
       return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const newCourse = await Course.create(body);
    return NextResponse.json(newCourse, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to create course" }, { status: 500 });
  }
}