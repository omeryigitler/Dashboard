import type { ReactNode } from 'react';

const VISIBILITY_KEY = 'berfin-dashboard-cat-visible-v1';

export function readDashboardCatVisibility() {
  if (typeof window === 'undefined') return false;
  return window.localStorage.getItem(VISIBILITY_KEY) === 'true';
}

export function writeDashboardCatVisibility(visible: boolean) {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(VISIBILITY_KEY, String(visible));
}

export function DashboardCatOverlay({ visible }: { visible: boolean }) {
  if (!visible) return null;
  return <div aria-hidden="true" className="pointer-events-none fixed bottom-0 left-0 z-40" />;
}

export function DashboardCatSettingsPanel(): ReactNode {
  return (
    <div className="grid h-full place-items-center bg-[#f6f5f1] text-sm font-bold text-gray-500">
      Kedi ayarları hazırlanıyor.
    </div>
  );
}
