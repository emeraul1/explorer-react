import type { JSX, ReactNode } from 'react';

interface HeaderProps {
  title: string;
  children?: ReactNode;
}

export function Header({ title, children }: HeaderProps): JSX.Element {
  return (
    <header className="mb-8">
      <h1 className="font-primary text-3xl font-bold text-neutral-900">
        {title}
      </h1>

      {children && (
        <div className="mt-3 text-neutral-600">
          {children}
        </div>
      )}
    </header>
  );
}