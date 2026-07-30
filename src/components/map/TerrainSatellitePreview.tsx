"use client";

import L from "leaflet";
import { MapContainer, Marker, Polygon, TileLayer } from "react-leaflet";
import { cn } from "@/lib/utils";
import type { Terrain } from "@/types/terrain";

const satelliteTiles =
  "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}";

const satelliteAttribution =
  "Tiles &copy; Esri, Maxar, Earthstar Geographics, and the GIS User Community";

function createPinIcon() {
  return L.divIcon({
    className: "suelgeo-marker-shell",
    html: '<span class="suelgeo-pin-marker"></span>',
    iconAnchor: [8, 8],
  });
}

export function TerrainSatellitePreview({
  className,
  terrain,
}: {
  className?: string;
  terrain: Terrain;
}) {
  return (
    <div className={cn("overflow-hidden rounded-xl", className)}>
      <MapContainer
        attributionControl={false}
        center={terrain.coordinates}
        className="h-full min-h-[220px] w-full"
        dragging={false}
        doubleClickZoom={false}
        scrollWheelZoom={false}
        touchZoom={false}
        zoom={15}
        zoomControl={false}
      >
        <TileLayer attribution={satelliteAttribution} url={satelliteTiles} />
        <Polygon
          pathOptions={{
            color: "#A3D977",
            fillColor: "#0F5C2E",
            fillOpacity: 0.28,
            opacity: 1,
            weight: 4,
          }}
          positions={terrain.polygon}
        />
        <Marker icon={createPinIcon()} position={terrain.coordinates} />
      </MapContainer>
    </div>
  );
}
