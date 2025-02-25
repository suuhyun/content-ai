"use client"

import { Badge } from "@/components/ui/badge";
import { categories } from "@/lib/constants";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

interface CategoryProps {
  onSearchInput: (value: string) => void;
}

export function Categories({ onSearchInput }: CategoryProps) {
  const searchParams = useSearchParams();
  const currentCategory = searchParams.get("category") || "all";

  return (
    <div className="flex gap-2 pb-2 md:pb-0">
      {categories.map((category) => (
        <Link
          key={category.value}
          href={`/dashboard?category=${category.value}`}
        >
          <Badge
            variant="outline"
            onClick={() => onSearchInput(category.value)}
            className={`rounded-xl px-3 py-1.5 text-sm font-medium whitespace-nowrap transition-all
              ${
                currentCategory === category.value
                  ? "category-active"
                  : "category-inactive"
              }
            `}
          >
            {category.name}
          </Badge>
        </Link>
      ))}
    </div>
  );
}
