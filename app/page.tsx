import Banner from "@/components/Banner";

export default function Home() {
  return (
    <div>
      <Banner />
      <div className="p-8 text-center">
        <h2 className="text-3xl font-bold mb-4">Your Smart Expense Tracker</h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Budget Buddy helps you monitor and control your expenses easily. 
          Securely manage your expenses, track your spending, and stay in control of your finances. 
          Sign in now to unlock powerful tools and insights designed just for you.
        </p>
        <div className="mt-8 flex justify-center space-x-4">
          <a href="/sign-up" className="px-6 py-3 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600 transition">
            Get Started
          </a>
        </div>
      </div>
    </div>
  );
}
