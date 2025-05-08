import { NextResponse } from "next/server";
import db from "@/public/db.json";

export async function GET() {
  const news = db;
  return NextResponse.json(news);
}
