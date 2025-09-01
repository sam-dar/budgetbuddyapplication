import React from 'react'
import Link from "next/link";
import Banner2 from '@/components/Banner2';


function page() {

  return (
    <div>
          <Banner2/>
          <div className="p-8 text-center">
    
    {/* <div className="flex w-full flex flex-col"> */}
      <div className="flex flex-col gap-4 items-center text-center">
        <h2 className="text-4xl font-bold mb-4 text-green-700">Welcome to Your Smart Expense Tracker, You can Signup anytime to save your History</h2>
        <p className="text-lg text-gray-600 max-w-2xl">
          Manage your finances effortlessly. Here’s how you can use Budget Buddy:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <div className="bg-white p-4 rounded-md shadow">
            <h3 className=" text-green-700 font-bold text-2xl">Add Expenses</h3>
            <p className="text-gray-600 text-2xl">Easily add expenses with descriptions and amounts. </p>
            <Link href="/dashboard/add" className="text-blue-600 hover:underline">Go to Add Expense</Link>
          </div>

          <div className="bg-white p-4 rounded-md shadow">
            <h3 className=" text-green-700 font-bold text-2xl">View , Update, or Delete Expenses</h3>
            <p className="text-gray-600 text-2xl">See all your expenses at a glance, with options to filter by category.Modify or remove them anytime.</p>
            <Link href="/dashboard/view" className="text-blue-600 hover:underline">View Expenses</Link>
          </div>

          <div className="bg-white p-4 rounded-md shadow">
            <h3 className=" text-green-700 font-bold text-2xl">View Expense Summaries</h3>
            <p className="text-gray-600 text-2xl">Check your spending for the current month or get a full summary.</p>
            <Link href="/dashboard/summary" className="text-blue-600 hover:underline">View Summary</Link>
          </div>

          
          <div className="bg-white p-4 rounded-md shadow">
            <h3 className=" text-green-700 font-bold text-2xl">Settings & Profile</h3>
            <p className="text-gray-600 text-xl">Update your profile, password, and app settings.</p>
            <Link href="/dashboard/settings" className="text-blue-600 hover:underline">Go to Settings</Link>
          </div>
        </div>
      </div>
    </div>
    </div>
  );}

export default page