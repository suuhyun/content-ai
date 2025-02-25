"use client"

import { Button } from "@/components/ui/button";
import { templateIcons } from "@/lib/constants";
import { Film } from "lucide-react";
import React from "react";

interface HistoryFilterProps {
  history: { templateUsed: string }[];
  selectedTemplate: string | null;
  setSelectedTemplate: (template: string | null) => void;
}

const HistoryFilter = ({
  history,
  selectedTemplate,
  setSelectedTemplate,
}: HistoryFilterProps) => {
  const uniqueTemplates = Array.from(
    new Set(history.map((item) => item.templateUsed))
  );

  return (
    <div className="flex gap-2 overflow-x-auto pb-4 mb-6 scrollbar-hide">
      {uniqueTemplates.map((template) => {
        const Icon = templateIcons[template] || Film;
        return (
          <Button
            key={template}
            variant="outline"
            className={`flex items-center gap-2 px-4 py-2 bg-white/10 border-0 backdrop-blur-xl hover:bg-white/20 whitespace-nowrap
            ${
              selectedTemplate === template ? "bg-white/20 text-violet-500" : ""
            }`}
            onClick={() =>
              setSelectedTemplate(
                selectedTemplate === template ? null : template
              )
            }
          >
            <Icon className="w-4 h-4" />
            {template}
          </Button>
        );
      })}
    </div>
  );
};

export default HistoryFilter;
