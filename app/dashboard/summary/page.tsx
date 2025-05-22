"use client";

import { useEffect, useState } from "react";
import CategoryPieChart from "@/components/CategoryPieChart";
import { toast, Toaster } from "react-hot-toast";


export default function ExpenseSummaryPage() {
  const currentYear = new Date().getFullYear();
  const [year, setYear] = useState<number>(currentYear);
  const [month, setMonth] = useState<string>("");
  const [expenses, setExpenses] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [showChart, setShowChart] = useState<boolean>(false);

  const fetchExpenses = async () => {
    setLoading(true);
    let url = `/api/expenses/summary?year=${year}`;
    if (month) url += `&month=${month}`;
    const res = await fetch(url);
    const data = await res.json();
    setExpenses(data.expenses);
    setLoading(false);
  };

  const handleDownloadCSV = () => {
    if (!expenses || expenses.length === 0) {
      toast.error("No expenses to download.");      
      return;
    }

    const headers = ["Date", "Title", "Category", "Amount"];
    const rows = expenses.map((expense) => [
      new Date(expense.date).toLocaleDateString(),
      expense.title,
      expense.category,
      expense.amount,
    ]);

    const total = expenses.reduce((sum, exp) => sum + Number(exp.amount), 0);
    rows.push(["", "", "Total", total]);

    const csvContent = [headers, ...rows]
      .map((row) =>
        row.map((value) => `"${String(value).replace(/"/g, '""')}"`).join(",")
      )
      .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `expenses_${year}${month ? `_month_${month}` : ""}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  useEffect(() => {
    fetchExpenses();
  }, [year, month]);

  const total = expenses.reduce((acc, curr) => acc + curr.amount, 0);

  return (
    <div className="w-full max-w-5xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-2xl text-green-700 font-bold mb-4">View Expense Summaries</h1>

      <div className="flex justify-between items-end mt-8 mb-6">
        <div className="flex gap-4">
          <div>
            <label className="block text-base font-medium mb-1">Year</label>
            <select
              className="border px-6 py-2 rounded"
              value={year}
              onChange={(e) => setYear(Number(e.target.value))}
            >
              {Array.from({ length: 5 }, (_, i) => 2021 + i).map((y) => (
                <option key={y} value={y}>{y}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-base font-medium mb-1">Month (optional)</label>
            <select
              className="border px-6 py-2 rounded"
              value={month}
              onChange={(e) => setMonth(e.target.value)}
            >
              <option value="">All Months</option>
              {Array.from({ length: 12 }, (_, i) => i + 1).map((m) => (
                <option key={m} value={m}>{m}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex gap-3">
          <button
            className="bg-green-700 text-white px-6 py-3 rounded hover:bg-green-800 text-base"
            onClick={() => setShowChart((prev) => !prev)}
          >
            {showChart ? "Show Table" : "Show Chart"}
          </button>
          <button
            className="bg-green-700 text-white px-6 py-3 rounded hover:bg-green-800 text-base"
            onClick={handleDownloadCSV}
          >
            Download CSV
          </button>
        </div>
      </div>

      {loading ? (
        <p className="text-xl text-green-700">Loading...</p>
      ) : showChart ? (
        <div className="flex justify-centerw-full text-base">
        <CategoryPieChart expenses={expenses} />
        </div>
      ) : (
        <>
          <table className="w-full text-base border">
            <thead>
              <tr className="bg-green-200">
                <th className="p-2 border">Date</th>
                <th className="p-2 border">Title</th>
                <th className="p-2 border">Amount (Rs)</th>
              </tr>
            </thead>
            <tbody>
              {expenses.map((expense) => (
                <tr key={expense.id}>
                  <td className="p-2 border">{new Date(expense.date).toLocaleDateString()}</td>
                  <td className="p-2 border">{expense.title}</td>
                  <td className="p-2 border text-right">{expense.amount.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="mt-4 text-right font-bold text-lg">
            Total: Rs {total.toFixed(2)}
          </div>
        </>
      )}
    </div>
  );
}
