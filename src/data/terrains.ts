import type { CommuneOption, LatLng, Terrain, TerrainResult } from "@/types/terrain";

export const regions = ["Region de O'Higgins", "Region del Maule", "Region del Biobio"];

export const communes: CommuneOption[] = [
  {
    name: "Pichidegua",
    region: "Region de O'Higgins",
    center: [-34.337, -71.326],
    zoom: 13,
  },
  {
    name: "Santa Cruz",
    region: "Region de O'Higgins",
    center: [-34.585, -71.43],
    zoom: 13,
  },
  {
    name: "San Vicente",
    region: "Region de O'Higgins",
    center: [-34.49, -71.13],
    zoom: 13,
  },
  {
    name: "Marchigue",
    region: "Region de O'Higgins",
    center: [-34.435, -71.665],
    zoom: 13,
  },
  {
    name: "Litueche",
    region: "Region de O'Higgins",
    center: [-34.085, -71.765],
    zoom: 13,
  },
  {
    name: "Curico",
    region: "Region del Maule",
    center: [-35.03, -71.33],
    zoom: 12,
  },
  {
    name: "Los Angeles",
    region: "Region del Biobio",
    center: [-37.385, -72.17],
    zoom: 12,
  },
];

export const priceRanges = ["Todas", "$0 - $40M", "$40M - $70M", "$70M+"] as const;
export const areaRanges = ["Todas", "0 - 5 ha", "5 - 10 ha", "10+ ha"] as const;

export type PriceRange = (typeof priceRanges)[number];
export type AreaRange = (typeof areaRanges)[number];

type TerrainDraft = Omit<Terrain, "polygon" | "results"> & {
  polygon?: LatLng[];
  resultImages?: Partial<Record<TerrainResult["id"], string>>;
  slope: string;
  elevation: string;
  sun: string;
  ndvi: string;
  fire: string;
  flood: string;
  landUse: string;
  soil: string;
  contour: string;
};

function makePolygon(center: LatLng, latSize = 0.0048, lngSize = 0.0072): LatLng[] {
  const [lat, lng] = center;

  return [
    [lat + latSize * 0.85, lng - lngSize * 0.8],
    [lat + latSize, lng + lngSize * 0.25],
    [lat + latSize * 0.15, lng + lngSize],
    [lat - latSize * 0.95, lng + lngSize * 0.62],
    [lat - latSize * 0.78, lng - lngSize * 0.68],
  ];
}

function makeResults(draft: TerrainDraft): TerrainResult[] {
  return [
    {
      id: "accesibilidad",
      title: "Accesibilidad",
      description: draft.elevation,
      visualClassName: "map-contours",
      imageUrl: draft.resultImages?.accesibilidad,
    },
    {
      id: "topografia",
      title: "Topografia",
      description: draft.elevation,
      visualClassName: "map-contours",
      imageUrl: draft.resultImages?.topografia,
    },
    {
      id: "pendientes",
      title: "Pendientes",
      description: draft.slope,
      visualClassName: "map-slope",
      imageUrl: draft.resultImages?.pendientes,
    },
    {
      id: "solana",
      title: "Solana y Umbria",
      description: draft.sun,
      visualClassName: "map-sun",
      imageUrl: draft.resultImages?.solana,
    },
    {
      id: "ndvi",
      title: "Vegetacion (NDVI)",
      description: draft.ndvi,
      visualClassName: "map-ndvi",
      imageUrl: draft.resultImages?.ndvi,
    },
    {
      id: "incendio",
      title: "Riesgo de Incendio",
      description: draft.fire,
      visualClassName: "map-fire",
      imageUrl: draft.resultImages?.incendio,
    },
    {
      id: "inundacion",
      title: "Riesgo de Inundacion",
      description: draft.flood,
      visualClassName: "map-flood",
      imageUrl: draft.resultImages?.inundacion,
    },
    {
      id: "uso-suelo",
      title: "Uso de Suelo",
      description: draft.landUse,
      visualClassName: "map-landuse",
      imageUrl: draft.resultImages?.["uso-suelo"],
    },

    {
      id: "plano-topografico",
      title: "Plano Topografico",
      description: draft.contour,
      visualClassName: "topo-plan",
      imageUrl: draft.resultImages?.["plano-topografico"],
    },
  ];
}

