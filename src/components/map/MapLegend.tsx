import { Card } from "@/components/ui/card";

const legendItems = [
  { label: "Terreno disponible", color: "bg-[#A3D977]" },
  { label: "Terreno destacado", color: "bg-[#0F5C2E]" },
  { label: "Terreno vendido", color: "bg-[#9CA3AF]" },
];

export function MapLegend() {
  return (
    <Card className="absolute bottom-4 right-3 z-[700] max-h-[150px] w-[180px] overflow-hidden p-3 md:bottom-6 md:right-7 md:max-h-none md:w-[190px] md:p-4">
      <h3 className="mb-3 text-sm font-black text-[#111827]">Simbologia</h3>
      <div className="grid gap-2 md:gap-3">
        {legendItems.map((item) => (
          <div className="flex items-center gap-2 text-xs font-medium text-[#111827] md:text-sm" key={item.label}>
            <span className={`h-3 w-3 rounded-full ${item.color}`} />
            {item.label}
          </div>
        ))}
      </div>
    </Card>
  );
}
