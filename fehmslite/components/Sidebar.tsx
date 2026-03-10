"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/employees", label: "Employees" },
  { href: "/attendance", label: "Attendance" },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 flex h-full w-56 flex-col border-r border-gray-200 bg-white">
      <div className="flex h-14 items-center border-b border-gray-200 px-5">
        <Link href="/" className="text-lg font-bold text-gray-800">
          HRMS Lite
        </Link>
      </div>

      <nav className="flex flex-1 flex-col gap-1 p-3">
        {links.map(({ href, label }) => {
          const active = pathname.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              className={`rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                active
                  ? "bg-blue-50 text-blue-700"
                  : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
              }`}
            >
              {label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
