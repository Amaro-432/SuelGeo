"use client";

import { Bell, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useTerrainStore } from "@/store/terrain-store";

export function Topbar() {
  const showNotice = useTerrainStore((state) => state.showNotice);

  return (
    <header className="flex flex-col gap-3 border-b border-[#E5E7EB] bg-[#F8FAF8]/95 px-4 py-4 lg:flex-row lg:items-center lg:justify-between lg:px-6">
      <div className="relative w-full max-w-2xl">
        <Input className="pl-5 pr-12" placeholder="Buscar ubicacion, comuna o region" />
        <Search className="absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#111827]" />
      </div>
      <div className="flex items-center gap-3">
        <Button aria-label="Notificaciones" size="icon" variant="outline">
          <Bell className="h-5 w-5" />
        </Button>
        <Button onClick={() => showNotice("Formulario de publicacion preparado para la siguiente etapa.")}>
          Publicar Terreno
        </Button>
      </div>
    </header>
  );
}