function terrain(draft: TerrainDraft): Terrain {
  return {
    ...draft,
    polygon:
      draft.polygon ??
      makePolygon(draft.coordinates, draft.areaValue > 8 ? 0.006 : 0.0048, draft.areaValue > 8 ? 0.009 : 0.0072),
    results: makeResults(draft),
  };
}

export const terrains: Terrain[] = [
  terrain({
    id: 1,
    name: "Hacienda Don Victor",
    price: "$500.000.000",
    priceValue: 500000000,
    location: "Pichidegua, Region de O'Higgins",
    area: "5,2 ha",
    areaValue: 5.2,
    potentialUse: "Agricola",
    description:
      "Terreno rural con lomajes suaves, apto para uso agricola, habitacional o recreacional. Buen acceso por camino interior y cercania a servicios basicos.",
    region: "Region de O'Higgins",
    commune: "Pichidegua",
    coordinates: [-34.417, -71.187],
    polygon: [
      [-34.414713, -71.186768],
      [-34.416166, -71.18477],
      [-34.416977, -71.185694],
      [-34.41741, -71.18602],
      [-34.417677, -71.186111],
      [-34.4186, -71.186483],
      [-34.418828, -71.186659],
      [-34.417726, -71.188358],
      [-34.417313, -71.188995],
      [-34.416794, -71.18855],
    ],
    resultImages: {
      accesibilidad: "/terrain-results/hacienda-don-victor/accesibilidad.webp",
      topografia: "/terrain-results/hacienda-don-victor/topografia.webp",
      pendientes: "/terrain-results/hacienda-don-victor/pendientes.webp",
      solana: "/terrain-results/hacienda-don-victor/solana-umbria.webp",
      ndvi: "/terrain-results/hacienda-don-victor/vegetacion-ndvi.webp",
      incendio: "/terrain-results/hacienda-don-victor/riesgo-incendio.webp",
      inundacion: "/terrain-results/hacienda-don-victor/riesgo-inundacion.webp",
      "uso-suelo": "/terrain-results/hacienda-don-victor/uso-suelo.webp",
      "estudio-suelo": "/terrain-results/hacienda-don-victor/estudio-suelo.webp",
      "plano-topografico": "/terrain-results/hacienda-don-victor/plano-topografico.webp",
    },
    status: "featured",
    selected: true,
    elevation: "Cota promedio: 205 m s.n.m., relieve ondulado suave.",
    slope: "Pendiente media: 8 - 15%, con laderas manejables.",
    sun: "Buena exposicion norte y poniente para cultivos.",
    ndvi: "Vegetacion saludable en sectores centro y sur.",
    fire: "Riesgo medio en borde norte por matorral estacional.",
    flood: "Riesgo bajo; sin cursos mayores inmediatos.",
    landUse: "Uso predominante: Agricola con praderas de secano.",
    soil: "Suelo franco arcilloso, fertilidad moderada.",
    contour: "Curvas de nivel cada 2 metros.",
  }),
  
];

export function terrainMatchesFilters(
  terrainItem: Terrain,
  filters: {
    region: string;
    commune: string;
    priceRange: PriceRange;
    areaRange: AreaRange;
  },
) {
  const matchesRegion = terrainItem.region === filters.region;
  const matchesCommune = filters.commune === "Todas" || terrainItem.commune === filters.commune;
  const matchesPrice =
    filters.priceRange === "Todas" ||
    (filters.priceRange === "$0 - $40M" && terrainItem.priceValue < 40000000) ||
    (filters.priceRange === "$40M - $70M" &&
      terrainItem.priceValue >= 40000000 &&
      terrainItem.priceValue <= 70000000) ||
    (filters.priceRange === "$70M+" && terrainItem.priceValue > 70000000);
  const matchesArea =
    filters.areaRange === "Todas" ||
    (filters.areaRange === "0 - 5 ha" && terrainItem.areaValue < 5) ||
    (filters.areaRange === "5 - 10 ha" && terrainItem.areaValue >= 5 && terrainItem.areaValue <= 10) ||
    (filters.areaRange === "10+ ha" && terrainItem.areaValue > 10);

  return matchesRegion && matchesCommune && matchesPrice && matchesArea;
}

export function getFilteredTerrains(filters: {
  region: string;
  commune: string;
  priceRange: PriceRange;
  areaRange: AreaRange;
}) {
  return terrains.filter((terrainItem) => terrainMatchesFilters(terrainItem, filters));
}

export const terrainResults = terrains[0].results;
