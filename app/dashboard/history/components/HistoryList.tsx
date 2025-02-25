import MotionDiv from "@/components/MotionDiv";
import { AIOutput } from "@prisma/client";
import HistoryCard from "./HistoryCard";

export default function HistoryList({
  filteredHistory,
}: {
  filteredHistory: AIOutput[];
}) {
  return (
    <div className="">
      {filteredHistory.length === 0 ? (
        <MotionDiv
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="flex flex-col items-center justify-center h-60 text-gray-500"
        >
          <div className="text-lg font-medium mb-2">No results found</div>
          <p className="text-sm text-gray-400">
            Try adjusting your search or filters
          </p>
        </MotionDiv>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredHistory.map((item, index) => (
            <MotionDiv
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <HistoryCard item={item} index={index} />
            </MotionDiv>
          ))}
        </div>
      )}
    </div>
  );
}


