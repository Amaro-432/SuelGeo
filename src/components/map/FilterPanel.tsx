"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Select } from "@/components/ui/select";
import { areaRanges, communes, priceRanges, regions, type AreaRange, type PriceRange } from "@/data/terrains";
import { useTerrainStore } from "@/store/terrain-store";

export function FilterPanel() {
  const showNotice = useTerrainStore((state) => state.showNotice);
  const selectedRegion = useTerrainStore((state) => state.selectedRegion);
  const selectedCommune = useTerrainStore((state) => state.selectedCommune);
  const selectedPriceRange = useTerrainStore((state) => state.selectedPriceRange);
  const selectedAreaRange = useTerrainStore((state) => state.selectedAreaRange);
  const setRegion = useTerrainStore((state) => state.setRegion);
  const setCommune = useTerrainStore((state) => state.setCommune);
  const setPriceRange = useTerrainStore((state) => state.setPriceRange);
  const setAreaRange = useTerrainStore((state) => state.setAreaRange);
  const clearFilters = useTerrainStore((state) => state.clearFilters);
  const communeOptions = [
    "Todas",
    ...communes.filter((commune) => commune.region === selectedRegion).map((commune) => commune.name),
  ];

  return (
    <Card className="absolute left-3 right-3 top-3 z-[700] w-auto p-3 lg:left-4 lg:right-auto lg:top-4 lg:w-[230px] lg:p-4 xl:w-[250px]">
      <div className="mb-3 flex items-center justify-between gap-3 lg:mb-4">
        <h2 className="text-lg font-black text-[#111827]">Filtros</h2>
        <span className="hidden rounded-full bg-[#EEF6EA] px-3 py-1 text-xs font-bold text-[#0F5C2E] sm:inline-flex lg:hidden">
          Busqueda territorial
        </span>
      </div>
      <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-1">
        <Select
          label="Region"
          onChange={(event) => setRegion(event.target.value)}
          options={regions}
          value={selectedRegion}
        />
        <Select
          label="Comuna"
          onChange={(event) => setCommune(event.target.value)}
          options={communeOptions}
          value={selectedCommune}
        />
        <Select
          label="Rango de precio"
          onChange={(event) => setPriceRange(event.target.value as PriceRange)}
          options={[...priceRanges]}
          value={selectedPriceRange}
        />
        <Select
          label="Tamano (ha)"
          onChange={(event) => setAreaRange(event.target.value as AreaRange)}
          options={[...areaRanges]}
          value={selectedAreaRange}
        />
        <Button className="mt-1 w-full sm:mt-6 lg:mt-1" onClick={() => showNotice("Filtros aplicados al prototipo.")}>
          Aplicar filtros
        </Button>
        <button
          className="self-center text-sm font-semibold text-[#0F5C2E] underline underline-offset-4 sm:mt-6 lg:mt-0"
          onClick={() => {
            clearFilters();
            showNotice("Filtros limpiados.");
          }}
          type="button"
        >
          Limpiar filtros
        </button>
      </div>
    </Card>
  );
}
