"use client";

import {
  Download,
  Droplets,
  Flame,
  Layers,
  Leaf,
  LineChart,
  MapPinned,
  Mountain,
  Route,
  Sprout,
  Sun,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useTerrainStore } from "@/store/terrain-store";

const menuItems = [
  { label: "Resumen General", icon: Layers, active: true },
  { label: "Analisis del Terreno", icon: LineChart },
  { label: "Topografia", icon: Mountain },
  { label: "Pendientes", icon: Route },
  { label: "Exposicion Solar (Solana y Umbria)", icon: Sun },
  { label: "Vegetacion (NDVI)", icon: Leaf },
  { label: "Riesgo de Incendio", icon: Flame },
  { label: "Riesgo de Inundacion", icon: Droplets },
  { label: "Uso de Suelo", icon: Sprout },
  { label: "Plano Topografico", icon: MapPinned },
];

export function TerrainSubmenu() {
  const showNotice = useTerrainStore((state) => state.showNotice);

  return (
    <aside className="flex min-h-full flex-col border-r border-[#E5E7EB] bg-white p-4 lg:w-[300px] lg:shrink-0">
      <nav className="grid gap-1">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              className={cn(
                "flex min-h-10 items-center gap-3 rounded-lg px-3 py-2 text-left text-sm font-semibold text-[#111827] transition hover:bg-[#EEF6EA]",
                item.active && "bg-[#EAF5E4] text-[#063D1E]",
              )}
              key={item.label}
              type="button"
            >
              <Icon className="h-4 w-4 shrink-0" />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>
      <Button
        className="mt-6 w-full"
        onClick={() => showNotice("Informe completo listo para generarse en la siguiente etapa.")}
        variant="outline"
      >
        <Download className="h-4 w-4" />
        Descargar Informe Completo
      </Button>
    </aside>
  );
}
