import db from "@/lib/db";
import { usersAddresses } from "@/lib/db/schema";
import { eq, sql } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId");
  const page = Number(searchParams.get("page")) || 1;
  const perPage = Number(searchParams.get("perPage")) || 1;

  if (!userId) {
    return NextResponse.json({ error: "User ID is required" }, { status: 400 });
  }

  const addresses = await db.
    select()
    .from(usersAddresses)
    .where(eq(usersAddresses.userId, +userId))
    .limit(perPage)
    .offset((page - 1) * perPage)
    .orderBy(usersAddresses.validFrom)

  const [count] = await db.
    select({ count: sql`count(*)`.mapWith(Number) })
    .from(usersAddresses)
    .where(eq(usersAddresses.userId, +userId))


  return NextResponse.json({ addresses, count: count.count });
}
