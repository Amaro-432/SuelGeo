import { create } from "zustand";
import { getFilteredTerrains, terrains, type AreaRange, type PriceRange } from "@/data/terrains";
import type { AppView } from "@/types/terrain";

type TerrainState = {
  view: AppView;
  selectedTerrainId: number;
  selectedRegion: string;
  selectedCommune: string;
  selectedPriceRange: PriceRange;
  selectedAreaRange: AreaRange;
  favoriteIds: number[];
  notice: string | null;
  setView: (view: AppView) => void;
  selectTerrain: (terrainId: number) => void;
  setRegion: (region: string) => void;
  setCommune: (commune: string) => void;
  setPriceRange: (priceRange: PriceRange) => void;
  setAreaRange: (areaRange: AreaRange) => void;
  clearFilters: () => void;
  toggleFavorite: (terrainId: number) => void;
  showNotice: (message: string) => void;
  clearNotice: () => void;
};

function firstTerrainFor(filters: {
  region: string;
  commune: string;
  priceRange: PriceRange;
  areaRange: AreaRange;
}) {
  return getFilteredTerrains(filters)[0];
}

export const useTerrainStore = create<TerrainState>((set) => ({
  view: "map",
  selectedTerrainId: 1,
  selectedRegion: "Region de O'Higgins",
  selectedCommune: "Pichidegua",
  selectedPriceRange: "Todas",
  selectedAreaRange: "Todas",
  favoriteIds: [],
  notice: null,
  setView: (view) => set({ view }),
  selectTerrain: (terrainId) => {
    const terrain = terrains.find((item) => item.id === terrainId);
    set({
      selectedTerrainId: terrainId,
      selectedRegion: terrain?.region ?? "Region de O'Higgins",
      selectedCommune: terrain?.commune ?? "Todas",
    });
  },
  setRegion: (region) => {
    const nextFilters = {
      region,
      commune: "Todas",
      priceRange: "Todas" as PriceRange,
      areaRange: "Todas" as AreaRange,
    };
    const terrain = firstTerrainFor(nextFilters);
    set({
      selectedRegion: region,
      selectedCommune: "Todas",
      selectedPriceRange: "Todas",
      selectedAreaRange: "Todas",
      selectedTerrainId: terrain?.id ?? 1,
    });
  },
  setCommune: (commune) => {
    set((state) => ({
      selectedCommune: commune,
      selectedTerrainId:
        firstTerrainFor({
          region: state.selectedRegion,
          commune,
          priceRange: state.selectedPriceRange,
          areaRange: state.selectedAreaRange,
        })?.id ?? state.selectedTerrainId,
    }));
  },
  setPriceRange: (priceRange) => {
    set((state) => ({
      selectedPriceRange: priceRange,
      selectedTerrainId:
        firstTerrainFor({
          region: state.selectedRegion,
          commune: state.selectedCommune,
          priceRange,
          areaRange: state.selectedAreaRange,
        })?.id ?? state.selectedTerrainId,
    }));
  },
  setAreaRange: (areaRange) => {
    set((state) => ({
      selectedAreaRange: areaRange,
      selectedTerrainId:
        firstTerrainFor({
          region: state.selectedRegion,
          commune: state.selectedCommune,
          priceRange: state.selectedPriceRange,
          areaRange,
        })?.id ?? state.selectedTerrainId,
    }));
  },
  clearFilters: () => {
    const terrain = terrains.find((item) => item.region === "Region de O'Higgins" && item.commune === "Pichidegua");
    set({
      selectedRegion: "Region de O'Higgins",
      selectedCommune: "Pichidegua",
      selectedPriceRange: "Todas",
      selectedAreaRange: "Todas",
      selectedTerrainId: terrain?.id ?? 1,
    });
  },
  toggleFavorite: (terrainId) =>
    set((state) => ({
      favoriteIds: state.favoriteIds.includes(terrainId)
        ? state.favoriteIds.filter((id) => id !== terrainId)
        : [...state.favoriteIds, terrainId],
    })),
  showNotice: (message) => set({ notice: message }),
  clearNotice: () => set({ notice: null }),
}));
