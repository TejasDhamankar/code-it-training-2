import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import { Course } from "@/lib/models/Course";

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  await connectToDatabase();
  const authHeader = req.headers.get("authorization");
  
  if (authHeader !== `Bearer ${process.env.JWT_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await Course.findByIdAndDelete(params.id);
  return NextResponse.json({ message: "Course deleted successfully" });
}