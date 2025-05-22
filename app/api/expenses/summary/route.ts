import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { createClient } from "@/utils/supabase/server";

export async function GET(req: NextRequest) {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      console.log("Unauthorized access attempt");
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const url = new URL(req.url);
    console.log("in summary route****",url)

    const yearParam = url.searchParams.get("year");
    const monthParam = url.searchParams.get("month");

    console.log("Query params:", { yearParam, monthParam });

    const whereClause: any = {
      userId: user.id,
    };

    const currentYear = new Date().getFullYear();
    console.log("Current Year:", currentYear);

    if (yearParam) {
      const year = parseInt(yearParam, 10);

      if (monthParam) {
        // Year and month provided — filter for that month only
        const month = parseInt(monthParam, 10);
        const startDate = new Date(year, month - 1, 1);
        const endDate = new Date(year, month, 1); // first day of next month
        console.log("Filtering by month:", { startDate, endDate });

        whereClause.date = {
          gte: startDate,
          lt: endDate,
        };
      } else {
        // Only year provided
        if (year === currentYear) {
          // If current year, filter from Jan 1 to today
          const startDate = new Date(year, 0, 1);
          const endDate = new Date(); // now
          console.log("Filtering current year till today:", { startDate, endDate });

          whereClause.date = {
            gte: startDate,
            lt: endDate,
          };
        } else {
          // Past year - from Jan 1 to Dec 31 of that year
          const startDate = new Date(year, 0, 1);
          const endDate = new Date(year + 1, 0, 1);
          console.log("Filtering full past year:", { startDate, endDate });

          whereClause.date = {
            gte: startDate,
            lt: endDate,
          };
        }
      }
    } else {
      console.log("No year filter applied");
    }

    const expenses = await prisma.expense.findMany({
      where: whereClause,
      orderBy: { date: "desc" },
    });

    console.log("Fetched expenses count:", expenses.length);

    return NextResponse.json({ expenses });
  } catch (error) {
    console.error("Error in GET /api/summary:", error);
    return NextResponse.json(
      { error: "Internal Server Error", details: (error as Error).message },
      { status: 500 }
    );
  }
}
