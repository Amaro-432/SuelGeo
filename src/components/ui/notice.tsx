"use client";

import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTerrainStore } from "@/store/terrain-store";

export function Notice() {
  const notice = useTerrainStore((state) => state.notice);
  const clearNotice = useTerrainStore((state) => state.clearNotice);

  if (!notice) {
    return null;
  }

  return (
    <div className="fixed bottom-5 right-5 z-50 flex max-w-sm items-center gap-3 rounded-xl border border-[#DCEFD5] bg-white px-4 py-3 text-sm font-semibold text-[#111827] shadow-lg">
      <span className="h-2.5 w-2.5 rounded-full bg-[#0F5C2E]" />
      <span className="flex-1">{notice}</span>
      <Button aria-label="Cerrar aviso" onClick={clearNotice} size="icon" variant="ghost">
        <X className="h-4 w-4" />
      </Button>
    </div>
  );
}
