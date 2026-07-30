"use client";

import { TerrainMap } from "@/components/map/TerrainMap";
import { TerrainSummaryCard } from "@/components/terrain/TerrainSummaryCard";
import { terrains } from "@/data/terrains";
import { useTerrainStore } from "@/store/terrain-store";

export function MapView() {
  const selectedTerrainId = useTerrainStore((state) => state.selectedTerrainId);
  const selectedTerrain = terrains.find((terrain) => terrain.id === selectedTerrainId) ?? terrains[0];

  return (
    <div className="grid gap-5 p-3 md:p-4 2xl:grid-cols-[minmax(720px,1fr)_420px] 2xl:p-6">
      <TerrainMap />
      <TerrainSummaryCard terrain={selectedTerrain} />
    </div>
  );
}
