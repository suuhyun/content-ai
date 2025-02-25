"use client"

import Link from "next/link";
import { SidebarMenuItem, SidebarMenuButton } from "@/components/ui/sidebar";
import { usePathname } from "next/navigation";

interface SidebarItemProps {
  href: string;
  icon: React.ElementType;
  label: string;
}

export function SidebarItem({ href, icon: Icon, label }: SidebarItemProps) {
  const pathname = usePathname();
  const isActive = pathname.startsWith(href);

  return (
    <SidebarMenuItem>
      <Link href={href} passHref>
        <SidebarMenuButton
          className={`py-5 w-full justify-start gap-3 text-base font-medium transition-all duration-200 
            ${isActive ? "sidebar-active" : "sidebar-inactive"}
          `}
        >
          <Icon className="h-5 w-5" />
          <span>{label}</span>
        </SidebarMenuButton>
      </Link>
    </SidebarMenuItem>
  );
}
