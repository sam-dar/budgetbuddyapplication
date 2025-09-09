"use client";

import { useState, useEffect } from "react";
import { toast, Toaster } from "react-hot-toast";

interface Expense {
  id: number;
  title: string;
  amount: number;
  category: string;
  date: string;
}

type DateFilter = "all" | "daily" | "weekly" | "monthly" | "custom";

const CATEGORIES = [
  "Food",
  "Transport",
  "Shopping",
  "Bills",
  "Health",
  "Entertainment",
  "Other",
];

export default function ViewExpensesPage() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [loading, setLoading] = useState(true);
  const [dateFilter, setDateFilter] = useState<DateFilter>("daily");
  const [customStart, setCustomStart] = useState<string>("");
  const [customEnd, setCustomEnd] = useState<string>("");
  const [currentPage, setCurrentPage] = useState(1);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editFields, setEditFields] = useState<Partial<Expense>>({});
  const recordsPerPage = 30;

  function getDateRange() {
    const now = new Date();
    let startDate: Date | null = null;
    let endDate: Date | null = null;

    switch (dateFilter) {
      case "daily":
        startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        endDate = new Date(
          now.getFullYear(),
          now.getMonth(),
          now.getDate(),
          23,
          59,
          59
        );
        break;
      case "weekly":
        startDate = new Date(now);
        startDate.setDate(now.getDate() - 7);
        endDate = now;
        break;
      case "monthly":
        startDate = new Date(now);
        startDate.setDate(now.getDate() - 30);
        endDate = now;
        break;
      case "custom":
        if (customStart) startDate = new Date(customStart);
        if (customEnd) {
          const end = new Date(customEnd);
          end.setHours(23, 59, 59, 999);
          endDate = end;
        }
        break;
    }
    return { startDate, endDate };
  }

  async function fetchExpenses() {
    setLoading(true);
    const { startDate, endDate } = getDateRange();
    let url = "/api/expenses/view";
    const params = new URLSearchParams();
    if (startDate) params.append("startDate", startDate.toISOString());
    if (endDate) params.append("endDate", endDate.toISOString());
    if (params.toString().length > 0) url += `?${params.toString()}`;
    const res = await fetch(url);
    if (res.ok) setExpenses(await res.json());
    else toast.error("Failed to fetch expenses");
    setLoading(false);
  }

  useEffect(() => {
    setCurrentPage(1);
    fetchExpenses();
  }, [dateFilter, customStart, customEnd]);

  async function handleDelete(id: number) {
    if (!confirm("Are you sure you want to delete this expense?")) return;
    setLoading(true);
    const res = await fetch(`/api/expenses/${id}`, { method: "DELETE" });
    setLoading(false);
    if (res.ok) setExpenses((prev) => prev.filter((exp) => exp.id !== id));
    else toast.error("Failed to delete expense");
  }

  function startEditing(expense: Expense) {
    setEditingId(expense.id);
    setEditFields({
      title: expense.title,
      amount: expense.amount,
      category: expense.category,
      date: expense.date.slice(0, 10),
    });
  }

  function cancelEditing() {
    setEditingId(null);
    setEditFields({});
  }

  async function saveUpdate(id: number) {
    setLoading(true);
    if (
      !editFields.title?.trim() ||
      !editFields.category?.trim() ||
      !editFields.date ||
      !editFields.amount ||
      Number(editFields.amount) <= 0
    ) {
      toast.error("Please fill in all fields with valid data.");
      return;
    }

    const body = {
      title: editFields.title,
      amount: Number(editFields.amount),
      category: editFields.category,
      date: editFields.date,
    };

    const res = await fetch(`/api/expenses/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    setLoading(false);
    if (res.ok) {
      setExpenses((prev) =>
        prev.map((exp) =>
          exp.id === id
            ? { ...exp, ...body, date: new Date(body.date).toISOString() }
            : exp
        )
      );
      cancelEditing();
    } else {
      toast.error("Failed to update expense");
    }
  }

  function onChangeField(field: keyof Expense, value: string) {
    setEditFields((prev) => ({ ...prev, [field]: value }));
  }

  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentExpenses = expenses.slice(indexOfFirstRecord, indexOfLastRecord);
  const totalPages = Math.ceil(expenses.length / recordsPerPage);

  return (
    <div className="w-full mx-auto mt-8 py-4 px-12 bg-gray-50 rounded-lg shadow overflow-x-auto">
      <h1 className="text-3xl font-bold mb-6 text-green-700">Your Expenses</h1>

      {/* Date filters */}
      <div className="mb-4 space-x-2">
        {["all", "daily", "weekly", "monthly", "custom"].map((filter) => (
          <button
            key={filter}
            className={`text-xl px-3 py-1 rounded font-medium ${
              dateFilter === filter
                ? "bg-green-600 text-white"
                : "bg-green-100 text-green-700"
            }`}
            onClick={() => setDateFilter(filter as DateFilter)}
          >
            {filter.charAt(0).toUpperCase() + filter.slice(1)}
          </button>
        ))}
      </div>

      {dateFilter === "custom" && (
        <div className="mb-4 flex space-x-4 items-center">
          <div>
            <label
              htmlFor="start"
              className="block font-semibold text-green-700"
            >
              Start Date:
            </label>
            <input
              type="date"
              id="start"
              value={customStart}
              onChange={(e) => setCustomStart(e.target.value)}
              className="border rounded p-1"
            />
          </div>
          <div>
            <label htmlFor="end" className="block font-semibold text-green-700">
              End Date:
            </label>
            <input
              type="date"
              id="end"
              value={customEnd}
              onChange={(e) => setCustomEnd(e.target.value)}
              className="border rounded p-1"
            />
          </div>
        </div>
      )}

      {loading ? (
        <p>Loading...</p>
      ) : expenses.length === 0 ? (
        <p>No expenses found.</p>
      ) : (
        <>
          <table className="w-full min-w-[800px] table-auto border-collapse border border-green-300">
            <thead>
              <tr className=" text-xl bg-green-100 text-green-700">
                <th className="border border-green-300 px-4 py-2">Title</th>
                <th className="border border-green-300 px-4 py-2">
                  Amount (Rs.)
                </th>
                <th className="border border-green-300 px-4 py-2">Category</th>
                <th className="border border-green-300 px-4 py-2">Date</th>
                <th className="border border-green-300 px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentExpenses.map((expense) => {
                const isEditing = editingId === expense.id;
                return (
                  <tr
                    key={expense.id}
                    className={`text-base text-center text-black transition-all duration-300 ease-in-out ${
                      isEditing
                        ? "bg-yellow-50 shadow-inner transform scale-105"
                        : "bg-white hover:bg-green-50"
                    }`}
                  >
                    <td className="border border-green-200 px-4 py-2">
                      {isEditing ? (
                        <input
                          type="text"
                          value={editFields.title || ""}
                          onChange={(e) =>
                            onChangeField("title", e.target.value)
                          }
                          className="border p-1 rounded w-full"
                          autoFocus
                        />
                      ) : (
                        expense.title
                      )}
                    </td>
                    <td className="border border-green-200 px-4 py-2">
                      {isEditing ? (
                        <input
                          type="number"
                          min={0.01}
                          step={0.01}
                          value={editFields.amount || ""}
                          onChange={(e) =>
                            onChangeField("amount", e.target.value)
                          }
                          className="border p-1 rounded w-full"
                        />
                      ) : (
                        expense.amount.toFixed(2)
                      )}
                    </td>
                    <td className="border border-green-200 px-4 py-2">
                      {isEditing ? (
                        <select
                          value={editFields.category || ""}
                          onChange={(e) =>
                            onChangeField("category", e.target.value)
                          }
                          className="border p-1 rounded w-full"
                        >
                          <option value="">Select</option>
                          {CATEGORIES.map((cat) => (
                            <option key={cat} value={cat}>
                              {cat}
                            </option>
                          ))}
                        </select>
                      ) : (
                        expense.category
                      )}
                    </td>
                    <td className="border border-green-200 px-4 py-2">
                      {isEditing ? (
                        <input
                          type="date"
                          value={editFields.date || ""}
                          onChange={(e) =>
                            onChangeField("date", e.target.value)
                          }
                          className="border p-1 rounded w-full"
                        />
                      ) : (
                        new Date(expense.date).toLocaleDateString()
                      )}
                    </td>
                    <td className="border border-green-200 px-4 py-2 space-x-2">
                      {isEditing ? (
                        <>
                          <button
                            onClick={() => saveUpdate(expense.id)}
                            disabled={loading}
                            className={`${
                              loading
                                ? "bg-gray-400 cursor-not-allowed"
                                : "bg-green-500 hover:bg-green-800"
                            } text-white px-2 py-1 rounded`}
                          >
                            {loading ? "Updating..." : "Save"}
                          </button>
                          <button
                            className="bg-gray-400 hover:bg-gray-500 text-white px-2 py-1 rounded"
                            onClick={cancelEditing}
                          >
                            Cancel
                          </button>
                        </>
                      ) : (
                        <>
                          <button
                            className="bg-green-800 hover:bg-green-900 text-white px-3 py-2 rounded"
                            onClick={() => startEditing(expense)}
                          >
                            Update
                          </button>
                          <button
                            onClick={() => handleDelete(expense.id)}
                            disabled={loading}
                            className={`${
                              loading
                                ? "bg-gray-400 cursor-not-allowed"
                                : "bg-red-800 hover:bg-red-900"
                            } text-white px-4 py-2 rounded`}
                          >
                            {loading ? "Deleting..." : "Delete"}
                          </button>
                        </>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          {/* Pagination */}
          <div className="mt-4 flex justify-center space-x-2">
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                className={`px-3 py-1 rounded ${
                  currentPage === i + 1
                    ? "bg-green-600 text-white"
                    : "bg-green-100 text-green-700"
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
