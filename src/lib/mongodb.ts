import mongoose from "mongoose";
import dns from "node:dns";

const MONGODB_URI = process.env.MONGODB_URI;
const MONGODB_DNS_SERVERS = process.env.MONGODB_DNS_SERVERS;

if (!MONGODB_URI) {
  throw new Error("Please define the MONGODB_URI environment variable");
}

let cached = (global as any).mongoose;

if (!cached) {
  cached = (global as any).mongoose = { conn: null, promise: null };
}

function applyDnsOverrideForSrvLookupError() {
  const configured = MONGODB_DNS_SERVERS?.split(",")
    .map((server) => server.trim())
    .filter(Boolean);

  const servers = configured?.length ? configured : ["8.8.8.8", "1.1.1.1"];
  dns.setServers(servers);
}

function isSrvLookupRefused(error: unknown) {
  return (
    typeof error === "object" &&
    error !== null &&
    "code" in error &&
    (error as { code?: string }).code === "ECONNREFUSED" &&
    "syscall" in error &&
    (error as { syscall?: string }).syscall === "querySrv"
  );
}

async function connectWithSrvRetry() {
  try {
    return await mongoose.connect(MONGODB_URI!);
  } catch (error) {
    if (!isSrvLookupRefused(error)) throw error;
    applyDnsOverrideForSrvLookupError();
    return mongoose.connect(MONGODB_URI!);
  }
}

async function connectToDatabase() {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = connectWithSrvRetry();
  }
  cached.conn = await cached.promise;
  return cached.conn;
}

export default connectToDatabase;
