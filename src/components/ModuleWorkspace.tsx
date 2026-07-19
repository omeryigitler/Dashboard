import { useMemo, useState } from 'react';
import {
  ArrowUpRight,
  Check,
  ChevronRight,
  CircleDollarSign,
  Clock3,
  FileDown,
  Filter,
  Layers3,
  MoreHorizontal,
  Plus,
  RefreshCw,
  Search,
  Settings2,
  Sparkles,
} from 'lucide-react';
import {
  findModuleItem,
  getDefaultModuleItemId,
  getModuleConfig,
  ModuleSection,
} from '../data/moduleConfig';

interface ModuleWorkspaceProps {
  activeMenuItem: string;
  selectedItemId: string;
}

const getFieldValue = (label: string, index: number) => {
  const normalized = label.toLocaleLowerCase('tr-TR');

  if (normalized.includes('telefon') || normalized.includes('whatsapp')) return '0531 111 22 33';
  if (normalized.includes('e-posta') || normalized.includes('gönderen')) return 'yonetim@berfinakbas.com';
  if (normalized.includes('tarih') || normalized.includes('oluşturulma') || normalized.includes('güncelleme')) return '19.07.2026';
  if (normalized.includes('saat') || normalized.includes('başlangıç') || normalized.includes('bitiş')) return index % 2 === 0 ? '09:30' : '10:20';
  if (normalized.includes('ücret') || normalized.includes('tutar') || normalized.includes('ödeme') || normalized.includes('gelir') || normalized.includes('alacak')) return '1.500 TL';
  if (normalized.includes('süre') || normalized.includes('tampon') || normalized.includes('boşluk')) return '50 dakika';
  if (normalized.includes('danışan') || normalized.includes('ad soyad') || normalized === 'ad') return 'Ayşe Yılmaz';
  if (normalized.includes('veli')) return 'Mehmet Yılmaz';
  if (normalized.includes('hizmet')) return 'Dil ve Konuşma Terapisi';
  if (normalized.includes('rol')) return 'Yönetici';
  if (normalized.includes('durum') || normalized.includes('aktif') || normalized.includes('yayın')) return 'Aktif';
  if (normalized.includes('online') || normalized.includes('görüşme türü')) return 'Yüz yüze';
  if (normalized.includes('dil')) return 'Türkçe';
  if (normalized.includes('para birimi')) return 'TRY';
  if (normalized.includes('url') || normalized.includes('canonical')) return '/yonetim/modul-detayi';
  if (normalized.includes('görsel') || normalized.includes('medya') || normalized.includes('logo') || normalized.includes('favicon') || normalized.includes('dosya') || normalized.includes('makbuz')) return 'Dosya hazır';
  if (normalized.includes('izin') || normalized.includes('zorunlu') || normalized.includes('göster') || normalized.includes('indeksleme') || normalized.includes('ücretsiz')) return 'Açık';
  if (normalized.includes('toplam') || normalized.includes('kalan') || normalized.includes('kullanılan') || normalized.includes('sıralama') || normalized.includes('sayısı') || normalized.includes('randevu') || normalized.includes('seans') || normalized.includes('talep')) return String((index + 1) * 3);
  if (normalized.includes('açıklama') || normalized.includes('not') || normalized.includes('mesaj') || normalized.includes('metin') || normalized.includes('biyografi') || normalized.includes('cevap') || normalized.includes('politika')) return 'İçerik genel tasarım ve operasyon kurallarına göre yapılandırıldı.';

  return index % 3 === 0 ? 'Yapılandırıldı' : index % 3 === 1 ? 'Varsayılan değer' : 'Güncel';
};

const SectionCard = ({ section, onAction }: { section: ModuleSection; onAction: (action: string) => void }) => (
  <section className="bg-white/88 border border-black/[0.07] rounded-[2rem] p-5 shadow-3xs flex flex-col gap-4 min-w-0">
    <div className="flex items-center justify-between gap-3 border-b border-black/[0.045] pb-3">
      <div className="flex items-center gap-2 min-w-0">
        <div className="w-8 h-8 rounded-full bg-black text-[#eafda8] flex items-center justify-center shrink-0">
          <Layers3 className="w-3.5 h-3.5" />
        </div>
        <h3 className="text-[12px] font-black text-gray-900 tracking-tight truncate">{section.title}</h3>
      </div>
      <button type="button" className="w-7 h-7 rounded-full border border-black/10 flex items-center justify-center text-gray-400 hover:text-black hover:bg-gray-50 transition-colors">
        <MoreHorizontal className="w-3.5 h-3.5" />
      </button>
    </div>

    {section.fields.length > 0 && (
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-2.5">
        {section.fields.map((field, index) => (
          <div key={`${section.title}-${field}`} className="rounded-2xl bg-[#faf9f6] border border-black/[0.045] px-3.5 py-3 min-w-0">
            <span className="text-[8px] font-black text-gray-400 uppercase tracking-[0.12em] block truncate">{field}</span>
            <div className="flex items-center justify-between gap-2 mt-1.5">
              <span className="text-[10.5px] font-bold text-gray-800 leading-tight truncate">{getFieldValue(field, index)}</span>
              <Check className="w-3 h-3 text-emerald-500 shrink-0" />
            </div>
          </div>
        ))}
      </div>
    )}

    {section.actions && section.actions.length > 0 && (
      <div className="flex flex-wrap gap-2">
        {section.actions.map((action, index) => (
          <button
            type="button"
            key={action}
            onClick={() => onAction(action)}
            className={`px-3 py-2 rounded-full border text-[9px] font-black transition-all cursor-pointer flex items-center gap-1.5 ${
              index === 0
                ? 'bg-black border-black text-[#eafda8] hover:bg-gray-900'
                : 'bg-white border-black/10 text-gray-700 hover:border-black/25 hover:bg-gray-50'
            }`}
          >
            {action}
            <ArrowUpRight className="w-3 h-3" />
          </button>
        ))}
      </div>
    )}
  </section>
);

