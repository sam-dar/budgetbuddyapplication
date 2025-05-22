import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { createClient } from "@/utils/supabase/server";

export async function GET(req: NextRequest) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const url = new URL(req.url);
  const startDateParam = url.searchParams.get("startDate");
  const endDateParam = url.searchParams.get("endDate");

  const dateFilter: any = {};
  if (startDateParam) dateFilter.gte = new Date(startDateParam);
  if (endDateParam) dateFilter.lte = new Date(endDateParam);

  const whereClause: any = { userId: user.id };
  if (startDateParam || endDateParam) {
    whereClause.date = dateFilter;
  }

  const expenses = await prisma.expense.findMany({
    where: whereClause,
    orderBy: { date: "desc" },
  });

  return NextResponse.json(expenses);
}
