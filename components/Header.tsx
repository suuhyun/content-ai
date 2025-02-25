"use client";

import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { SidebarTrigger } from "./ui/sidebar";
import ThemeToggle from "./ThemeToggle";
import { Categories } from "@/app/dashboard/components/Categories";
import HistorySearch from "@/app/dashboard/history/components/HistorySearch";
import Auth from "./Auth";
import { Suspense } from "react";

interface HeaderProps {
  type?: "default" | "search" | "history";
  searchQuery?: string;
  setSearchQuery?: (query: string) => void;
  onSearchInput?: (query: string) => void;
}

export default function Header({
  type = "default",
  searchQuery,
  setSearchQuery,
  onSearchInput,
}: HeaderProps) {
  return (
    <header className="flex items-center justify-between px-4 md:px-6 h-16 border-b border-violet-100/10 dark:border-gray-800 bg-white/5 backdrop-blur-xl">
      <div className="flex items-center gap-4 min-w-0 flex-1">
        <SidebarTrigger />
        <ThemeToggle />

        {type === "search" && (
          <div className="flex max-md:flex-col items-center gap-4 min-w-0 flex-1 max-w-4xl">
            <div className="relative w-full max-w-md">
              <div className="relative">
                <Search className="search-icon" />
                <Input
                  placeholder="Search templates..."
                  className="search-input"
                  onChange={(e) => onSearchInput?.(e.target.value)}
                />
              </div>
            </div>
            <div className="hidden xl:block min-w-0 flex-1">
              {onSearchInput && <Categories onSearchInput={onSearchInput} />}
            </div>
          </div>
        )}

        {type === "history" && searchQuery !== undefined && setSearchQuery && (
          <HistorySearch
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />
        )}
      </div>
      <div className="ml-5">
        <Auth />
      </div>
      {/* {type === "search" && onSearchInput && (
        <div className="md:hidden px-4 pb-4">
          <Categories onSearchInput={onSearchInput} />
        </div>
      )} */}
    </header>
  );
}
