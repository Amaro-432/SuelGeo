"use client";

import dynamic from "next/dynamic";

const LeafletTerrainMap = dynamic(
  () => import("@/components/map/LeafletTerrainMap").then((mod) => mod.LeafletTerrainMap),
  {
    loading: () => (
      <section className="grid min-h-[580px] place-items-center rounded-xl border border-[#D7DED7] bg-[#DDE8D8] text-sm font-bold text-[#063D1E] shadow-sm">
        Cargando mapa satelital...
      </section>
    ),
    ssr: false,
  },
);

export function TerrainMap() {
  return <LeafletTerrainMap />;
}
