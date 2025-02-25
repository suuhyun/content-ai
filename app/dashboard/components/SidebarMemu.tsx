"use client"

import { SidebarMenu } from "@/components/ui/sidebar";
import React from "react";
import { SidebarItem } from "./SidebarItem";
import { Home, Zap, Crown } from "lucide-react";

const SidebarMemu = () => {
  return (
    <SidebarMenu>
      <SidebarItem href="/dashboard?category=All" icon={Home} label="Home" />
      <SidebarItem
        href="/dashboard/history"
        icon={Zap}
        label="Output History"
      />
      <SidebarItem href="/dashboard/upgrade" icon={Crown} label="Upgrade" />
    </SidebarMenu>
  );
};

export default SidebarMemu;
