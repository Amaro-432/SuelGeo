"use client";

import { Sidebar } from "@/components/layout/Sidebar";
import { Topbar } from "@/components/layout/Topbar";
import { Notice } from "@/components/ui/notice";

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#F8FAF8] lg:flex">
      <Sidebar />
      <main className="min-w-0 flex-1">
        <Topbar />
        {children}
      </main>
      <Notice />
    </div>
  );
}