export default function ModuleWorkspace({ activeMenuItem, selectedItemId }: ModuleWorkspaceProps) {
  const [notice, setNotice] = useState('');
  const config = getModuleConfig(activeMenuItem);
  const effectiveSelectedId = selectedItemId || getDefaultModuleItemId(activeMenuItem);
  const selectedItem = findModuleItem(activeMenuItem, effectiveSelectedId);

  const accent = useMemo(() => {
    const accents = ['#eafda8', '#fff1e8', '#eef7ff', '#f4efff'];
    return accents[Math.abs(effectiveSelectedId.length) % accents.length];
  }, [effectiveSelectedId]);

  if (!config) return null;

  const handleAction = (action: string) => {
    setNotice(`${action} işlemi seçildi.`);
    window.setTimeout(() => setNotice(''), 2200);
  };

  return (
    <div
      id="module-workspace"
      className="flex-1 rounded-[2.5rem] border border-gray-300/40 p-6 flex flex-col h-[calc(100vh-5rem)] shadow-sm overflow-y-auto select-none gap-5 transition-all duration-300 animate-fade-in relative"
      style={{ background: `linear-gradient(118deg, ${accent} 0%, #fff8ed 27%, #ffffff 53%, #fff8f4 100%)` }}
    >
      {notice && (
        <div className="sticky top-0 z-40 mx-auto -mb-12 bg-black text-[#eafda8] rounded-full px-4 py-2 text-[10px] font-black shadow-xl flex items-center gap-2 animate-fade-in">
          <Sparkles className="w-3.5 h-3.5" />
          {notice}
        </div>
      )}

      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2">
          {config.topActions.map((action, index) => {
            const ActionIcon = index === 0 ? Plus : index === 1 ? Filter : index === 2 ? RefreshCw : FileDown;
            return (
              <button
                type="button"
                key={action}
                onClick={() => handleAction(action)}
                className={`px-3 py-1.5 rounded-full border text-[10px] font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                  index === 0
                    ? 'bg-black text-[#eafda8] border-black hover:bg-gray-900'
                    : 'bg-white/45 hover:bg-white/75 border-black/10 text-gray-700'
                }`}
              >
                <ActionIcon className="w-3.5 h-3.5" />
                {action}
              </button>
            );
          })}
        </div>

        <div className="flex items-center gap-2 text-[9px] font-black text-gray-500 uppercase tracking-wider">
          <Clock3 className="w-3.5 h-3.5" />
          Son güncelleme: şimdi
        </div>
      </div>

      <header className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 border-b border-black/[0.06] pb-5">
        <div className="min-w-0">
          <div className="flex items-center gap-2 mb-2">
            <span className="px-2.5 py-1 rounded-full bg-black text-[#eafda8] text-[8px] font-black uppercase tracking-[0.13em]">{config.title}</span>
            <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
            <span className="text-[9px] font-black text-gray-500 uppercase tracking-wider truncate">{selectedItem?.label || config.title}</span>
          </div>
          <h1 className="text-2xl font-black text-gray-950 tracking-tight">{selectedItem?.label || config.title}</h1>
          <p className="text-[11px] text-gray-500 font-semibold mt-1 max-w-3xl leading-relaxed">{config.subtitle}</p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button type="button" className="w-9 h-9 rounded-full bg-white/55 border border-black/10 text-gray-500 hover:text-black flex items-center justify-center transition-all">
            <Search className="w-4 h-4" />
          </button>
          <button type="button" className="w-9 h-9 rounded-full bg-white/55 border border-black/10 text-gray-500 hover:text-black flex items-center justify-center transition-all">
            <Settings2 className="w-4 h-4" />
          </button>
        </div>
      </header>

      <div className="grid grid-cols-2 xl:grid-cols-4 gap-3">
        {config.stats.map((stat, index) => (
          <div key={stat.label} className="rounded-[1.6rem] bg-white/72 border border-black/[0.06] p-4 shadow-3xs min-w-0">
            <div className="flex items-center justify-between gap-2">
              <span className="text-[8px] font-black text-gray-400 uppercase tracking-[0.12em] truncate">{stat.label}</span>
              {index % 2 === 0 ? <CircleDollarSign className="w-3.5 h-3.5 text-gray-300" /> : <Layers3 className="w-3.5 h-3.5 text-gray-300" />}
            </div>
            <span className="text-xl font-black text-gray-950 tracking-tight block mt-2 truncate">{stat.value}</span>
            <span className="text-[9px] text-gray-400 font-bold block mt-1 truncate">{stat.hint}</span>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 2xl:grid-cols-2 gap-4 pb-4">
        {config.sections.map((moduleSection) => (
          <SectionCard key={moduleSection.title} section={moduleSection} onAction={handleAction} />
        ))}
      </div>
    </div>
  );
}
