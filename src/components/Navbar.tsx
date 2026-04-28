import React from 'react';
import Link from 'next/link';
import { useCart } from '@/context/cartContext';

export default function Navbar() {
  const { totalItems } = useCart();

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold text-blue-600">
            Salwaar
          </Link>

          {/* Center - Navigation Links */}
          <div className="hidden md:flex gap-8">
            <Link href="/" className="text-gray-700 hover:text-blue-600 transition-colors">
              Products
            </Link>
            <Link href="#" className="text-gray-700 hover:text-blue-600 transition-colors">
              Categories
            </Link>
            <Link href="#" className="text-gray-700 hover:text-blue-600 transition-colors">
              About
            </Link>
          </div>

          {/* Right - Auth & Cart */}
          <div className="flex items-center gap-4">
            {/* Cart Icon with Badge */}
            <Link href="/cart" className="relative">
              <button className="relative p-2 text-gray-700 hover:text-blue-600 transition-colors">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>

                {/* Badge */}
                {totalItems > 0 && (
                  <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1 -translate-y-1 bg-red-600 rounded-full">
                    {totalItems > 99 ? '99+' : totalItems}
                  </span>
                )}
              </button>
            </Link>

            {/* Auth Section - Just show buttons for now */}
            <div className="flex gap-2">
              <Link
                href="/login"
                className="px-4 py-2 text-blue-600 hover:bg-blue-50 rounded transition-colors font-medium text-sm"
              >
                Login
              </Link>
              <Link
                href="/signup"
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors font-medium text-sm"
              >
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}