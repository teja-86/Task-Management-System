import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center space-y-4">
      <h1 className="text-3xl font-bold">Welcome to Task Manager</h1>
      <div className="flex space-x-4">
        <Link href="/register">
          <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
            Sign Up
          </button>
        </Link>
        <Link href="/login">
          <button className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600">
            Sign In
          </button>
        </Link>
      </div>
    </main>
  );
}