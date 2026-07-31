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
import type { TerrainResult } from "@/types/terrain";

const menuItems = [
  { id: "resumen", label: "Resumen General", icon: Layers },
  { id: "accesibilidad", label: "Accesibilidad", icon: LineChart },
  { id: "topografia", label: "Topografia", icon: Mountain },
  { id: "pendientes", label: "Pendientes", icon: Route },
  { id: "solana", label: "Exposicion Solar (Solana y Umbria)", icon: Sun },
  { id: "ndvi", label: "Vegetacion (NDVI)", icon: Leaf },
  { id: "incendio", label: "Riesgo de Incendio", icon: Flame },
  { id: "inundacion", label: "Riesgo de Inundacion", icon: Droplets },
  { id: "uso-suelo", label: "Uso de Suelo", icon: Sprout },
  { id: "plano-topografico", label: "Plano Topografico", icon: MapPinned },
];

type TerrainSubmenuProps = {
  activeSectionId: string;
  availableResultIds: TerrainResult["id"][];
  onSelectSection: (sectionId: string) => void;
};

export function TerrainSubmenu({ activeSectionId, availableResultIds, onSelectSection }: TerrainSubmenuProps) {
  const showNotice = useTerrainStore((state) => state.showNotice);

  return (
    <aside className="flex min-h-full flex-col border-r border-[#E5E7EB] bg-white p-4 lg:w-[300px] lg:shrink-0">
      <nav className="grid gap-1">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isAvailable = item.id === "resumen" || availableResultIds.includes(item.id);
          const isActive = activeSectionId === item.id;

          return (
            <button
              className={cn(
                "flex min-h-10 items-center gap-3 rounded-lg px-3 py-2 text-left text-sm font-semibold text-[#111827] transition hover:bg-[#EEF6EA]",
                isActive && "bg-[#EAF5E4] text-[#063D1E]",
                !isAvailable && "cursor-not-allowed opacity-45 hover:bg-transparent",
              )}
              disabled={!isAvailable}
              key={item.label}
              onClick={() => onSelectSection(item.id)}
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
