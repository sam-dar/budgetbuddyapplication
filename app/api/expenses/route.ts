// app/api/expenses/route.ts
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";

export async function POST(req: Request) {
  try {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { title, amount, category, date } = body;
// console.log("data",title, amount, category, date,user.id)
    const expense = await prisma.expense.create({
      data: {
        title,
        amount: parseFloat(amount),
        category,
        date: new Date(date),
        userId: user.id, // ✅ correct user ID
      },
    });

    return NextResponse.json(expense, { status: 201 });
  } catch (error: any) {
    console.error("❌ Expense creation error:", error);
    return NextResponse.json(
      { error: "Failed to create expense", detail: error.message },
      { status: 500 }
    );
  }
}
