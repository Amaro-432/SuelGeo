"use client";

import { FormEvent, useState } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useTerrainStore } from "@/store/terrain-store";

type SuggestionBoxProps = {
  open: boolean;
  onClose: () => void;
};

export function SuggestionBox({ open, onClose }: SuggestionBoxProps) {
  const showNotice = useTerrainStore((state) => state.showNotice);
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [isSending, setIsSending] = useState(false);

  if (!open) {
    return null;
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const endpoint = process.env.NEXT_PUBLIC_FORMSPREE_SUGGESTIONS_ENDPOINT;

    if (!endpoint) {
      showNotice("Configura el endpoint de Formspree para enviar sugerencias.");
      return;
    }

    setIsSending(true);

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          phone,
          message,
        }),
      });

      if (!response.ok) {
        throw new Error("Formspree request failed");
      }

      setEmail("");
      setPhone("");
      setMessage("");
      onClose();
      showNotice("Sugerencia enviada correctamente.");
    } catch {
      showNotice("No se pudo enviar la sugerencia. Intentalo nuevamente.");
    } finally {
      setIsSending(false);
    }
  }

  return (
    <div
      aria-modal="true"
      className="fixed inset-0 z-[1000] grid place-items-center bg-black/45 p-4"
      onClick={onClose}
      role="dialog"
    >
      <form
        className="w-full max-w-lg rounded-2xl border border-[#E5E7EB] bg-white p-5 shadow-2xl"
        onClick={(event) => event.stopPropagation()}
        onSubmit={handleSubmit}
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="text-xl font-black text-[#111827]">Buzon de sugerencias</h2>
            <p className="mt-1 text-sm font-medium leading-5 text-[#374151]">
              Tu comentario nos ayuda a mejorar SuelGeo.
            </p>
          </div>
          <Button aria-label="Cerrar buzon" onClick={onClose} size="icon" type="button" variant="ghost">
            <X className="h-5 w-5" />
          </Button>
        </div>

        <div className="mt-5 grid gap-4">
          <label className="grid gap-2 text-sm font-bold text-[#111827]">
            Correo opcional
            <Input
              autoComplete="email"
              onChange={(event) => setEmail(event.target.value)}
              placeholder="correo@ejemplo.com"
              type="email"
              value={email}
            />
          </label>

          <label className="grid gap-2 text-sm font-bold text-[#111827]">
            Numero telefonico opcional
            <Input
              autoComplete="tel"
              onChange={(event) => setPhone(event.target.value)}
              placeholder="+56 9 1234 5678"
              type="tel"
              value={phone}
            />
          </label>

          <label className="grid gap-2 text-sm font-bold text-[#111827]">
            Mensaje
            <textarea
              className="min-h-36 w-full resize-y rounded-xl border border-[#E5E7EB] bg-white px-4 py-3 text-sm text-[#111827] outline-none transition placeholder:text-[#6B7280] focus:border-[#0F5C2E] focus:ring-2 focus:ring-[#0F5C2E]/15"
              onChange={(event) => setMessage(event.target.value)}
              placeholder="Escribe tu sugerencia..."
              required
              value={message}
            />
          </label>
        </div>

        <div className="mt-5 flex justify-end gap-3">
          <Button disabled={isSending} onClick={onClose} type="button" variant="outline">
            Cancelar
          </Button>
          <Button disabled={isSending || !message.trim()} type="submit">
            {isSending ? "Enviando..." : "Enviar sugerencia"}
          </Button>
        </div>
      </form>
    </div>
  );
}
