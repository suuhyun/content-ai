"use client";

import { Sparkles } from "lucide-react";
import { useUserCredit } from "@/app/context/UserCreditProvider";

export default function PointsProgress() {
  const { totalCredit } = useUserCredit();
  const maxPoints = 5000;
  const percentage = totalCredit ? (totalCredit / maxPoints) * 100 : 0;

  return (
    <div className="px-4 py-3">
      <div className="flex items-center gap-2 mb-3">
        <Sparkles className="w-5 h-5 text-violet-500 dark:text-violet-400" />
        <span className="text-sm font-medium text-gray-800 dark:text-gray-200">
          Points Balance
        </span>
      </div>

      <div className="relative w-full h-3 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden">
        <div
          className="absolute h-full bg-gradient-to-r from-violet-500 to-pink-500 transition-all duration-300"
          style={{ width: `${percentage}%` }}
        />
      </div>

      <div className="flex justify-between text-xs text-gray-600 dark:text-gray-400 mt-2">
        <span>
          {totalCredit !== null ? totalCredit.toLocaleString() : "Loading..."}
        </span>
        <span>{maxPoints.toLocaleString()}</span>
      </div>
    </div>
  );
}
