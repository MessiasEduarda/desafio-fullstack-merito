import type { ReactNode } from 'react';
import { Sidebar } from '../Sidebar';
import { layoutWrapper, layoutMain } from './styles';

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className={layoutWrapper}>
      <Sidebar />

      <main className={layoutMain}>
        {children}
      </main>
    </div>
  );
}