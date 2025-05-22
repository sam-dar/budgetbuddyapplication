import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function ProtectedPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/sign-in");
  }

  return (
    <div className="bg-gradient-to-br from-gray-50 to-green-50 min-h-screen gap-8 flex flex-col items-center justify-center">
      <div className="max-w-6xl mx-auto px-6 py-12 text-center">
        <h2 className="text-4xl font-extrabold text-gray-800 mb-4">
          Welcome, <span className="text-green-700">{user.user_metadata.full_name}</span> 👋
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-10">
          Budget Buddy helps you track and manage your expenses with ease. Get started with any of the actions below.
        </p>

        <div className=" text-green-700 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <Card
            title="➕ Add Expenses"
            description="Add new expenses flawlessly."
            href="/dashboard/add"
          />
          <Card
            title="📋 View, Update, or Delete Expenses"
            description="See your expenses at a glance with easy filtering options,or manage existing ones anytime"
            href="/dashboard/view"
          />
          <Card
            title="📊 Expense Summaries"
            description="Check monthly reports or full summaries of your spending."
            href="/dashboard/summary"
          />
          
          <Card
            title="⚙️ Settings & Profile"
            description="Update your profile info and app preferences."
            href="/dashboard/settings"
          />
          <Card
            title="📤 Export Data"
            description="Export your expenses as a CSV for analysis or backup."
            href="/dashboard/summary"
          />
        </div>
      </div>
    </div>
  );
}

function Card({ title, description, href }: { title: string; description: string; href: string }) {
  return (
    <div className="bg-white rounded-2xl shadow-md p-6 hover:shadow-xl transition duration-300 border border-gray-200">
      <h3 className="text-xl font-semibold text-green-700 mb-2">{title}</h3>
      <p className="text-gray-600 mb-4 text-base">{description}</p>
      <Link
        href={href}
        className="inline-block text-blue-600 text-base font-semibold hover:underline"
      >
        Go &rarr;
      </Link>
    </div>
  );
}
