"use client"

import { Copy, Download, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { externalLinks } from "@/lib/constants";

interface OutputActionsProps {
  output: {
    title: string;
    description: string | null;
    templateUsed: string;
  };
}

export default function OutputActions({ output }: OutputActionsProps) {
  const [copySuccess, setCopySuccess] = useState(false);
  const externalResource = externalLinks[output.templateUsed];

  const handleCopy = async () => {
    if (output.description) {
      await navigator.clipboard.writeText(output.description);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    }
  };

  const handleDownload = () => {
    const textContent = output.description || "";
    const blob = new Blob([textContent], { type: "text/plain" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${output.title || "content"}.txt`;
    a.click();
  };

  return (
    <div className="flex items-center gap-3 my-6 px-6">
      <Button
        variant="outline"
        className="bg-white/10 border-0 backdrop-blur-xl hover:bg-white/20"
        onClick={handleCopy}
      >
        <Copy className="w-4 h-4 mr-2" />
        {copySuccess ? "Copied!" : "Copy"}
      </Button>
      <Button
        variant="outline"
        className="bg-white/10 border-0 backdrop-blur-xl hover:bg-white/20"
        onClick={handleDownload}
      >
        <Download className="w-4 h-4 mr-2" />
        Download
      </Button>
      {externalResource && (
        <Button
          variant="outline"
          className="bg-white/10 border-0 backdrop-blur-xl hover:bg-white/20"
          onClick={() => window.open(externalResource.url, "_blank")}
        >
          <ExternalLink className="w-4 h-4 mr-2" />
          {externalResource.label}
        </Button>
      )}
    </div>
  );
}
