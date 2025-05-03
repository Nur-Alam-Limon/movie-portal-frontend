"use client";

import { Button } from "../ui/button";
import { logout } from "@/features/auth/authSlice";
import { AppDispatch, RootState } from "@/store";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import {
  FaSearch,
  FaBars,
  FaTimes,
  FaSun,
  FaMoon,
} from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";

type NavbarProps = {
  darkMode: boolean;
  setDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
};

const Navbar: React.FC<NavbarProps> = ({ darkMode, setDarkMode }) => {
  const { user } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };
  
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/browse-movies?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleSearchKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      router.push("/browse-movies");
    }
  };

  const handleLogout = () => {
    dispatch(logout());
    router.push("/login");
  };

  const dashboardHref =
    user?.role === "admin" ? "/admin" : user?.role === "user" ? "/user" : "/login";

  return (
    <nav className="bg-[#2C2A4A] text-white py-6 px-8 lg:px-16 flex justify-between items-center shadow-md sticky top-0 z-50">
      {/* Logo */}
      <Link href="/">
        <div className="flex items-center justify-center">
          <img
            src="/movie-portal.png"
            alt="logo"
            className="rounded-sm h-12 w-auto mr-2"
          />
          <span className="text-2xl font-bold text-[#71A9F7]">
            Movie Portal
          </span>
        </div>
      </Link>

      {/* Hamburger Icon for Mobile */}
      <div className="lg:hidden flex items-center">
        <button
          className="text-white text-3xl"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? (
            <FaTimes /> // Cross icon when the menu is open
          ) : (
            <FaBars className="text-2xl" /> // Hamburger icon when the menu is closed
          )}
        </button>
      </div>

      {/* Search Bar - Hidden on Mobile */}
      <div className="pl-28 hidden lg:block flex-grow items-center justify-center mx-20">
      <form onSubmit={handleSearchSubmit} className="flex items-center gap-2">
        <div className="relative">
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="Search movies..."
            className="bg-[#2C2A4A] text-white py-2 px-8 rounded-full pl-12 w-96 focus:outline-none focus:ring-2 focus:ring-blue-500 border"
          />
          <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>
        </form>
      </div>

      {/* Mobile Menu - Displayed when isMobileMenuOpen is true */}
      {isMobileMenuOpen && (
        <div className="lg:hidden absolute top-0 left-0 right-0 bg-[#2C2A4A] py-16 px-8 z-40">
          <div
            className="absolute right-10 top-10 text-2xl"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <FaTimes />
          </div>
          <div className="space-y-8">
            <Link
              href="/browse-movies"
              className="block hover:text-[#71A9F7] transition"
            >
              All Movies
            </Link>

            <Link
              href="/about"
              className="block hover:text-[#71A9F7] transition"
            >
              About Us
            </Link>

            {user ? (
              <>
                <Link
                  href={dashboardHref}
                  className="block hover:text-[#71A9F7] transition flex items-center"
                >
                   Dashboard
                </Link>
                <Button
                  className="py-2 px-4 bg-red-500 text-white rounded-md"
                  onClick={handleLogout}
                >
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="block hover:text-[#71A9F7] transition"
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  className="block hover:text-[#71A9F7] transition"
                >
                  Register
                </Link>
              </>
            )}

            {/* Wishlist Text */}
            {/* <Link
              href="/wishlist"
              className="block hover:text-[#71A9F7] transition"
            >
              Wishlist
            </Link> */}

           
          </div>
        </div>
      )}

      {/* Navigation Links - Visible on larger screens */}
      <div className="space-x-6 flex items-center hidden lg:flex">
        <Link href="/browse-movies" className="hover:text-[#71A9F7] transition">
        All Movies
        </Link>

        <Link
              href="/about"
              className="block hover:text-[#71A9F7] transition"
            >
              About Us
            </Link>

        {user ? (
          <>
            <Link
              href={dashboardHref}
              className="hover:text-[#71A9F7] transition flex items-center"
            >
              Dashboard
            </Link>
            <Button
              className="py-2 px-4 bg-red-500 text-white rounded-md"
              onClick={handleLogout}
            >
              Logout
            </Button>
          </>
        ) : (
          <>
            <Link href="/login" className="hover:text-[#71A9F7] transition">
              Login
            </Link>
            <Link href="/register" className="hover:text-[#71A9F7] transition">
              Register
            </Link>
          </>
        )}

        <div className="flex items-center mr-2">
          {/* Wishlist Icon - Hidden on Mobile */}
          {/* <Button
            variant="ghost"
            size="default"
            className="relative text-gray-200 flex items-center hidden lg:block"
            onClick={() => router.push("/wishlist")}
          >
            <FaHeart className="cursor-pointer text-xl" />
          </Button> */}

          
        </div>
      </div>

      {/* Dark Mode Toggle */}
      <button
        onClick={() => setDarkMode(!darkMode)}
        className="p-2 rounded-full transition-colors duration-300 bg-gray-200 dark:bg-gray-700"
      >
        {darkMode ? (
          <FaSun className="h-6 w-6 text-blue-500" />
        ) : (
          <FaMoon className="h-6 w-6 text-gray-800" />
        )}
      </button>

    </nav>
  );
};

export default Navbar;
