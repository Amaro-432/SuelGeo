"use client";

import { useEffect, useState } from "react";
import { BarChart3, CheckCircle2, X } from "lucide-react";
import { Card } from "@/components/ui/card";
import type { TerrainResult } from "@/types/terrain";

type TerrainAnalysisDetailProps = {
  result: TerrainResult;
};

type AnalysisImageProps = {
  alt: string;
  className: string;
  fallbackClassName: string;
  onOpen: () => void;
  src: string;
};

function AnalysisImage({ alt, className, fallbackClassName, onOpen, src }: AnalysisImageProps) {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return <div aria-label={alt} className={fallbackClassName} role="img" />;
  }

  return (
    <button className="group cursor-zoom-in text-left" onClick={onOpen} type="button">
      <img alt={alt} className={className} onError={() => setHasError(true)} src={src} />
    </button>
  );
}

export function TerrainAnalysisDetail({ result }: TerrainAnalysisDetailProps) {
  const images = result.imageUrls?.length ? result.imageUrls : result.imageUrl ? [result.imageUrl] : [];
  const [mainImage, ...secondaryImages] = images;
  const [openImage, setOpenImage] = useState<{ alt: string; src: string } | null>(null);

  useEffect(() => {
    if (!openImage) {
      return;
    }

    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpenImage(null);
      }
    }

    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [openImage]);

  return (
    <>
      <Card className="overflow-hidden">
        <div className="border-b border-[#E5E7EB] p-5">
          <p className="text-sm font-black uppercase text-[#0F5C2E]">Analisis detallado</p>
          <h2 className="mt-2 text-2xl font-black text-[#111827]">{result.title}</h2>
          <p className="mt-3 max-w-3xl text-base font-medium leading-7 text-[#374151]">
            {result.detailDescription ?? result.description}
          </p>
        </div>

        <div className="grid gap-5 p-5 xl:grid-cols-[minmax(0,1fr)_320px]">
          <div className="grid gap-4">
            {mainImage ? (
              <AnalysisImage
                alt={result.title}
                className="h-[360px] w-full rounded-xl border border-[#E5E7EB] object-cover transition group-hover:brightness-95"
                fallbackClassName={`h-[420px] rounded-xl border border-[#E5E7EB] ${result.visualClassName}`}
                onOpen={() => setOpenImage({ alt: result.title, src: mainImage })}
                src={mainImage}
              />
            ) : (
              <div className={`h-[420px] rounded-xl border border-[#E5E7EB] ${result.visualClassName}`} />
            )}

            {secondaryImages.length ? (
              <div className="grid gap-4 md:grid-cols-2">
                {secondaryImages.map((imageUrl, index) => {
                  const alt = `${result.title} detalle ${index + 1}`;

                  return (
                    <AnalysisImage
                      alt={alt}
                      className="h-48 w-full rounded-xl border border-[#E5E7EB] object-cover transition group-hover:brightness-95"
                      fallbackClassName={`h-48 rounded-xl border border-[#E5E7EB] ${result.visualClassName}`}
                      key={imageUrl}
                      onOpen={() => setOpenImage({ alt, src: imageUrl })}
                      src={imageUrl}
                    />
                  );
                })}
              </div>
            ) : null}
          </div>

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

      {openImage ? (
        <div
          aria-modal="true"
          className="fixed inset-0 z-[1000] grid place-items-center bg-black/80 p-4"
          onClick={() => setOpenImage(null)}
          role="dialog"
        >
          <div className="relative max-h-full w-full max-w-6xl" onClick={(event) => event.stopPropagation()}>
            <button
              aria-label="Cerrar imagen"
              className="absolute right-3 top-3 z-10 grid h-10 w-10 place-items-center rounded-full bg-white text-[#111827] shadow-lg transition hover:bg-[#F3F4F6]"
              onClick={() => setOpenImage(null)}
              type="button"
            >
              <X className="h-5 w-5" />
            </button>
            <img
              alt={openImage.alt}
              className="max-h-[88vh] w-full rounded-xl bg-white object-contain shadow-2xl"
              src={openImage.src}
            />
          </div>
        </div>
      ) : null}
    </>
  );
}
