"use client";

import { useRouter } from "next/navigation";

export const AdminSidebar = ({
  onSelectSection,
}: {
  onSelectSection: (section: string) => void;
}) => {
  const router = useRouter();
  const menuItems = [
    { name: "Dashboard", path: "/admin" },
    { name: "Movies", path: "/admin/movies" },
    { name: "Comments", path: "/admin/comments" },
    { name: "Reviews", path: "/admin/reviews" },
    { name: "Analytics", path: "/admin/analytics" },
  ];

  const handleNavigation = (item: { name: string; path: string }) => {
    onSelectSection(item.name);
    router.push(item.path);
  };

  return (
    <aside className="lg:w-72 w-full bg-[#2C2A4A] text-white flex flex-col items-start justify-start min-h-screen border-r border-gray-700 shadow-lg">
      <div className="text-2xl font-bold p-6 text-center border-b border-gray-700 w-full">
        Admin Panel
      </div>
      <ul className="w-full p-4 space-y-4">
        {menuItems.map((item, index) => (
          <li key={index} className="w-full">
            <div
              className="w-full cursor-pointer p-4 rounded-md hover:bg-blue-500 transition-colors duration-200"
              onClick={() => handleNavigation(item)}
            >
              <span className="text-white">{item.name}</span>
            </div>
            {index < menuItems.length - 1 && (
              <hr className="border-gray-700 w-full" />
            )}
          </li>
        ))}
      </ul>
    </aside>
  );
};
