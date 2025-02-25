"use client"

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Filter, Search } from "lucide-react";
import React from "react";

interface HistorySearchProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const HistorySearch = ({
  searchQuery,
  setSearchQuery,
}: HistorySearchProps) => {
  return (
    <div className="flex items-center gap-4">
      <div className="relative flex-1 md:w-80 ">
        <Search className="search-icon" />
        <Input
          placeholder="Search outputs..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-input"
        />
      </div>
    </div>
  );
};

export default HistorySearch;
