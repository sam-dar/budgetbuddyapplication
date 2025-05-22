// components/CategoryPieChart.tsx
'use client';

import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';

const COLORS = [
  '#8884d8', '#82ca9d', '#ffc658',
  '#ff7f50', '#a4de6c', '#d0ed57', '#8dd1e1'
];

type Expense = {
  category: string;
  amount: number;
};

type Props = {
  expenses: Expense[];
};

const CategoryPieChart: React.FC<Props> = ({ expenses }) => {
  const categoryData = expenses.reduce<Record<string, number>>((acc, curr) => {
    const key = curr.category || 'Uncategorized';
    acc[key] = (acc[key] || 0) + Number(curr.amount);
    return acc;
  }, {});

  const chartData = Object.entries(categoryData).map(([category, amount]) => ({
    category,
    amount,
  }));

  return (
    <div className=" w-full flex justify-center mt-4 mb-4 py-8 gap-16">
      <PieChart width={500} height={400}>
        <Pie
          data={chartData}
          dataKey="amount"
          nameKey="category"
          cx="50%"
          cy="50%"
          outerRadius={100}
          label
        >
          {chartData.map((_, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </div>
  );
};

export default CategoryPieChart;
