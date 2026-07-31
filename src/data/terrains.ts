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
  resultImageGroups?: Partial<Record<TerrainResult["id"], string[]>>;
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

function resultImageUrls(draft: TerrainDraft, id: TerrainResult["id"]) {
  const images = draft.resultImageGroups?.[id] ?? [];
  const mainImage = draft.resultImages?.[id];

  return mainImage ? [mainImage, ...images.filter((image) => image !== mainImage)] : images;
}

function makeResults(draft: TerrainDraft): TerrainResult[] {
  return [
    {
      id: "accesibilidad",
      title: "Accesibilidad",
      description: "Servicios de salud y educacion identificados dentro de un radio de 4 kilometros.",
      detailDescription:
        "La accesibilidad del predio se evalúa mediante un área de influencia de 4 kilómetros alrededor del terreno. Dentro de ese radio se identifican establecimientos educacionales y centros de salud, incluyendo escuelas, liceos, postas rurales, centros médicos y recintos hospitalarios asociados a Pichidegua, Peumo y San Vicente de Tagua Tagua. La presencia de esta infraestructura cercana aumenta la valorización del predio porque entrega servicios relevantes para futuros habitantes.",
      metrics: [
        { label: "Radio de analisis", value: "4 km alrededor del terreno" },
        { label: "Servicios observados", value: "Educacion y salud" },
        { label: "Comunas relacionadas", value: "Pichidegua, Peumo y San Vicente de Tagua Tagua" },
      ],
      visualClassName: "map-contours",
      imageUrl: draft.resultImages?.accesibilidad,
      imageUrls: resultImageUrls(draft, "accesibilidad"),
      
    },
    {
      id: "topografia",
      title: "Topografia",
      description: draft.elevation,
      detailDescription:
        "La caracterizacion topografica se realiza a partir de curvas de nivel obtenidas desde un modelo digital de elevacion. El resultado indica que el predio se emplaza en torno a la cota 210 m s.n.m. y presenta una variacion altimetrica gradual, sin cambios abruptos de elevacion. Esta condicion favorece usos agricolas, habitacionales y recreacionales, y permite comprender mejor el comportamiento natural del terreno para futuras etapas de planificacion, construccion y diseno.",
      metrics: [
        { label: "Cota de referencia", value: "210 m s.n.m." },
        { label: "Comportamiento", value: "Variacion altimetrica gradual" },
        { label: "Condicion", value: "Sin cambios abruptos de elevacion" },
      ],
      visualClassName: "map-contours",
      imageUrl: draft.resultImages?.topografia,
      imageUrls: resultImageUrls(draft, "topografia"),
      
    },
    {
      id: "pendientes",
      title: "Pendientes",
      description: draft.slope,
      detailDescription:
        "El mapa de pendientes se genera mediante un modelo digital de elevacion para revisar las condiciones geomorfologicas del terreno. Los resultados indican pendientes bajas a moderadas dentro del predio, con mayor inclinacion fuera de sus limites, principalmente hacia sectores de ladera. Esta condicion es favorable para futuros desarrollos porque reduce complejidad constructiva y costos asociados a movimientos de tierra o habilitacion de accesibilidad.",
      metrics: [
        { label: "Pendiente predominante", value: "Baja a moderada" },
        { label: "Mayor inclinacion", value: "Fuera de los limites del terreno" },
        { label: "Impacto esperado", value: "Menores costos de movimiento de tierra" },
      ],
      visualClassName: "map-slope",
      imageUrl: draft.resultImages?.pendientes,
      imageUrls: resultImageUrls(draft, "pendientes"),
    },
    {
      id: "solana",
      title: "Solana y Umbria",
      description: draft.sun,
      detailDescription:
        "El análisis de solana y umbría evalúa la exposición solar del terreno utilizando información derivada del relieve. Se identifican sectores con mayor incidencia de radiación y otros con menor exposición, diferencias que influyen en humedad del suelo, temperatura superficial y desarrollo de vegetación. Esta lectura complementa la caracterización para evaluar usos agrícolas, forestales o habitacionales.",
      metrics: [
        { label: "Variables observadas", value: "Solana y umbria" },
        { label: "Influye en", value: "Humedad, temperatura y vegetacion" },
        { label: "Usos evaluables", value: "Agricola, forestal y habitacional" },
      ],
      visualClassName: "map-sun",
      imageUrl: draft.resultImages?.solana,
      imageUrls: resultImageUrls(draft, "solana"),
    },
    {
      id: "ndvi",
      title: "Vegetacion (NDVI)",
      description: draft.ndvi,
      detailDescription:
        "La evaluación vegetal se realiza con NDVI usando imágenes satelitales de los años 2021 y 2026. La comparación permite identificar diferencias de cobertura vegetal dentro y fuera del área de estudio. En 2026 se observa mayor crecimiento vegetativo al interior del terreno, especialmente en la parte centro y sur, lo que podría relacionarse con manejo agrícola, condiciones climáticas favorables o cambios en el uso de suelo.",
      metrics: [
        { label: "Anos comparados", value: "2021 y 2026" },
        { label: "Cambio observado", value: "Mayor crecimiento vegetativo en 2026" },
        { label: "Sectores destacados", value: "Centro y sur del terreno" },
      ],
      visualClassName: "map-ndvi",
      imageUrl: draft.resultImages?.ndvi,
      imageUrls: resultImageUrls(draft, "ndvi"),
    },
    {
      id: "incendio",
      title: "Riesgo de Incendio",
      description: draft.fire,
      detailDescription:
        "El análisis de incendio utiliza registros históricos entre 2015 y 2020 dentro de un radio de 4 kilómetros respecto del terreno. Los resultados muestran eventos en Pichidegua, Peumo y San Vicente, con recurrencia de amenazas en el entorno. Asimismo, se registra un evento en el predio durante 2020, asociado a un transformador eléctrico fuera de fecha de mantención. Por ello, el riesgo de incendio se considera una variable relevante para la evaluación del predio y futuros desarrollos.",
      metrics: [
        { label: "Periodo analizado", value: "2015 - 2020" },
        { label: "Radio de revision", value: "4 km respecto del terreno" },
        { label: "Evento relevante", value: "Incendio registrado en el predio durante 2020" },
      ],
      visualClassName: "map-fire",
      imageUrl: draft.resultImages?.incendio,
      imageUrls: resultImageUrls(draft, "incendio"),
    },
    {
      id: "inundacion",
      title: "Riesgo de Inundacion",
      description: draft.flood,
      detailDescription:
        "El riesgo de inundacion se evalua mediante una simulacion de crecida del rio Cachapoal, considerando un aumento de 10 metros en el nivel del cauce como escenario historico. Los resultados concentran las zonas potencialmente inundables cerca del rio Cachapoal y dejan el terreno fuera de la zona de riesgo, evidenciando una baja probabilidad de afectacion por este tipo de eventos.",
      metrics: [
        { label: "Escenario simulado", value: "Crecida de 10 m del cauce" },
        { label: "Referencia hidrica", value: "Rio Cachapoal" },
        { label: "Resultado", value: "Terreno fuera de zona de riesgo" },
      ],
      visualClassName: "map-flood",
      imageUrl: draft.resultImages?.inundacion,
      imageUrls: resultImageUrls(draft, "inundacion"),
    },
    {
      id: "uso-suelo",
      title: "Uso de Suelo",
      description: draft.landUse,
      detailDescription:
        "El mapa de uso de suelo permite reconocer las principales coberturas presentes en el predio y su entorno, como terrenos agricolas, areas urbanas, bosques, praderas, humedales y cuerpos de agua. Los resultados muestran que el predio se ubica en un sector donde interactuan areas urbanas, terrenos agricolas y zonas de vegetacion, informacion clave para comprender el contexto territorial y evaluar posibilidades de aprovechamiento o desarrollo.",
      metrics: [
        { label: "Coberturas revisadas", value: "Agricola, urbano, bosque, pradera, humedal y agua" },
        { label: "Entorno observado", value: "Areas urbanas, terrenos agricolas y vegetacion" },
        { label: "Uso potencial", value: draft.potentialUse },
      ],
      visualClassName: "map-landuse",
      imageUrl: draft.resultImages?.["uso-suelo"],
      imageUrls: resultImageUrls(draft, "uso-suelo"),
    },

    {
      id: "plano-topografico",
      title: "Plano Topografico",
      description: draft.contour,
      detailDescription:
        "El plano topografico representa las caracteristicas fisicas del predio a partir de levantamiento con equipos GNSS y vuelo de dron. Incorpora vertices georreferenciados, cuadro de coordenadas en WGS84 Huso 19 Sur, curvas de nivel cada 50 cm, caminos existentes y construcciones existentes. Esta informacion permite revisar la geometria real del terreno y apoyar futuras etapas de planificacion, diseno, subdivision o desarrollo.",
      metrics: [
        { label: "Levantamiento", value: "GNSS y vuelo de dron" },
        { label: "Sistema", value: "WGS84 Huso 19 Sur" },
        { label: "Curvas de nivel", value: "Cada 50 cm" },
      ],
      visualClassName: "topo-plan",
      imageUrl: draft.resultImages?.["plano-topografico"],
      imageUrls: resultImageUrls(draft, "plano-topografico"),
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
    area: "8,4 ha",
    areaValue: 8.4,
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
    resultImageGroups: {
      accesibilidad: [
        "/terrain-results/hacienda-don-victor/simbologia-accesibilidad.webp",
      ],
      topografia: [
        "/terrain-results/hacienda-don-victor/simbologia-topografia.webp",
      ],
      pendientes: [
        "/terrain-results/hacienda-don-victor/mapa-pendientes.webp",
      ],
      solana: [
        "/terrain-results/hacienda-don-victor/simbologia-solana.webp",
      ],
      ndvi: [
        "/terrain-results/hacienda-don-victor/ndvi-2021.webp",
        "/terrain-results/hacienda-don-victor/ndvi-2026.webp",
      ],
      incendio: [
        "/terrain-results/hacienda-don-victor/identificacion-2015-2020.webp",
        "/terrain-results/hacienda-don-victor/simbologia-incendio.webp",
      ],
      inundacion: [
        "/terrain-results/hacienda-don-victor/simbologia-inundacion.webp",
      ],
      "uso-suelo": [
        "/terrain-results/hacienda-don-victor/simbologia-suelo.webp",
      ],

    },
    status: "featured",
    selected: true,
    elevation: "Cota aproximada: 210 m s.n.m., con variacion altimetrica gradual.",
    slope: "Pendiente baja a moderada dentro del predio.",
    sun: "Sectores diferenciados de solana y umbria segun el relieve.",
    ndvi: "Mayor crecimiento vegetativo en 2026, especialmente en sectores centro y sur.",
    fire: "Registros historicos de incendio entre 2015 y 2020 en un radio de 4 km.",
    flood: "Terreno fuera de la zona de riesgo ante simulacion de crecida del rio Cachapoal.",
    landUse: "Entorno mixto con areas agricolas, urbanas y vegetacion.",
    soil: "Caracterizacion de suelo demostrativa, no basada en ensayo de laboratorio.",
    contour: "Plano con vertices georreferenciados y curvas de nivel cada 50 cm.",
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
