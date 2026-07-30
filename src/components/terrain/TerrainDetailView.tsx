"use client";

import { ArrowLeft, Heart, LandPlot, Leaf, Ruler } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TerrainImagePanel } from "@/components/terrain/TerrainImagePanel";
import { TerrainResultCard } from "@/components/terrain/TerrainResultCard";
import { TerrainSubmenu } from "@/components/terrain/TerrainSubmenu";
import { terrains } from "@/data/terrains";
import { cn } from "@/lib/utils";
import { useTerrainStore } from "@/store/terrain-store";

export function TerrainDetailView() {
  const selectedTerrainId = useTerrainStore((state) => state.selectedTerrainId);
  const favoriteIds = useTerrainStore((state) => state.favoriteIds);
  const setView = useTerrainStore((state) => state.setView);
  const toggleFavorite = useTerrainStore((state) => state.toggleFavorite);
  const terrain = terrains.find((item) => item.id === selectedTerrainId) ?? terrains[0];
  const isFavorite = favoriteIds.includes(terrain.id);

  return (
    <div className="p-4 xl:p-6">
      <section className="overflow-hidden rounded-xl border border-[#E5E7EB] bg-white shadow-sm">
        <div className="grid border-b border-[#E5E7EB] bg-white px-5 py-4 xl:grid-cols-[minmax(260px,1fr)_auto] xl:items-center">
          <div>
            <h1 className="text-2xl font-black text-[#111827]">{terrain.name}</h1>
            <p className="mt-1 text-sm font-semibold text-[#374151]">{terrain.location}</p>
            <button
              className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-[#0F5C2E]"
              onClick={() => setView("map")}
              type="button"
            >
              <ArrowLeft className="h-4 w-4" />
              Volver al mapa
            </button>
          </div>

          <div className="mt-4 flex flex-wrap gap-3 xl:mt-0 xl:justify-end">
            <Badge>
              <Ruler className="h-4 w-4" />
              <span>{terrain.area}</span>
              <span className="text-xs font-medium text-[#6B7280]">Superficie</span>
            </Badge>
            <Badge>
              <Leaf className="h-4 w-4" />
              <span>{terrain.potentialUse}</span>
              <span className="text-xs font-medium text-[#6B7280]">Uso potencial</span>
            </Badge>
            <Badge>
              <LandPlot className="h-4 w-4" />
              <span>{terrain.price}</span>
              <span className="text-xs font-medium text-[#6B7280]">Precio</span>
            </Badge>
            <Button onClick={() => toggleFavorite(terrain.id)} variant="outline">
              <Heart className={cn("h-4 w-4", isFavorite && "fill-[#0F5C2E] text-[#0F5C2E]")} />
              Guardar
            </Button>
          </div>
        </div>

        <div className="grid lg:grid-cols-[300px_minmax(0,1fr)]">
          <TerrainSubmenu />
          <div className="grid gap-5 bg-[#F8FAF8] p-5 2xl:grid-cols-[minmax(0,1fr)_440px]">
            <section>
              <h2 className="mb-5 text-2xl font-black text-[#111827]">Resumen General del Terreno</h2>
              <div className="grid gap-5 md:grid-cols-2">
                {terrain.results.map((result) => (
                  <TerrainResultCard key={result.id} result={result} />
                ))}
              </div>
            </section>
            <TerrainImagePanel />
          </div>
        </div>
      </section>
    </div>
  );
}
