"use client";

import dynamic from "next/dynamic";
import { cn } from "@/lib/utils";
import type { Terrain } from "@/types/terrain";

const TerrainSatellitePreview = dynamic(
  () => import("@/components/map/TerrainSatellitePreview").then((mod) => mod.TerrainSatellitePreview),
  {
    loading: () => <div className="h-full min-h-[220px] w-full satellite-map" />,
    ssr: false,
  },
);

type TerrainHeroImageProps = {
  className?: string;
  showOutline?: boolean;
  terrain: Terrain;
};

export function TerrainHeroImage({ className, terrain }: TerrainHeroImageProps) {
  return <TerrainSatellitePreview className={cn("relative rounded-xl", className)} terrain={terrain} />;
}
