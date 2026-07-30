import { Card } from "@/components/ui/card";
import type { TerrainResult } from "@/types/terrain";

type TerrainResultCardProps = {
  result: TerrainResult;
};

export function TerrainResultCard({ result }: TerrainResultCardProps) {
  return (
    <Card className="overflow-hidden p-4 xl:p-5">
      <h3 className="mb-4 text-lg font-black text-[#111827]">{result.title}</h3>
      {result.imageUrl ? (
        <img
          alt={result.title}
          className="h-48 w-full rounded-lg border border-[#E5E7EB] object-cover xl:h-56"
          src={result.imageUrl}
        />
      ) : (
        <div className={`h-48 rounded-lg border border-[#E5E7EB] xl:h-56 ${result.visualClassName}`} />
      )}
      <p className="mt-4 min-h-12 text-base font-medium leading-6 text-[#374151]">{result.description}</p>
    </Card>
  );
}
