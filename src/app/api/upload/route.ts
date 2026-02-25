import { NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import { mkdir } from "fs/promises";
import path from "path";

// Function to ensure the upload directory exists
async function ensureDirectoryExists(directory: string) {
  try {
    await mkdir(directory, { recursive: true });
  } catch (error) {
    // Ignore error if directory already exists
    if ((error as NodeJS.ErrnoException).code !== 'EEXIST') {
      throw error;
    }
  }
}

export async function POST(req: Request) {
  try {
    const data = await req.formData();
    const file: File | null = data.get("file") as unknown as File;

    if (!file) {
      return NextResponse.json({ error: "No file provided." }, { status: 400 });
    }

    // Sanitize the filename
    const sanitizedFilename = file.name.replace(/[^a-zA-Z0-9._-]/g, "");
    const timestamp = Date.now();
    const uniqueFilename = `${timestamp}-${sanitizedFilename}`;

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Define the upload directory and ensure it exists
    const uploadDir = path.join(process.cwd(), "public/uploads/courses");
    await ensureDirectoryExists(uploadDir);

    // Define the full path for the file
    const filePath = path.join(uploadDir, uniqueFilename);
    
    // Write the file to the filesystem
    await writeFile(filePath, buffer);

    // Return the public path of the file
    const publicPath = `/uploads/courses/${uniqueFilename}`;
    return NextResponse.json({ success: true, path: publicPath });

  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json({ error: "File upload failed." }, { status: 500 });
  }
}
