"use client";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useState } from "react";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold text-gray-800">
            Interface
          </Link>
          <nav className="hidden md:flex space-x-6">
            <Link
              href="/"
              className="text-gray-600 hover:text-gray-800 transition duration-300"
            >
              Home
            </Link>
            <Link
              href="/about"
              className="text-gray-600 hover:text-gray-800 transition duration-300"
            >
              About
            </Link>
            <Link
              href="/services"
              className="text-gray-600 hover:text-gray-800 transition duration-300"
            >
              Services
            </Link>
            <Link
              href="/contact"
              className="text-gray-600 hover:text-gray-800 transition duration-300"
            >
              Contact
            </Link>
          </nav>
          <button
            className="md:hidden focus:outline-none"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
        {isMenuOpen && (
          <nav className="mt-4 md:hidden">
            <Link
              href="/"
              className="block py-2 text-gray-600 hover:text-gray-800 transition duration-300"
            >
              Home
            </Link>
            <Link
              href="/about"
              className="block py-2 text-gray-600 hover:text-gray-800 transition duration-300"
            >
              About
            </Link>
            <Link
              href="/services"
              className="block py-2 text-gray-600 hover:text-gray-800 transition duration-300"
            >
              Services
            </Link>
            <Link
              href="/contact"
              className="block py-2 text-gray-600 hover:text-gray-800 transition duration-300"
            >
              Contact
            </Link>
          </nav>
        )}
      </div>
    </header>
  );
}
