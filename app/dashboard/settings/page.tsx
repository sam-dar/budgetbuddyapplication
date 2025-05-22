'use client';

import { useState } from 'react';

export default function SettingsPage() {
  const [name, setName] = useState("John Doe");
  const [currency, setCurrency] = useState("USD");

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white shadow rounded-xl space-y-10">
      <h2 className="text-2xl font-bold">Settings & Profile</h2>

      {/* Profile Section */}
      {/* <section>
        <h3 className="text-lg font-semibold mb-2">Profile Information</h3>
        <div className="space-y-4">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Full Name"
            className="w-full p-2 border rounded"
          />
          <input
            type="email"
            value="johndoe@email.com"
            disabled
            className="w-full p-2 border rounded bg-gray-100"
          />
          <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
            Update Profile
          </button>
        </div>
      </section> */}

      {/* Change Password */}
      <section>
        <h3 className="text-lg font-semibold mb-2">Change Password</h3>
        <div className="space-y-4">
          <input
            type="password"
            placeholder="Current Password"
            className="w-full p-2 border rounded"
          />
          <input
            type="password"
            placeholder="New Password"
            className="w-full p-2 border rounded"
          />
          <input
            type="password"
            placeholder="Confirm New Password"
            className="w-full p-2 border rounded"
          />
          <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
            Update Password
          </button>
        </div>
      </section>

      {/* App Preferences */}
      <section>
        <h3 className="text-lg font-semibold mb-2">App Preferences</h3>
        <div className="space-y-4">
          <label className="block text-sm">Default Currency</label>
          <select
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
            className="w-full p-2 border rounded"
          >
            <option value="USD">USD</option>
            <option value="PKR">PKR</option>
            <option value="EUR">EUR</option>
            <option value="INR">INR</option>
          </select>
        </div>
      </section>

      {/* Danger Zone */}
      <section>
        <h3 className="text-lg font-semibold text-red-600 mb-2">Danger Zone</h3>
        <div className="flex flex-col space-y-4">
          <p className="text-sm text-red-500">
            Deleting your account is irreversible. Please proceed with caution.</p>
          <button className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition">
            Delete My Account
          </button>
          <button className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-900 transition">
            Logout
          </button>
        </div>
      </section>
    </div>
  );
}
