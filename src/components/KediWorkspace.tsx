export default function KediWorkspace() {
  return (
    <section className="flex-1 h-[calc(100vh-5rem)] overflow-hidden rounded-[2.5rem] border border-gray-300/40 bg-[#f6f5f1] shadow-sm">
      <iframe
        title="Kedi ayarları"
        src="/yonetim/kedi/index.html?mode=settings"
        className="h-full w-full border-0 bg-[#f6f5f1]"
        loading="eager"
      />
    </section>
  );
}
