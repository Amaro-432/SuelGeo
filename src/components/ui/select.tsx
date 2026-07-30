import * as React from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

type SelectProps = React.SelectHTMLAttributes<HTMLSelectElement> & {
  label?: string;
  options: string[];
};

export function Select({ className, label, options, ...props }: SelectProps) {
  return (
    <label className="grid gap-1.5 text-xs font-semibold text-[#374151]">
      {label}
      <span className="relative">
        <select
          className={cn(
            "h-10 w-full appearance-none rounded-lg border border-[#E5E7EB] bg-white px-3 pr-9 text-sm font-medium text-[#111827] outline-none transition focus:border-[#0F5C2E] focus:ring-2 focus:ring-[#0F5C2E]/15",
            className,
          )}
          {...props}
        >
          {options.map((option) => (
            <option key={option}>{option}</option>
          ))}
        </select>
        <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#6B7280]" />
      </span>
    </label>
  );
}
