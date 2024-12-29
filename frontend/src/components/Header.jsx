import { Link } from 'react-router-dom';
import { LogoutButton } from './LogoutButton';

export const Header = function () {
  return (
    <header className="bg-[#23272A] text-white py-2 px-2 shadow-md flex justify-between items-center">
      {/* Logo or Title */}
      <h1 className="text-2xl font-bold text-[#5865F2] mx-4">
        <Link to="/" className="hover:text-[#7289DA]">
          Chord
        </Link>
      </h1>

      {/* Navigation Links */}
      <nav className="flex gap-6 px-4">
       
        <LogoutButton />
      </nav>
    </header>
  );
};
