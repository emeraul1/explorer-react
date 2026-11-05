import type { JSX } from 'react';

interface BadgeProps {
  text: string;
}

export function Badge({ text }: BadgeProps): JSX.Element {
  return (
    <span className="inline-block rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-800">
      {text}
    </span>
  );
}