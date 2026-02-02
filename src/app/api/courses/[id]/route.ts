import { NextRequest, NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import { Course } from "@/lib/models/Course";

export async function DELETE(req: NextRequest, context: { params: { id: string } }) {
  const { id } = context.params;

  await connectToDatabase();
  const authHeader = req.headers.get("authorization");
  
  if (authHeader !== `Bearer ${process.env.JWT_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await Course.findByIdAndDelete(id);
  return NextResponse.json({ message: "Course deleted successfully" });
}