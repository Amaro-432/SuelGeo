export type AppView = "map" | "detail";

export type TerrainStatus = "available" | "featured" | "sold";

export type LatLng = [number, number];

export type CommuneOption = {
  name: string;
  region: string;
  center: LatLng;
  zoom: number;
};

export type Terrain = {
  id: number;
  name: string;
  price: string;
  priceValue: number;
  location: string;
  area: string;
  areaValue: number;
  potentialUse: string;
  description: string;
  region: string;
  commune: string;
  coordinates: LatLng;
  polygon: LatLng[];
  results: TerrainResult[];
  status: TerrainStatus;
  selected?: boolean;
};

export type TerrainResult = {
  id: string;
  title: string;
  description: string;
  detailDescription?: string;
  metrics?: {
    label: string;
    value: string;
  }[];
  visualClassName: string;
  imageUrl?: string;
  imageUrls?: string[];
};
