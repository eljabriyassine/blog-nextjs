// src/components/Navbar.tsx

"use client";

import Link from "next/link";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { SunIcon, MoonIcon } from "@heroicons/react/24/solid";
import { useState, useEffect, useRef } from "react";
import { useAuth } from "@/app/context/AuthContext";

export default function Navbar() {
  const { theme, setTheme } = useTheme();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const { isAuthenticated, signOut } = useAuth();

  // Close dropdown when clicked outside
  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header className="border-b">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold">
          ModernBlog
        </Link>
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <Link href="/" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  Home
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/about" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  About
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
        <div className="flex items-center space-x-4">
          {!isAuthenticated ? (
            <Link
              href="/auth"
              className="py-1 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
            >
              Login
            </Link>
          ) : (
            <>
              <div
                onClick={() => setIsDropdownOpen((prev) => !prev)}
                className="flex relative w-6 h-6 bg-cyan-400 p-1 justify-center items-center rounded-full text-white cursor-pointer"
              >
                XY
              </div>

              {isDropdownOpen && (
                <div
                  ref={dropdownRef}
                  className="absolute top-16 right-0 w-40 bg-white border border-gray-200 rounded-lg shadow-lg p-2"
                >
                  <ul>
                    <li>
                      <Link
                        href="/profile"
                        className="block px-4 py-2 text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700"
                      >
                        Profile
                      </Link>
                    </li>
                    <li>
                      <button
                        onClick={signOut}
                        className="block px-4 py-2 text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 w-full text-left"
                      >
                        Logout
                      </button>
                    </li>
                  </ul>
                </div>
              )}
            </>
          )}

          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          >
            {theme === "dark" ? (
              <SunIcon className="h-5 w-5" />
            ) : (
              <MoonIcon className="h-5 w-5" />
            )}
          </Button>
        </div>
      </div>
    </header>
  );
}
