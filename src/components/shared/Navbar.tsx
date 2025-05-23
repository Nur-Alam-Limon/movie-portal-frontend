"use client";

import { Button } from "../ui/button";
import { logout } from "@/features/auth/authSlice";
import { useGetAllMoviesQuery } from "@/features/movies/moviesApi";
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
  FaChevronDown,
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
  const [showCategories, setShowCategories] = useState(false);
  const [dropdownHovered, setDropdownHovered] = useState(false);

  const { data: movies } = useGetAllMoviesQuery(null);
  const allGenres = Array.from(
    new Set(movies?.flatMap((movie: any) => movie.genres || []))
  ) as string[];

  const handleLogout = () => {
    dispatch(logout());
    router.push("/login");
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(
        `/browse-movies?search=${encodeURIComponent(searchQuery.trim())}`
      );
    }
  };

  const dashboardHref =
    user?.role === "admin"
      ? "/admin"
      : user?.role === "user"
      ? "/user"
      : "/login";

  return (
    <nav className="bg-[#121212] text-white py-6 px-8 lg:px-16 shadow-md sticky top-0 z-50">
      <div className="flex justify-between items-center container mx-auto relative">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <img
            src="/movie-portal.png"
            alt="logo"
            className="rounded-sm h-12 w-auto mr-2"
          />
          <span className="text-2xl font-bold text-white">Movie Portal</span>
        </Link>

        {/* Mega Menu Trigger */}
        <div className="hidden lg:flex relative">
          <button
            onMouseEnter={() => setShowCategories(true)}
            onMouseLeave={() => {
              setTimeout(() => {
                if (!dropdownHovered) setShowCategories(false);
              }, 100);
            }}
            className="flex items-center gap-1 cursor-pointer transition text-gray-300 hover:text-blue-500 dark:text-gray-200 dark:hover:text-blue-400"
          >
            Categories <FaChevronDown className="text-sm mt-0.5" />
          </button>

          {showCategories && (
            <div
              onMouseEnter={() => setDropdownHovered(true)}
              onMouseLeave={() => {
                setDropdownHovered(false);
                setShowCategories(false);
              }}
              className="absolute top-8 left-0 mt-2 rounded-md shadow-lg grid grid-cols-2 gap-2 p-8
      bg-white text-black
      dark:bg-[#1F1F1F] dark:text-gray-300
      border border-gray-200 dark:border-[#2A2A2A]
      z-50"
              style={{ minWidth: 400 }}
            >
              {allGenres?.slice(0, 12).map((genre) => (
                <div
                  key={genre}
                  onClick={() => router.push(`/browse-movies?genre=${genre}`)}
                  className="cursor-pointer rounded px-2 py-1 transition-colors
            hover:text-blue-500 dark:hover:text-blue-400
            hover:bg-blue-50 dark:hover:bg-[#2A2A2A]"
                >
                  {genre}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Mobile Hamburger */}
        <div className="lg:hidden">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-2xl"
          >
            {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {/* Search */}
        <form
          onSubmit={handleSearchSubmit}
          className="hidden lg:flex items-center gap-2 pl-10"
        >
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search movies..."
              className="bg-white text-black/90 py-2 px-8 rounded-full pl-12 w-96 focus:outline-none border"
            />
            <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
        </form>

        {/* Main Nav */}
        <div className="hidden lg:flex items-center space-x-6">
          <Link
            href="/browse-movies"
            className="hover:text-[#5799EF] transition"
          >
            All Movies
          </Link>

          <Link href="/about" className="hover:text-[#5799EF] transition">
            About Us
          </Link>

          <Link href="/contact" className="hover:text-[#5799EF] transition">
            Contact
          </Link>

          {user ? (
            <>
              <Link
                href={dashboardHref}
                className="hover:text-[#5799EF] transition"
              >
                Dashboard
              </Link>
              <Button className="bg-red-500 text-white" onClick={handleLogout}>
                Logout
              </Button>
            </>
          ) : (
            <>
              <Link href="/login" className="hover:text-[#5799EF] transition">
                Login
              </Link>
              <Link
                href="/register"
                className="hover:text-[#5799EF] transition"
              >
                Register
              </Link>
            </>
          )}

          {/* Dark Mode Toggle */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="ml-2 p-2 rounded-full bg-gray-200 dark:bg-gray-700"
          >
            {darkMode ? (
              <FaSun className="text-blue-500" />
            ) : (
              <FaMoon className="text-gray-800" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {/* Mobile Menu - Displayed when isMobileMenuOpen is true */}
        {isMobileMenuOpen && (
          <div className="lg:hidden absolute top-0 right-0 bg-[#2A2A2A] p-28 z-40">
            <div
              className="absolute right-10 top-10 text-2xl"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <FaTimes />
            </div>
            <div className="space-y-8">
              <Link
                href="/browse-movies"
                className="block hover:text-[#5799EF] transition"
              >
                All Movies
              </Link>

              <Link
                href="/about"
                className="block hover:text-[#5799EF] transition"
              >
                About Us
              </Link>

              <Link
                href="/contact"
                className="block hover:text-[#5799EF] transition"
              >
                Contact
              </Link>

              {user ? (
                <>
                  <Link
                    href={dashboardHref}
                    className="block hover:text-[#5799EF] transition flex items-center"
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
                    className="block hover:text-[#5799EF] transition"
                  >
                    Login
                  </Link>
                  <Link
                    href="/register"
                    className="block hover:text-[#5799EF] transition"
                  >
                    Register
                  </Link>
                </>
              )}

              {/* Wishlist Text */}
              {/* <Link
              href="/wishlist"
              className="block hover:text-[#5799EF] transition"
            >
              Wishlist
            </Link> */}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
