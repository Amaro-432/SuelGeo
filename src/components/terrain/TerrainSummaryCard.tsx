"use client";

import { ArrowRight, Heart, LandPlot, Leaf, Ruler } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { TerrainHeroImage } from "@/components/terrain/TerrainHeroImage";
import type { Terrain } from "@/types/terrain";
import { cn } from "@/lib/utils";
import { useTerrainStore } from "@/store/terrain-store";

type TerrainSummaryCardProps = {
  terrain: Terrain;
};

export function TerrainSummaryCard({ terrain }: TerrainSummaryCardProps) {
  const favoriteIds = useTerrainStore((state) => state.favoriteIds);
  const toggleFavorite = useTerrainStore((state) => state.toggleFavorite);
  const setView = useTerrainStore((state) => state.setView);
  const isFavorite = favoriteIds.includes(terrain.id);

  return (
    <Card className="overflow-hidden">
      <div className="flex items-start justify-between gap-3 p-5 pb-3">
        <div>
          <h1 className="text-2xl font-black text-[#111827]">{terrain.name}</h1>
          <p className="mt-1 text-sm font-semibold text-[#374151]">{terrain.location}</p>
        </div>
        <Button
          aria-label="Guardar terreno"
          onClick={() => toggleFavorite(terrain.id)}
          size="icon"
          variant="ghost"
        >
          <Heart className={cn("h-6 w-6", isFavorite && "fill-[#0F5C2E] text-[#0F5C2E]")} />
        </Button>
      </div>

      <TerrainHeroImage className="mx-0 h-[230px] rounded-none" terrain={terrain} />

      <div className="grid grid-cols-1 gap-2 p-4 sm:grid-cols-3 md:p-5 2xl:grid-cols-3">
        <Metric icon={Ruler} label="Superficie" value={terrain.area} />
        <Metric icon={LandPlot} label="Precio" value={terrain.price} />
        <Metric icon={Leaf} label="Uso potencial" value={terrain.potentialUse} />
      </div>

      <div className="px-5 pb-5">
        <Button className="w-full justify-between" onClick={() => setView("detail")}>
          Ver Resultados
          <ArrowRight className="h-5 w-5" />
        </Button>

        <div className="mt-5">
          <h2 className="text-base font-black text-[#111827]">Descripcion</h2>
          <p className="mt-2 text-sm leading-6 text-[#374151]">{terrain.description}</p>
        </div>
      </div>
    </Card>
  );
}

function Metric({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
}) {
  return (
    <div className="grid min-w-0 gap-1 rounded-xl bg-[#F8FAF8] p-3">
      <Icon className="h-5 w-5 text-[#111827]" />
      <strong className="min-w-0 break-words text-sm font-black leading-tight text-[#111827]">{value}</strong>
      <span className="min-w-0 break-words text-xs font-medium leading-tight text-[#6B7280]">{label}</span>
    </div>
  );
}
