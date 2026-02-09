import type { NextRequest } from "next/server";
import { getSession } from "@/lib/auth";

export async function isAdminAuthorized(req: Request | NextRequest) {
  try {
    const session = await getSession();
    if (session?.username) {
      return true;
    }
  } catch {
    // Fall through and try bearer auth.
  }

  const authHeader = req.headers.get("authorization");
  return !!process.env.JWT_SECRET && authHeader === `Bearer ${process.env.JWT_SECRET}`;
}
