import Link from "next/link";
import { Button } from "@/components/ui/button";

interface ErrorMessageProps {
  title: string;
  message?: string;
  link?: string;
  linkText?: string;
}

export function ErrorMessage({
  title,
  message,
  link = "/dashboard/history",
  linkText = "Return to History",
}: ErrorMessageProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-gray-500 bg-primary">
      <h2 className="text-xl font-semibold mb-4">{title}</h2>
      {message && <p className="text-sm">{message}</p>}
      <Button asChild className="mt-4">
        <Link href={link}>{linkText}</Link>
      </Button>
    </div>
  );
}