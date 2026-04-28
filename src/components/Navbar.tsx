import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '@/context/cartContext';

export default function Navbar() {
  const { totalItems } = useCart();

  const categories = [
    { name: 'Sarees', href: '/?category=sarees' },
    { name: 'Salwaar', href: '/?category=salwaar' },
    { name: 'Lehenga', href: '/?category=lehenga' },
  ];

  const materials = [
    { name: 'Silk', href: '/?material=silk' },
    { name: 'Cotton', href: '/?material=cotton' },
    { name: 'Georgette', href: '/?material=georgette' },
    { name: 'Chiffon', href: '/?material=chiffon' },
    { name: 'Rayon', href: '/?material=rayon' },
  ];

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50 border-b-4" style={{ borderColor: '#4158d0' }}>
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          {/* Logo on Left */}
          <Link href="/" className="flex-shrink-0">
            <Image
              src="/logo.png"
              alt="Sivam Sarees Logo"
              width={90}
              height={90}
              className="h-16 w-auto"
              priority
            />
          </Link>

          {/* Center - Navigation Links */}
          <div className="hidden md:flex gap-8 items-center">
            <Link href="/" style={{ color: '#4158d0' }} className="hover:opacity-80 transition-opacity font-medium text-lg">
              Home
            </Link>

            {/* Categories Dropdown */}
            <div className="relative group">
              <button style={{ color: '#4158d0' }} className="hover:opacity-80 transition-opacity font-medium text-lg">
                Categories
              </button>

              {/* Dropdown Menu */}
              <div className="absolute left-0 mt-0 w-48 bg-white rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 border-t-4" style={{ borderColor: '#4158d0' }}>
                <div className="py-2">
                  {categories.map((cat, idx) => (
                    <Link
                      key={idx}
                      href={cat.href}
                      style={{ color: '#4158d0' }}
                      className="block px-4 py-3 hover:bg-blue-50 hover:opacity-80 transition-all font-medium text-sm"
                    >
                      {cat.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* Materials Dropdown */}
            <div className="relative group">
              <button style={{ color: '#4158d0' }} className="hover:opacity-80 transition-opacity font-medium text-lg">
                Materials
              </button>

              {/* Dropdown Menu */}
              <div className="absolute left-0 mt-0 w-48 bg-white rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 border-t-4" style={{ borderColor: '#4158d0' }}>
                <div className="py-2">
                  {materials.map((material, idx) => (
                    <Link
                      key={idx}
                      href={material.href}
                      style={{ color: '#4158d0' }}
                      className="block px-4 py-3 hover:bg-blue-50 hover:opacity-80 transition-all font-medium text-sm"
                    >
                      {material.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            <Link href="#" style={{ color: '#4158d0' }} className="hover:opacity-80 transition-opacity font-medium text-lg">
              About
            </Link>
            <Link href="#" style={{ color: '#4158d0' }} className="hover:opacity-80 transition-opacity font-medium text-lg">
              Contact
            </Link>
          </div>

          {/* Right - Cart & Auth */}
          <div className="flex items-center gap-4">
            {/* Cart Icon with Badge */}
            <Link href="/cart" className="relative">
              <button style={{ color: '#4158d0' }} className="relative p-2 hover:opacity-80 transition-opacity rounded-lg">
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
                  <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1 -translate-y-1 rounded-full" style={{ backgroundColor: '#4158d0' }}>
                    {totalItems > 99 ? '99+' : totalItems}
                  </span>
                )}
              </button>
            </Link>

            {/* Auth Buttons */}
            <div className="flex gap-2">
              <Link
                href="/login"
                className="hidden sm:block px-4 py-2 rounded-lg transition-colors font-medium text-sm border-2"
                style={{ color: '#4158d0', borderColor: '#4158d0' }}
              >
                Login
              </Link>
              <Link
                href="/sign"
                className="px-4 py-2 text-white rounded-lg transition-colors font-medium text-sm shadow-md"
                style={{ backgroundColor: '#4158d0' }}
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