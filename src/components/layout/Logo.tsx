import Image from "next/image";

export function Logo() {
  return (
    <div className="flex items-center justify-center gap-3 lg:justify-start">
      <Image
        alt="Logo SuelGeo"
        className="h-12 w-12 shrink-0 object-contain"
        height={96}
        priority
        src="/suelgeo-logo.png"
        width={96}
      />
      <span className="text-3xl font-black tracking-normal text-[#063D1E]">SuelGeo</span>
    </div>
  );
}
