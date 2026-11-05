import type { JSX } from 'react';

export function Footer(): JSX.Element {
  return (
    <footer className="bg-primary px-4 py-6 text-black">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 sm:flex-row">
        <p className="font-bold">Explorer App</p>

        <p className="text-sm">
          © 2026 Todos los derechos reservados
        </p>

        <nav aria-label="Navegación del pie de página">
          <ul className="flex gap-5 text-sm">
            <li><a href="#inicio">Inicio</a></li>
            <li><a href="#paises">Países</a></li>
            <li><a href="#acerca-de">Acerca de</a></li>
          </ul>
        </nav>
      </div>
    </footer>
  );
}