import { Outlet } from 'react-router-dom';

export const App = () => {
  return (
    <div className="bg-neutral-900 min-h-screen text-white flex flex-col">

      <main className="flex flex-col items-center justify-center flex-grow container mx-auto p-6">
        {/* Hero Section */}
        <section className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">
            Welcome to Chord
          </h1>
          <p className="text-gray-400 text-lg">
            Connect with your friends, create communities, and share moments together.
          </p>
        </section>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-4 justify-center">
          <a href="/signup">
            <button className="text-white bg-[#5865F2] hover:bg-[#4752C4] px-6 py-3 rounded-lg text-lg">
              Sign Up
            </button>
          </a>
          <a href="/login">
            <button className="text-white bg-neutral-700 hover:bg-neutral-600 px-6 py-3 rounded-lg text-lg">
              Log In
            </button>
          </a>
        </div>
      </main>

      {/* Footer Section */}
      <footer className="bg-neutral-800 py-4 text-center text-gray-500">
        <p>&copy; 2024 Chord. All rights reserved.</p>
      </footer>

      <Outlet />
    </div>
  );
};
