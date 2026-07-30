"use client";

import {
  Bell,
  CircleHelp,
  GitCompare,
  Heart,
  Home,
  LogOut,
  Map,
  MessageSquareText,
  User,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/layout/Logo";

const navItems = [
  { label: "Inicio", icon: Home, active: true },
  { label: "Mapa de Terrenos", icon: Map },
  { label: "Favoritos", icon: Heart },
  { label: "Mis Consultas", icon: MessageSquareText },
  { label: "Comparador", icon: GitCompare },
  { label: "Alertas", icon: Bell },
  { label: "Perfil", icon: User },
  { label: "Ayuda", icon: CircleHelp },
  { label: "Cerrar Sesion", icon: LogOut },
];

export function Sidebar() {
  return (
    <aside className="flex w-full flex-col border-b border-[#E5E7EB] bg-white p-3 lg:min-h-screen lg:w-[280px] lg:shrink-0 lg:border-b-0 lg:border-r lg:p-4 xl:w-[300px] xl:p-5">
      <div className="mb-4 lg:mb-6">
        <Logo />
        <p className="mt-2 text-center text-xs font-medium leading-5 text-[#111827] sm:text-sm lg:mt-3">
          Terrenos rurales con informacion que te da confianza
        </p>
      </div>

      <nav className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              className={cn(
                "flex h-11 items-center gap-2 rounded-xl px-3 text-left text-sm font-semibold text-[#111827] transition hover:bg-[#EEF6EA] sm:justify-center lg:h-12 lg:justify-start lg:gap-3 lg:px-4 lg:text-base",
                item.active && "bg-[#0F5C2E] text-white hover:bg-[#063D1E]",
              )}
              key={item.label}
              type="button"
            >
              <Icon className="h-5 w-5 shrink-0" />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>
    </aside>
  );
}
