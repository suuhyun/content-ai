import MotionDiv from "@/components/MotionDiv";
import { LucideIcon } from "lucide-react";
import Link from "next/link";

interface ContentCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  slug: string;
  index: number;
  color?: string;
}

export function ContentCard({ title, description, icon: Icon, slug, color,
}: ContentCardProps) {
  return (
    <Link href={`/dashboard/${slug}`}>
      <MotionDiv
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="group card"
      >
        <div className="card-hover" />
        <div className="relative space-y-4">
          <div className="flex items-center gap-4">
            <div className={`rounded-xl p-2.5 ${color}`}>
              <Icon className="h-5 w-5 text-violet-500 dark:text-violet-400" />
            </div>
            <h3 className="card-title">{title}</h3>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
            {description}
          </p>
        </div>
      </MotionDiv>
    </Link>
  );
}
