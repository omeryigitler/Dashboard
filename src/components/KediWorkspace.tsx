import { DashboardCatSettingsPanel } from './KediDashboardKit';

export default function KediWorkspace() {
  return (
    <section
      id="kedi-workspace"
      className="flex-1 h-[calc(100vh-5rem)] overflow-hidden rounded-[2.5rem] border border-gray-300/40 bg-[#f6f5f1] shadow-sm"
    >
      <style>{`
        @media (min-width: 1280px) {
          #kedi-workspace > div {
            overflow: hidden !important;
          }

          #kedi-workspace > div > div {
            height: 100%;
            padding-bottom: 0 !important;
          }
        }
      `}</style>
      <DashboardCatSettingsPanel />
    </section>
  );
}
