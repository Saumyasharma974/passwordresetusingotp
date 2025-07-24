import { Link } from "react-router-dom";
import photo from '/photo.jpg'
export default function Landing() {
  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-100 via-blue-200 to-blue-300 flex flex-col">
      {/* Navbar */}
      <header className="flex justify-between items-center px-6 py-4 bg-white shadow-md">
        <h1 className="text-2xl font-bold text-blue-700">MyAuthApp</h1>
        <nav>
          <Link to="/login" className="text-blue-700 hover:underline mx-3">
            Login
          </Link>
          <Link to="/register" className="text-blue-700 hover:underline mx-3">
            Register
          </Link>
        </nav>
      </header>

      {/* Hero Section */}
      <main className="flex-1 flex flex-col lg:flex-row items-center justify-between px-10 py-20">
        <div className="max-w-xl">
          <h2 className="text-4xl lg:text-5xl font-extrabold text-blue-800 mb-6">
            Secure, Simple, and Fast Authentication
          </h2>
          <p className="text-gray-700 text-lg mb-8">
            Your privacy is our priority. Register, login, and recover your password with ease.
          </p>
          <div className="flex gap-4">
            <Link to="/register" className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition">
              Get Started
            </Link>
            <Link to="/login" className="px-6 py-3 bg-white border border-blue-600 text-blue-600 rounded-lg shadow hover:bg-blue-50 transition">
              Login
            </Link>
          </div>
        </div>

        {/* Optional Image */}
        <div className="mt-12 lg:mt-0">
          <img
            src={photo}
            alt="Authentication illustration"
            className="w-full max-w-md"
          />
        </div>
      </main>

      {/* Footer */}
      <footer className="text-center py-4 bg-white shadow-inner text-sm text-gray-500">
        © 2025 MyAuthApp. All rights reserved.
      </footer>
    </div>
  );
}
