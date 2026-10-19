import Image from "next/image";

export function Logo() {
  return (
    <div className="flex w-full items-center justify-center">
      <Image
        alt="Logo SuelGeo"
        className="h-auto w-full max-w-[240px] object-contain lg:max-w-[250px]"
        height={713}
        priority
        src="/suelgeo-logo.png"
        width={2206}
      />
    </div>
  );
}
