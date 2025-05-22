import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { createClient } from "@/utils/supabase/server";

export async function POST(req: NextRequest) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { expenses } = await req.json();

  if (!Array.isArray(expenses) || expenses.length === 0) {
    return NextResponse.json(
      { error: "Invalid or empty expenses array." },
      { status: 400 }
    );
  }

  try {
    const expensesWithUserId = expenses.map((expense: any) => ({
      ...expense,
      userId: user.id,
      date: new Date(expense.date), // 👈 Fix here
    }));

    await prisma.expense.createMany({
      data: expensesWithUserId,
    });

    return NextResponse.json({ message: "Expenses added" }, { status: 200 });
  } catch (err) {
    console.error("Prisma error:", err);
    return NextResponse.json(
      { error: "Failed to add expenses." },
      { status: 500 }
    );
  }
}
