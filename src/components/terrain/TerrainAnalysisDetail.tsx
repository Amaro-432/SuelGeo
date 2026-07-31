import { BarChart3, CheckCircle2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import type { TerrainResult } from "@/types/terrain";

type TerrainAnalysisDetailProps = {
  result: TerrainResult;
};

export function TerrainAnalysisDetail({ result }: TerrainAnalysisDetailProps) {
  return (
    <Card className="overflow-hidden">
      <div className="border-b border-[#E5E7EB] p-5">
        <p className="text-sm font-black uppercase text-[#0F5C2E]">Analisis detallado</p>
        <h2 className="mt-2 text-2xl font-black text-[#111827]">{result.title}</h2>
        <p className="mt-3 max-w-3xl text-base font-medium leading-7 text-[#374151]">
          {result.detailDescription ?? result.description}
        </p>
      </div>

      <div className="grid gap-5 p-5 xl:grid-cols-[minmax(0,1fr)_320px]">
        {result.imageUrl ? (
          <img
            alt={result.title}
            className="h-[360px] w-full rounded-xl border border-[#E5E7EB] object-cover"
            src={result.imageUrl}
          />
        ) : (
          <div className={`h-[420px] rounded-xl border border-[#E5E7EB] ${result.visualClassName}`} />
        )}

        <aside className="grid content-start gap-4">
          <div className="rounded-xl border border-[#D9E8D6] bg-[#F4FAF1] p-4">
            <div className="flex items-center gap-2 text-sm font-black text-[#063D1E]">
              <CheckCircle2 className="h-4 w-4" />
              Resultado principal
            </div>
            <p className="mt-3 text-sm font-semibold leading-6 text-[#374151]">{result.description}</p>
          </div>

          {result.metrics?.length ? (
            <div className="rounded-xl border border-[#E5E7EB] bg-white p-4">
              <div className="flex items-center gap-2 text-sm font-black text-[#111827]">
                <BarChart3 className="h-4 w-4 text-[#0F5C2E]" />
                Indicadores
              </div>
              <dl className="mt-4 grid gap-3">
                {result.metrics.map((metric) => (
                  <div className="rounded-lg bg-[#F8FAF8] p-3" key={metric.label}>
                    <dt className="text-xs font-black uppercase text-[#6B7280]">{metric.label}</dt>
                    <dd className="mt-1 text-sm font-bold leading-5 text-[#111827]">{metric.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          ) : null}
        </aside>
      </div>
    </Card>
  );
}
