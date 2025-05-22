// src/components/Navbar.tsx
"use client";

import Link from "next/link";
import Image from "next/image";
import { signOut, useSession } from "next-auth/react";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import logo from "../public/logo.png";

export default function Navbar() {
  const { data: session } = useSession();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
<nav className="bg-white shadow-md sticky top-0 z-50">
  <div className="flex items-center justify-between max-w-7xl mx-auto px-4 py-4">
    <div className="flex items-center space-x-2">
      {/* Push logo to the very left by removing any extra padding/margin on parent */}
      <Image src={logo} alt="Budget Buddy Logo" width={40} height={40} />
      {/* Change text color to green matching logo color */}
      <Link href="/" className="text-2xl font-bold text-green-600">
        Budget Buddy
      </Link>
    </div>
        <div className="hidden md:flex items-center space-x-4">
          {session ? (
            <>
              <span className="text-gray-700 font-semibold">Hello, {session.user?.name}</span>
              <Link href="/history" className="text-gray-700 hover:text-blue-500">History</Link>
              <button
                onClick={() => signOut()}
                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
              >
                Sign Out
              </button>
            </>
          ) : (
            <>
              <Link href="/login" className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition">
                Sign In
              </Link>
              <Link href="/signup" className="px-4 py-2 border border-blue-500 text-blue-500 rounded-md hover:bg-blue-500 hover:text-white transition">
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
