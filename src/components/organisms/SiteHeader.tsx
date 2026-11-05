import { useState } from 'react';
import type { JSX } from 'react';

export function SiteHeader(): JSX.Element {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="bg-primary text-black">
      <div className="relative mx-auto flex max-w-7xl items-center justify-between px-4 py-5 lg:px-8">

        <a href="#inicio" className="text-2xl font-bold">
          Where in the world?
        </a>

        <button
          type="button"
          className="rounded-md border border-black px-3 py-2 md:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
          aria-expanded={menuOpen}
        >
          {menuOpen ? 'Cerrar ✕' : 'Menú ☰'}
        </button>

        <nav
          aria-label="Navegación principal"
          className={`${
            menuOpen ? 'block' : 'hidden'
          } absolute left-0 top-full z-50 w-full bg-primary p-5 md:static md:block md:w-auto md:p-0`}
        >
          <ul className="flex flex-col gap-5 text-sm font-medium md:flex-row md:items-center md:gap-6">
            <li>
              <a href="#inicio" onClick={() => setMenuOpen(false)}>
                Inicio
              </a>
            </li>

            <li>
              <a href="#paises" onClick={() => setMenuOpen(false)}>
                Explorar países
              </a>
            </li>

            <li>
              <a href="#acerca-de" onClick={() => setMenuOpen(false)}>
                Acerca de
              </a>
            </li>
          </ul>
        </nav>

      </div>
    </header>
  );
}