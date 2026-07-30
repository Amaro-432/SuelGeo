"use client";

import L from "leaflet";
import { useEffect, useMemo } from "react";
import { MapContainer, Marker, Polygon, TileLayer, Tooltip, useMap, ZoomControl } from "react-leaflet";
import { FilterPanel } from "@/components/map/FilterPanel";
import { MapLegend } from "@/components/map/MapLegend";
import { communes, getFilteredTerrains, terrains } from "@/data/terrains";
import { useTerrainStore } from "@/store/terrain-store";
import type { LatLng, Terrain } from "@/types/terrain";

const satelliteTiles =
  "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}";

const satelliteAttribution =
  "Tiles &copy; Esri, Maxar, Earthstar Geographics, and the GIS User Community";

function createPriceIcon(terrain: Terrain, selected: boolean) {
  return L.divIcon({
    className: "suelgeo-marker-shell",
    html: `<span class="suelgeo-price-marker ${selected ? "is-selected" : ""}">${terrain.price}</span>`,
    iconAnchor: [52, 18],
  });
}

function getMapTarget(selectedTerrain: Terrain, selectedRegion: string, selectedCommune: string) {
  const commune = communes.find((item) => item.region === selectedRegion && item.name === selectedCommune);
  const regionCommune = communes.find((item) => item.region === selectedRegion);

  return {
    center: commune?.center ?? regionCommune?.center ?? selectedTerrain.coordinates,
    zoom: commune?.zoom ?? 12,
  };
}

function MapCamera({
  center,
  zoom,
}: {
  center: LatLng;
  zoom: number;
}) {
  const map = useMap();

  useEffect(() => {
    map.flyTo(center, zoom, {
      animate: true,
      duration: 0.8,
    });
  }, [center, map, zoom]);

  return null;
}

export function LeafletTerrainMap() {
  const selectedTerrainId = useTerrainStore((state) => state.selectedTerrainId);
  const selectedRegion = useTerrainStore((state) => state.selectedRegion);
  const selectedCommune = useTerrainStore((state) => state.selectedCommune);
  const selectedPriceRange = useTerrainStore((state) => state.selectedPriceRange);
  const selectedAreaRange = useTerrainStore((state) => state.selectedAreaRange);
  const selectTerrain = useTerrainStore((state) => state.selectTerrain);
  const selectedTerrain = terrains.find((terrain) => terrain.id === selectedTerrainId) ?? terrains[0];

  const visibleTerrains = useMemo(
    () =>
      getFilteredTerrains({
        region: selectedRegion,
        commune: selectedCommune,
        priceRange: selectedPriceRange,
        areaRange: selectedAreaRange,
      }),
    [selectedAreaRange, selectedCommune, selectedPriceRange, selectedRegion],
  );

  const target = getMapTarget(selectedTerrain, selectedRegion, selectedCommune);

  return (
    <section className="relative min-h-[620px] overflow-hidden rounded-xl border border-[#D7DED7] bg-[#DDE8D8] shadow-sm md:min-h-[580px]">
      <MapContainer
        center={target.center}
        className="h-[620px] min-h-[620px] w-full md:h-[580px] md:min-h-[580px]"
        scrollWheelZoom
        zoom={target.zoom}
        zoomControl={false}
      >
        <TileLayer attribution={satelliteAttribution} url={satelliteTiles} />
        <ZoomControl position="topright" />
        <MapCamera center={target.center} zoom={target.zoom} />

        {visibleTerrains.map((terrain) => {
          const selected = terrain.id === selectedTerrainId;
          return (
            <Marker
              eventHandlers={{
                click: () => selectTerrain(terrain.id),
              }}
              icon={createPriceIcon(terrain, selected)}
              key={terrain.id}
              position={terrain.coordinates}
            >
              <Tooltip direction="top" offset={[0, -18]} opacity={1}>
                {terrain.name}
              </Tooltip>
            </Marker>
          );
        })}

        {visibleTerrains.some((terrain) => terrain.id === selectedTerrain.id) ? (
          <Polygon
            pathOptions={{
              color: "#A3D977",
              fillColor: "#0F5C2E",
              fillOpacity: 0.38,
              opacity: 1,
              weight: 4,
            }}
            positions={selectedTerrain.polygon}
          />
        ) : null}
      </MapContainer>

      <FilterPanel />

      <div className="absolute left-1/2 top-5 z-[700] hidden -translate-x-1/2 items-center gap-2 rounded-full bg-white/95 px-4 py-2 text-xs font-bold text-[#063D1E] shadow-sm xl:flex">
        {selectedCommune === "Todas" ? selectedRegion : `${selectedCommune}, ${selectedRegion}`}
      </div>

      <MapLegend />

      {visibleTerrains.length === 0 ? (
        <div className="absolute left-1/2 top-1/2 z-[710] w-[min(360px,calc(100%-2rem))] -translate-x-1/2 -translate-y-1/2 rounded-xl border border-[#E5E7EB] bg-white p-4 text-center text-sm font-semibold text-[#111827] shadow-lg">
          No hay terrenos para los filtros seleccionados.
        </div>
      ) : null}
    </section>
  );
}
