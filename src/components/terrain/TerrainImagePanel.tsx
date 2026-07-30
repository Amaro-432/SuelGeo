"use client";

import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { TerrainHeroImage } from "@/components/terrain/TerrainHeroImage";
import { terrains } from "@/data/terrains";
import { useTerrainStore } from "@/store/terrain-store";

export function TerrainImagePanel() {
  const showNotice = useTerrainStore((state) => state.showNotice);
  const selectedTerrainId = useTerrainStore((state) => state.selectedTerrainId);
  const terrain = terrains.find((item) => item.id === selectedTerrainId) ?? terrains[0];

  return (
    <Card className="p-5">
      <h2 className="text-lg font-black text-[#111827]">Vista del Terreno</h2>
      <TerrainHeroImage className="mt-4 h-[360px]" terrain={terrain} />
      <Button
        className="mt-5 w-full"
        onClick={() => showNotice("Solicitud de contacto enviada al vendedor.")}
      >
        <MessageCircle className="h-5 w-5" />
        Contactar al Vendedor
      </Button>
    </Card>
  );
}
