import {
  SidebarFooter,
  Sidebar,
  SidebarContent,
  SidebarHeader,
} from "@/components/ui/sidebar";
import { Logo } from "@/components/Logo";
import PointsProgress from "./PointsProgress";
import SidebarMemu from "./SidebarMemu";

export function DashboardSidebar() {
  return (
    <Sidebar className="border-r dark:!bg-gray-800/40  border-violet-100/10 dark:!border-gray-800">
      <SidebarHeader className="p-4">
        <Logo />
      </SidebarHeader>
      <SidebarContent className="p-4">
        <SidebarMemu />
      </SidebarContent>
      <SidebarFooter className="p-4">
        <PointsProgress />
      </SidebarFooter>
    </Sidebar> 
  );
}
