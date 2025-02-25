import Link from "next/link";

export function Logo() {
  return (
    <Link href="/dashboard?category=All">
    <div className="flex items-center gap-2 px-2">
      <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-violet-500 to-pink-500 flex items-center justify-center">
        <span className="text-white font-semibold">C</span>
      </div>
      <span className="font-semibold text-gray-800 dark:text-white">ContentAI</span>
    </div>
    </Link>
  )
}