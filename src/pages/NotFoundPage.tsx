import type { JSX } from "react";
import { Link } from "react-router-dom";

export function NotFoundPage(): JSX.Element {
  return (
    <main className="min-h-screen bg-white px-4 py-10">
      <section className="mx-auto max-w-2xl rounded-2xl border border-neutral-300 p-8 text-center">
        <h1 className="text-3xl font-bold text-neutral-900">
          Página no encontrada
        </h1>

        <p className="mt-4 text-neutral-600">
          La dirección que intentaste abrir no existe en Explorer App.
        </p>

        <Link
          to="/"
          className="mt-8 inline-block rounded-full bg-accent px-8 py-3 font-bold text-white transition-opacity hover:opacity-90"
        >
          Volver al inicio
        </Link>
      </section>
    </main>
  );
}