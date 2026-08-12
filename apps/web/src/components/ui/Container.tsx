import type { HTMLAttributes, ReactNode } from 'react';

interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export function Container({ children, className = '', ...props }: ContainerProps) {
  return (
    <div className={`mx-auto w-full max-w-6xl px-6 lg:px-8 ${className}`.trim()} {...props}>
      {children}
    </div>
  );
}
