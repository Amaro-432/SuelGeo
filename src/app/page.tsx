"use client";

import { AppShell } from "@/components/layout/AppShell";
import { TerrainDetailView } from "@/components/terrain/TerrainDetailView";
import { MapView } from "@/components/map/MapView";
import { useTerrainStore } from "@/store/terrain-store";

export default function Home() {
  const view = useTerrainStore((state) => state.view);

  return <AppShell>{view === "map" ? <MapView /> : <TerrainDetailView />}</AppShell>;
}
