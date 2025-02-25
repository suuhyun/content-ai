import MotionDiv from "@/components/MotionDiv";
import { templateColors, templateIcons } from "@/lib/constants";
import { Film } from "lucide-react";
import ReactMarkdown from "react-markdown";
import Link from "next/link";


export default function HistoryCard({ item, index }: { item: any; index: number }) {
    const Icon = templateIcons[item.templateUsed] || Film;
    const gradientColor =
      templateColors[item.templateUsed].gradient ||
      "from-gray-500/20 to-gray-600/20";
    return (
      <Link href={`/dashboard/history/${item.id}`}>
        <MotionDiv
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="group card"
        >
          <div
            className="card-hover"
          />
  
          <div className="relative space-y-4">
            <div className="flex items-center gap-4">
              <div className={`p-2 rounded-xl ${gradientColor}`}>
                <Icon className="w-4 h-4 text-gray-800 dark:text-white" />
              </div>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {item.templateUsed}
              </span>
            </div>
            <h2 className="card-title text-lg">
              {item.title}
            </h2>
            <div className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
              <ReactMarkdown>
                {item.description || "No description available"}
              </ReactMarkdown>
            </div>
            <div className="mt-4 text-violet-500 dark:text-violet-400 text-sm font-medium">
              View Details →
            </div>
          </div>
        </MotionDiv>
      </Link>
    );
  }