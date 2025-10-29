import { sql } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  const users = await sql`SELECT * FROM users`;
  return NextResponse.json(users);
}

export async function POST(request: Request) {
  const { name, email } = await request.json();
  await sql`INSERT INTO users (name, email) VALUES (${name}, ${email})`;
  return NextResponse.json({ success: true });
}
