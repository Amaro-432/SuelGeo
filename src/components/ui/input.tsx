import * as React from "react";
import { cn } from "@/lib/utils";

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

const Input = React.forwardRef<HTMLInputElement, InputProps>(({ className, ...props }, ref) => (
  <input
    ref={ref}
    className={cn(
      "h-11 w-full rounded-xl border border-[#E5E7EB] bg-white px-4 text-sm text-[#111827] outline-none transition placeholder:text-[#6B7280] focus:border-[#0F5C2E] focus:ring-2 focus:ring-[#0F5C2E]/15",
      className,
    )}
    {...props}
  />
));
Input.displayName = "Input";

export { Input };
