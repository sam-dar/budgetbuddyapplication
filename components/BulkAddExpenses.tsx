"use client";

import { useState } from "react";
import { toast } from "react-hot-toast";

const defaultExpense = {
  title: "",
  amount: "",
  category: "GROCERIES",
  date: new Date().toISOString().split("T")[0],
};

export default function BulkAddExpenses() {
  const [expenses, setExpenses] = useState([{ ...defaultExpense }]);
  const [loading, setLoading] = useState(false);

  const handleChange = (index: number, field: string, value: string) => {
    const updated = [...expenses];
    updated[index] = { ...updated[index], [field]: value };
    setExpenses(updated);
  };

  const addRow = () => {
    setExpenses([...expenses, { ...defaultExpense }]);
  };

  const removeRow = (index: number) => {
    const updated = expenses.filter((_, i) => i !== index);
    setExpenses(updated.length ? updated : [{ ...defaultExpense }]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const formatted = expenses.map((exp) => ({
      ...exp,
      amount: parseFloat(exp.amount),
    }));

    const res = await fetch("/api/expenses/bulkAdd", {
      method: "POST",
      body: JSON.stringify({ expenses: formatted }),
    });
    setLoading(false);

    if (res.ok) {
      toast.success("All expenses added!");
      setExpenses([{ ...defaultExpense }]);
    } else {
      toast.error("Failed to add expenses.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {expenses.map((expense, index) => (
        <div key={index} className="grid grid-cols-5 gap-2 items-center">
          <input
            type="text"
            value={expense.title}
            onChange={(e) => handleChange(index, "title", e.target.value)}
            placeholder="Title"
            required
            className="p-2 border rounded col-span-1"
          />
          <input
            type="number"
            value={expense.amount}
            onChange={(e) => handleChange(index, "amount", e.target.value)}
            placeholder="Amount"
            required
            className="p-2 border rounded col-span-1"
          />
          <select
            value={expense.category}
            onChange={(e) => handleChange(index, "category", e.target.value)}
            required
            className="p-2 border rounded col-span-1"
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
            value={expense.date}
            onChange={(e) => handleChange(index, "date", e.target.value)}
            required
            className="p-2 border rounded col-span-1"
          />
          <button
            type="button"
            onClick={() => removeRow(index)}
            className="bg-red-500 text-white p-2 rounded hover:bg-red-600 col-span-1"
          >
            ✕
          </button>
        </div>
      ))}
      <div className="flex p-8 gap-6 mt-12">
        <button
          type="button"
          onClick={addRow}
          className="bg-gray-200 px-4 py-2 rounded hover:bg-gray-300"
        >
          + Add Next
        </button>
        <button
          type="submit"
          disabled={loading}
          className={`${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-green-700 hover:bg-green-800"
          } text-white p-4 rounded transition`}
        >
          {loading ? "Adding..." : "Add All Expenses"}
        </button>
      </div>
    </form>
  );
}
