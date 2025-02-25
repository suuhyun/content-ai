import { ArrowLeft, Clock, Film } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { AIOutput } from "@prisma/client";
import { templateColors, templateIcons } from "@/lib/constants";
import OutputActions from "./components/OutputActions";
import OutputContent from "./components/OutputContent";
import OutputMetadata from "./components/OutputMetadata";
import { db, fetchOutputById } from "@/lib/db";
import { ErrorMessage } from "@/components/ErrorMessage";
import Auth from "@/components/Auth";
import ThemeToggle from "@/components/ThemeToggle";
import { SidebarTrigger } from "@/components/ui/sidebar";
import Header from "@/components/Header";

export default async function HistoryDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  try {
    const { id } = await params;
    if (!id) {
      return <ErrorMessage title="Invalid request" />;
    }

    const output: AIOutput | null = await fetchOutputById(id);

    if (!output) {
      return <ErrorMessage title="Output not found" />;
    }

    const Icon = templateIcons[output.templateUsed] || Film;
    const colors = templateColors[output.templateUsed];

    return (
      <div className="min-h-screen overflow-auto bg-primary">
        <Header type="default" />
        <div className="max-w-4xl mx-auto px-6 py-8">
          <div className="flex items-center gap-4 mb-8">
            <Link
              href="/dashboard/history"
              className="p-2 rounded-xl bg-white/10 hover:bg-white/20 transition-all duration-300"
            >
              <ArrowLeft className="w-5 h-5 text-violet-500" />
            </Link>
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <div
                  className={`p-2 rounded-xl bg-gradient-to-br ${
                    colors.gradient || "gradient-default"
                  }`}
                >
                  <Icon className="w-4 h-4 text-gray-800 dark:text-white" />
                </div>
                <span
                  className={`text-sm font-medium ${
                    colors.text || "text-default"
                  }`}
                >
                  {output.templateUsed}
                </span>
                <div className="flex items-center gap-1 text-sm text-gray-500">
                  <Clock className="w-4 h-4" />
                  <span>{new Date(output.createdAt).toLocaleString()}</span>
                </div>
              </div>
              <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-200">
                {output.title}
              </h1>
            </div>
          </div>

          <OutputActions output={output} />
          <OutputContent description={output.description} />
          <OutputMetadata
            templateUsed={output.templateUsed}
            createdAt={output.createdAt}
          />
        </div>
      </div>
    );
  } catch (error) {
    console.error("Error fetching output:", error);

    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-gray-500">
        <h2 className="text-xl font-semibold mb-4">
          An error occurred while loading the output
        </h2>
        <p className="text-sm">Please try again later.</p>
        <Button asChild className="mt-4">
          <Link href="/dashboard/history">Return to History</Link>
        </Button>
      </div>
    );
  }
}
