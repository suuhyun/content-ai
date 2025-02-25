"use client";

import { useState } from "react";
import { AIOutput } from "@prisma/client";
import HistoryList from "./HistoryList";
import HistoryFilter from "./HistoryFilter";
import HistorySearch from "./HistorySearch";
import { SidebarTrigger } from "@/components/ui/sidebar";
import ThemeToggle from "@/components/ThemeToggle";
import Auth from "@/components/Auth";
import Header from "@/components/Header";

export default function HistoryContent({
  initialHistory,
}: {
  initialHistory: AIOutput[];
}) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);

  const filteredHistory = initialHistory.filter(
    (item) =>
      (!searchQuery ||
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description?.toLowerCase().includes(searchQuery.toLowerCase())) &&
      (!selectedTemplate || item.templateUsed === selectedTemplate)
  );

  return (
    <div className="min-h-screen bg-primary">
      <Header
        type="history"
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
      <div className="max-w-6xl mx-auto pb-8 p-6 md:p-8 lg:p-10">
        <div className="flex flex-col md:flex-row md:items-center mb-8">
          <h1 className="heading-primary">Output History</h1>
        </div>

        <HistoryFilter
          history={initialHistory}
          selectedTemplate={selectedTemplate}
          setSelectedTemplate={setSelectedTemplate}
        />

        <HistoryList filteredHistory={filteredHistory} />
      </div>
    </div>
  );
}
