import { SidebarProvider } from "@/components/ui/sidebar";
import React from "react";
import { DashboardSidebar } from "./components/DashboardSidebar";
import { Toaster } from "@/components/ui/sonner"

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen overflow-auto w-screen">
        <DashboardSidebar />
        <main className="flex-1 overflow-hidden">{children}</main>
        <Toaster />
      </div>
    </SidebarProvider>
  );
};

export default DashboardLayout;
