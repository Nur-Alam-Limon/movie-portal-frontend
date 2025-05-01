'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();

  return (
    <div className="flex min-h-screen">
      <aside className="w-64 bg-gray-800 text-white p-4 space-y-4">
        <h1 className="text-xl font-bold">My Dashboard</h1>
        <nav className="flex flex-col gap-2">
          <Link href="/dashboard/movies" className={pathname === '/dashboard/movies' ? 'font-semibold underline' : ''}>Browse Movies</Link>
          <Link href="/dashboard/watchlist" className={pathname === '/dashboard/watchlist' ? 'font-semibold underline' : ''}>Watchlist</Link>
          <Link href="/dashboard/history" className={pathname === '/dashboard/history' ? 'font-semibold underline' : ''}>Purchase History</Link>
          <Link href="/dashboard/reviews" className={pathname === '/dashboard/reviews' ? 'font-semibold underline' : ''}>My Reviews</Link>
          <Link href="/dashboard/settings" className={pathname === '/dashboard/settings' ? 'font-semibold underline' : ''}>Settings</Link>
        </nav>
      </aside>
      <main className="flex-1 p-6 bg-gray-100">
        {children}
      </main>
    </div>
  );
};

export default DashboardLayout;
