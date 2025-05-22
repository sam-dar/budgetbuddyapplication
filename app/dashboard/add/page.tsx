"use client";

import { useState } from "react";
import { toast, Toaster } from "react-hot-toast";
import BulkAddExpenses from "@/components/BulkAddExpenses";
import Link from "next/link"; // ✅ Fixed import

export default function AddExpensePage() {
  const [bulkMode, setBulkMode] = useState(false);
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("GROCERIES");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const res = await fetch("/api/expenses", {
      method: "POST",
      body: JSON.stringify({
        title,
        amount: parseFloat(amount),
        category,
        date,
      }),
    });

    setLoading(false);

    if (res.ok) {
      toast.success("Expense added successfully");
      setTitle("");
      setAmount("");
      setCategory("GROCERIES");
      setDate(new Date().toISOString().split("T")[0]);
    } else {
      toast.error("Failed to add expense.");
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto mt-10 p-6 bg-white shadow rounded-xl">
      <Toaster position="top-center" />
      <h2 className="text-xl font-bold mb-4">
        {bulkMode ? "Bulk Add Expenses" : "Add Expense"}
      </h2>

      <button
        className="mb-4 text-base text-white bg-green-700 p-2 rounded hover:bg-green-800 transition"
        onClick={() => setBulkMode(!bulkMode)}
      >
        {bulkMode ? "Switch to Single Entry" : "Switch to Bulk Add"}
      </button>

      <div className="mb-4 text-right">
        <Link href="/dashboard/view" className=" text-base text-blue-600 hover:underline ">
          View Your Expense History
        </Link>
      </div>

      <div className="mt-8">
        {bulkMode ? (
          <BulkAddExpenses />
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Title"
              required
              className="w-full p-2 border rounded"
            />
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Amount"
              required
              className="w-full p-2 border rounded"
            />
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
              className="w-full p-2 border rounded"
            >
              <option value="GROCERIES">Groceries</option>
              <option value="UTILITIES">Utilities</option>
              <option value="TRANSPORT">Transport</option>
              <option value="ENTERTAINMENT">Entertainment</option>
              <option value="HEALTH">Health</option>
              <option value="EDUCATION">Education</option>
              <option value="DINING">Dining</option>
              <option value="RENT">Rent</option>
              <option value="OTHER">Other</option>
            </select>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
              className="w-full p-2 border rounded"
            />
            <button
              type="submit"
              disabled={loading}
              className={`${
                loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-green-700 hover:bg-green-800"
              } text-white p-2 rounded w-full transition`}
            >
              {loading ? "Adding..." : "Add Expense"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
